import React, { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";
import RegisterComp from '../components/Register';
import { postDatasFromAxios } from '../services/axios.service';
import { useNavigate } from 'react-router-dom';
import { successToaster, errorToaster } from '../services/toastify.service';
import { useSelector } from 'react-redux';
import MainLayout from './Layout/MainLayout';

const RegisterPage = (props) => {
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [isValid, SetIsValid] = useState(false);
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    
    //const [role, setRole] = useState(props.protypes);
    const [user, setUser] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const isLogin = useSelector((state) => state.auth.isLoggedIn);
    //console.log(isLogin);
    
     useEffect( () => {
        if(isLogin){
            return navigate('/dashboard');    
        }       
    }, []) 
  
    const submitHandler = async(event) => {
      event.preventDefault();
      let isValid = false;
      if(!name){
        isValid = true;
        setNameError('Full Name is required field.');
      } else {
        isValid = false;
        setNameError('');
      }

      if(!email){
        isValid = true;
         setEmailError('Email is required field.');
      } else if(email && ! email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig) ){
        isValid = true;
        setEmailError('Email not valid.');
      } else {
        if(nameError){}else{
          isValid = false;
        }
        
        setEmailError('');
      }
  
      if(!password){
        isValid = true;
        setPasswordError('Password is required field.');
      } else if(password && ! password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ig) ){
        isValid = true;
        setPasswordError('Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character');
      } else {
        if(nameError || emailError){}else{
          isValid = false;
        }         
        setPasswordError('');
      }
       
      if(!confirmPassword){
        isValid=true;
        setConfirmPasswordError('Confirm password is required field');
      } else if(password !== confirmPassword){
        isValid=true;
        setConfirmPasswordError('Password mismatched!');
      }  else {
        if(nameError || emailError || passwordError){}else{
          isValid = false;
        }         
        setConfirmPasswordError('');
      }
     
     if(!isValid){
        const data = {
          name,
          email,
          password
        };
        
console.log(data, 'data');
        const resp = await postDatasFromAxios('/users/register', 'patch', data); 
        console.log(resp)               ;
        if(resp && resp?.status === true){
          setUser(resp.data);          
          successToaster(resp.message);
          return navigate('/login');
        }
        else{
          //console.log(resp.response.data.message);
          //setErrorMessage( resp.response.data.message);
          setErrorMessage('');
          errorToaster(resp.message);
        }
     }
    }
    //console.log(role)
  return (
    <MainLayout>
        {user && (
          <Navigate to="/" replace={true} />
        )}
        <div className='container mx-auto py-6'>
            <h4 className='text-center text-bold text-[20px]'>Register Page</h4>
            <RegisterComp setConfirmPassword={setConfirmPassword} setName={setName} nameError={nameError} errorMessage={errorMessage} passwordError={passwordError} confirmPasswordError={confirmPasswordError} emailError={emailError} setEmail={setEmail} setPassword={setPassword} submitHandler={submitHandler} />
        </div>
    </MainLayout>    
  )
}

export default RegisterPage