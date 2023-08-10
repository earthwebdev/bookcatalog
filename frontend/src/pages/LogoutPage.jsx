import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {logout } from '../reduxtoolkits/authSlice';
const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout(''));
    navigate('/login');
  }, []);
  

}

export default LogoutPage