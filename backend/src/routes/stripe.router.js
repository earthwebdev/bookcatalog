import express from 'express';
import Stripe from 'stripe';

import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import OrderModel from '../models/orders.model.js';
const router = new express();
const strip_api_key = process.env.STRIPE_API_KEY;
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
//console.log(stripeSecretKey);
const stripe = new Stripe( stripeSecretKey, {
  apiVersion: '2022-11-15',
  timeout: 2000,
}); //maxNetworkRetries: 1,
const client_url = process.env.CLIENT_URL;

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_...";

router.post("/create-checkout-session", AuthMiddleware, async (req, res) => {
    try {
        const { cartItems } = req.body;
        //console.log(cartItems);
        const CUSTOMER_ID = req.user._id.toString();
        //console.log(CUSTOMER_ID);
        
        
        const line_items = cartItems.length > 0 && cartItems.map((item) => {
          //console.log(item.description.length > 30?item.description.slice(0,30): item.description)
            return {
                price_data: {
                    currency: 'npr',
                    product_data: {
                        name: item.title,
                        description: item.description.length > 30?item.description.slice(0,30):item.description,
                        images: [item.imageUrl],
                        metadata: {
                            id: item._id
                        }
                    },
                    unit_amount: item.price * 100,
    
                },
                quantity: item.cartQuantity
            }
        });
        const customerData = cartItems.length > 0 && cartItems.map( item => {
          return {id: item._id, title: item.title, description: item.description.length > 30?item.description.slice(0,30):item.description, imageUrl: item.imageUrl, cartQuantity: item.cartQuantity, price: item.price }
        } );           
        console.log(customerData, 'user id', req.user._id.toString());
        const customer = await stripe.customers.create({
          metadata: {
            userId: req.user._id.toString(),
            cart: JSON.stringify(customerData),
          },
        });
        //console.log(customer.id, 'customer id'); 
        const session = await stripe.checkout.sessions.create({ 
        //payment_method_types: ["card"], 
        /* line_items: [ 
            { 
            price_data: { 
                currency: "inr", 
                product_data: { 
                name: product.title, 
                }, 
                unit_amount: product.price * 100, 
            }, 
            quantity: product.cartQuantity, 
            }, 
        ],  */
        //customer: `'{${CUSTOMER_ID}}'`, //'{{CUSTOMER_ID}}',
        client_reference_id: `${CUSTOMER_ID}`,
        customer: customer.id,
        line_items,
        mode: "payment", 
        success_url: `${client_url}/success?session_id={CHECKOUT_SESSION_ID}`, //`${client_url}/success?session_id={CHECKOUT_SESSION_ID}`, 
        cancel_url: `${client_url}/cart`, 
        }); 
        //res.json({ id: session.id }); 
        res.status(200).json({
            success: true,
            data: session.url
        }) 
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }     
});

router.get('/checkout-session', async (req, res) => {
    const { sessionId } = req.query;
    //console.log(sessionId, 'sss id');
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    //console.log(session, 'session ');
    res.status(200).json({
        status: true,
        session
    });
  });

const createOrder = async (customer, data) => {
    const Items = JSON.parse(customer.metadata.cart);
  
    const products = Items.map((item) => {
      return {
        productId: item.id,
        quantity: item.cartQuantity,
      };
    });
  
    const newOrder = new OrderModel({
      userId: customer.metadata.userId,
      customerId: data.customer,
      paymentIntentId: data.payment_intent,
      products,
      subtotal: data.amount_subtotal,
      total: data.amount_total,
      shipping: data.customer_details,
      payment_status: data.payment_status,
    });
  
    try {
      const savedOrder = await newOrder.save();
      console.log("Processed Order:", savedOrder);
    } catch (err) {
      console.log(err);
    }
  };

  // Stripe webhoook

  router.post("/webhook", async (req, res) => {
      let data;
      let eventType;
  
      // Check if webhook signing is configured.
      let webhookSecret;
      webhookSecret = process.env.STRIPE_WEB_HOOK;
  
      if (webhookSecret) {
        // Retrieve the event by verifying the signature using the raw body and secret.
        let event;
        let signature = req.headers["stripe-signature"];
                
        try {
          event = stripe.webhooks.constructEvent( req?.rawBody, signature, webhookSecret );
          //console.log(event, 'event')
        } catch (err) {
          console.log(`⚠️  Webhook signature verification failed:  ${err.message}`);
          return res.status(400).json({
            status: false,
            error: err.message,
          });
        }
        // Extract the object from the event.
        data = event?.data?.object;
        eventType = event?.type;
      } else {
        // Webhook signing is recommended, but if the secret is not configured in `config.js`,
        // retrieve the event data directly from the request body.
        data = req.body.data.object;
        eventType = req.body.type;
      }
      
      // Handle the checkout.session.completed event
      if (eventType === "checkout.session.completed" || eventType === "payment_intent.succeeded") {
        console.log(data.customer, data);
         stripe.customers.retrieve(data.customer)
          .then(async (customer) => {
            try {
              // CREATE ORDER
              console.log(customer, 'customer');
              console.log(data, 'data');
              createOrder(customer, data);
            } catch (err) {
              console.log(typeof createOrder);
              console.log(err);
            }
          })
          .catch((err) => console.log(err.message)); 
      }
  
      res.status(200).end();
    }
  );

export default router;