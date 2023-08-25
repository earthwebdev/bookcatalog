import React, { useEffect } from "react";
import MainLayout from "./Layout/MainLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  addtoCart,
  clearCart,
  decreaseCart,
  removeCart,
  getTotals,
} from "../reduxtoolkits/cartSlice";
import { useNavigate } from "react-router-dom";
import PayButton from "../components/PayButton";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //console.log(cart);

  const handleShopping = (e) => {
    e.preventDefault();
    return navigate("/");
  };
  /* const checkoutHandler = async (e) => {
        e.preventDefault();
        console.log(cart.cartItems);return;
        if(isLogin){
            const resp = await postDatasFromAxiosWithToken("/stripe/create-checkout-session", 'post', cart.cartItems, jwttoken);
            console.log(resp);
            if (resp.status) {
                window.location.href = resp.stripeUrl;
            }
        }
        return navigate('/login?returnUrl=cart');
    } */

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);
  return (
    <MainLayout>
      <div className="container mx-auto text-white text-center py-6">
        <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {cart?.cartItems.length > 0 ? (
            <>
              <div className="md:w-3/4">
                <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                  <table className="w-full text-gray-800">
                    <thead>
                      <tr>
                        <th className="text-left font-semibold">Product</th>
                        <th className="text-left font-semibold">Price</th>
                        <th className="text-left font-semibold">Quantity</th>
                        <th className="text-right font-semibold">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart?.cartItems.length > 0 &&
                        cart?.cartItems.map((item) => {
                          return (
                            <>
                              <tr key={item._id}>
                                <td className="py-4">
                                  <div className="flex items-center">
                                    <img
                                      className="h-16 w-16 mr-4"
                                      src={item.imageUrl}
                                      data-src="https://via.placeholder.com/150"
                                      alt="Product image"
                                    />
                                    <div className="flex flex-col justify-center items-center">
                                      <span className="font-semibold">
                                        {item.title}
                                      </span>
                                      <span
                                        onClick={(e) => {
                                          e.preventDefault();
                                          dispatch(removeCart(item));
                                        }}
                                        className="font-semibold cursor-pointer"
                                      >
                                        Remove
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="text-left py-4">
                                  Rs {item.price}
                                </td>
                                <td className="py-4">
                                  <div className="flex items-center">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(decreaseCart(item));
                                      }}
                                      className="border rounded-md py-2 px-4 mr-2"
                                    >
                                      -
                                    </button>
                                    <span className="text-center w-8">
                                      {item.cartQuantity}
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(
                                          addtoCart({
                                            ...item,
                                            cartQuantity: 1,
                                          })
                                        );
                                      }}
                                      className="border rounded-md py-2 px-4 ml-2"
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="text-right py-4">
                                  Rs {item.price * item.cartQuantity}
                                </td>
                              </tr>
                            </>
                          );
                        })}
                      <tr>
                        <td className="py-4">
                          <div className="flex items-center">
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                dispatch(clearCart());
                              }}
                              className="font-semibold cursor-pointer"
                            >
                              Clear Cart
                            </span>
                          </div>
                        </td>
                        <td className="text-left py-4"></td>
                        <td className="py-4">
                          <div className="flex items-center"></div>
                        </td>
                        <td className="text-right py-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="text-2xl font-semibold mb-4 text-gray-800">
              Cart is empty.
              <button
                className="cursor-pointer inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleShopping}
              >
                Continue Shopping
              </button>
            </div>
          )}

          {cart?.cartItems.length > 0 && (
            <div className="md:w-1/4">
              <div className="bg-white rounded-lg shadow-md p-6 text-gray-800">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>Rs {cart.cartTotalAmount}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>Rs 19.99</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Rs 59.00</span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">
                    Rs {cart.cartTotalAmount + 19.99 + 59}
                  </span>
                </div>
                <PayButton cartItems={cart.cartItems} />
                {/* <button onClick={checkoutHandler} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full">Checkout</button> */}
                <button
                  onClick={handleShopping}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
