import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
      userId: { type: String, required: true },
      products: [
        { productId: { type: String }, quantity: { type: Number, default: 1 } },
      ],
      subtotal: { type: Number, required: true },
      total: { type: Number, required: true },
      shipping: { type: Object, required: true },
      delivery_status: { type: String, default: "pending" },
      payment_status: { type: String, required: true },
    },
    { 
        timestamps: true
    }
);
  
  
/* const OrderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: [3, 'Name should be more than 3 characters'],
    },
    description:{
        type: String,
        required: true,
        minLength: [10, 'Name should be more than 10 characters'],
    },
    url:{
        type: String,
        required: true,
    },
    public_id:{
        type: String
    }
},
{
    timestamps: true,
}
); */
const OrderModel = mongoose.model("Order", OrderSchema);
export default OrderModel;