import React, { useEffect } from 'react'
import { useState } from 'react'

import {Link} from "react-router-dom";
import { postDatasFromAxios } from '../services/axios.service';
import LoginComp from '../components/Login';
import {getLoggedIn, getRoleAccess} from '../utils/helpers';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../reduxtoolkits/authSlice';
import { useNavigate } from "react-router-dom";
import { successToaster, errorToaster } from '../services/toastify.service';
import MainLayout from './Layout/MainLayout';

const LoginPage = () => {
  const [isValid, SetIsValid] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

     //const isLogin =  useSelector((state) => state.auth.isLoggedIn);
     const isLogin = getLoggedIn();
     //const roleAdmin = useSelector((state) => state.auth.role);
     const isAdmin = getRoleAccess('admin');
    console.log(isLogin, isAdmin);
    
     useEffect( () => {
        if(isLogin){
          if(isAdmin)
          {
            //console.log('admin');
            return navigate('/admin_dashboard');
          }else{
            return navigate('/dashboard');    
          }            
        }       
    }, []) 

  const submitHandler = async(event) => {    
    event.preventDefault();    
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

    if(!password){
      isValid = true;
      setPasswordError('Password is required field.');
   } else if(password && ! password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ig) ){
    isValid = true;
    setPasswordError('Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
   } else {
    if(emailError){}else{
      isValid = false;
    }
    
     setPasswordError('');
   }
   //console.log(isValid, 'valid value');return;
   if(!isValid){
      const data = {
        email,
        password
      }
      const resp = await postDatasFromAxios('/users/login', 'post', data);
      //console.log(email, password, resp.data);
      if(resp && resp?.status === true){
        console.log(resp)
        dispatch(login(resp));                
        successToaster(resp?.message);
        //console.log(resp?.roles, 'roles');
        if(resp?.roles === 'admin'){
          //console.log('admin roles ');
          return navigate("/admin_dashboard");
        } else{
          console.log('user roles ');
          return navigate("/dashboard");
        }
        
      }
      else{
        //console.log(resp.response.data.message);
        setErrorMessage( '');
        errorToaster(resp.message);
      }
   }
    
  }
  const forgetPasswordHandler = (event) => {
    event.preventDefault();    
    return navigate("/forgetpassword");    
  }
  return (
    <MainLayout>
        <div className='container mx-auto py-6'>
            <h4 className='text-center text-bold text-[20px]'>Login Page</h4>
            <LoginComp errorMessage={errorMessage} passwordError={passwordError} emailError={emailError} setEmail={setEmail} setPassword={setPassword} submitHandler={submitHandler} forgetPasswordHandler={forgetPasswordHandler} />
        </div>
    </MainLayout>
  )
}

export default LoginPage