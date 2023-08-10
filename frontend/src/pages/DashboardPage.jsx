import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import MainLayout from './Layout/MainLayout';

const DashboardPage = () => {
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
        <MainLayout>
        <div className='container mx-auto bg-gray-50  py-6'>
            <div>
              <h1>Welcome to the dashboard</h1>
            </div> 
            </div> 
        </MainLayout>                      
    </>

  )
}

export default DashboardPage