import { useState , useEffect} from 'react'

import { postDatasFromAxios } from '../services/axios.service';

import { useNavigate } from "react-router-dom";
import ForgetPasswordComp from '../components/ForgetPassword';
import { errorToaster, successToaster } from '../services/toastify.service';
import MainLayout from './Layout/MainLayout';
import { useDispatch, useSelector } from 'react-redux';

const ForgetPasswordPage = () => {
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.auth.isLoggedIn);
 //console.log(isLogin);
 
  useEffect( () => {
     if(isLogin){
         return navigate('/dashboard');    
     }       
 }, []) 
  const [isValid, SetIsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const submitHandler = async(event) => {    
    event.preventDefault();
    console.log('ssss');
    
    let isValid = false;
    if(!email){
      isValid = true;
       setEmailError('Email is required field.');
    } else if(email && ! email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig) ){
      isValid = true;
      setEmailError('Email not valid.');
    } else {
      isValid = false;
      setEmailError('');
    }

   if(!isValid){
      const data = {
        email
      }
      const resp = await postDatasFromAxios('/users/forgotpassword', 'put', data);
      //console.log(email, password, resp.data);
      if(resp && resp?.success === true){
        successToaster(resp?.message);        
        return navigate("/");      
      }
      else{
        //console.log(resp.response.data.message);
        setErrorMessage('');
        errorToaster( resp.message);
      }
   }
    
  }
  const loginHandler = (event) => {
    event.preventDefault();    
    return navigate("/login");    
  }
  return (
    <MainLayout>
        <div className='container mx-auto py-6'>
            <h4 className='py-4 text-bold text-[20px] text-center'>Forget Password</h4>
            <p className='text-bold text-[20px] text-center'> We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
            <p className='text-bold text-[20px] text-center'>Enter your register email ID to reset the password</p>
            <ForgetPasswordComp errorMessage={errorMessage} emailError={emailError} setEmail={setEmail} submitHandler={submitHandler} loginHandler={loginHandler} />
        </div>
    </MainLayout>
  )
}

export default ForgetPasswordPage