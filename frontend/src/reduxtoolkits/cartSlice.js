import { createSlice } from "@reduxjs/toolkit";
import {successToaster} from "../services/toastify.service";
const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

export const cartSlice = createSlice({
    name: "Add to Cart Function",
    initialState,
    reducers: {
        addtoCart: (state, action) => {
            const existingIndex = state.cartItems.findIndex(item => item._id.toString() === action.payload._id.toString());
            if(existingIndex >= 0){
                //let newItem = { ...action.payload, cartQuantity: (state.cartItems.cartQuantity + action.payload.cartQuantity)  }
                state.cartItems[existingIndex] = {
                    ...state.cartItems[existingIndex],
                    cartQuantity: state.cartItems[existingIndex].cartQuantity + (action.payload.cartQuantity ? action.payload.cartQuantity : 1)
                };
            }else {
                //console.log(state, action.payload);
                //let tempCourseItem = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(action.payload);
                successToaster('Book added to cart');
            }
                       
        },
        decreaseCart: (state, action) => {
            const existingIndex = state.cartItems.findIndex(item => item._id.toString() === action.payload._id.toString());
            if(existingIndex >= 0){
                if(state.cartItems[existingIndex].cartQuantity > 1){
                    state.cartItems[existingIndex] = {
                        ...state.cartItems[existingIndex],
                        cartQuantity: state.cartItems[existingIndex].cartQuantity - 1
                    }
                }  else if(state.cartItems[existingIndex].cartQuantity === 1){
                    //state.cartItems.splice(existingIndex, 1);
                    const newItem = state.cartItems.filter( (item) => { return item._id !== action.payload._id})
                    state.cartItems = newItem;                                    
                }                
                
            }
        },
        removeCart: (state, action) => {
            const newCart = state.cartItems.filter(item => item._id !== action.payload._id);
            state.cartItems = newCart;
        },
        getTotals: (state) => {
            let { total, quantity } = state.cartItems.reduce((cartData, item) => {
                const itemTotal = item.price * item.cartQuantity;

                cartData.total += itemTotal;
                cartData.quantity += item.cartQuantity;
                return cartData;
            }, {
                quantity: 0,
                total: 0
            });
            total = parseFloat(total.toFixed(2));
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        },
        clearCart: (state) => {
            state.cartItems = [];
        }
    }
  
});

export const {addtoCart, decreaseCart, removeCart, getTotals, clearCart} = cartSlice.actions;

export default cartSlice.reducer;