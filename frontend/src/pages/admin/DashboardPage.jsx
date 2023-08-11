import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import MainLayout from '../Layout/MainLayout';

const DashboardAdminPage = () => {
  const navigate = useNavigate();
     const isLogin = useSelector((state) => state.auth.isLoggedIn);
    //console.log(isLogin);
    
     useEffect( () => {
        if(!isLogin){
            return navigate('/');    
        }       
    }, []) 
  return (
    <>
        
        <div className='bg-gray-50  py-6'>
            
            <h1>Welcome to the Admin dashboard</h1>
        </div> 
                             
    </>

  )
}

export default DashboardAdminPage