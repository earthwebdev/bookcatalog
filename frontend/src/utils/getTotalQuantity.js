import { useSelector } from "react-redux";

const getTotalQuantity = () => {
  const cart = useSelector((state) => state.cart);
  //console.log(cart.cartItems);
  let total = 0
  cart.cartItems.forEach(item => {
    total += item.cartQuantity
  });
  return total;
}

export default getTotalQuantity;