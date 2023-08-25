import { useNavigate } from "react-router-dom";
import { postDatasFromAxiosWithToken } from "../services/axios.service";
import { useSelector } from "react-redux";
import { getJWTToken, getLoggedIn } from "../utils/helpers";

const PayButton = ({ cartItems }) => {
  // const user = useSelector((state:any)=>state.)
  const navigate = useNavigate();
  const isLogin = getLoggedIn();
  const jwttoken = getJWTToken();
  const handleCheckout = async (e) => {
    e.preventDefault();        
    if(isLogin){
        const resp = await postDatasFromAxiosWithToken("/stripe/create-checkout-session", 'post', { cartItems }, jwttoken);
        if (resp.success) {
            console.log(resp.data);
            return window.location.href = resp.data;            
        }
    } else{
        return navigate('/login?returnUrl=cart');
    }        
  };
  return (
    <div>
      <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 w-full" onClick={(e) => handleCheckout(e)}>Checkout</button>
    </div>
  );
};

export default PayButton;
