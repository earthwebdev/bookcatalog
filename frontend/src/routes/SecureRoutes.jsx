import { Navigate, Outlet } from 'react-router-dom';
import { getLoggedIn } from '../utils/helpers';
const SecureRoutesPage = () => {
    const isLoggedIn = getLoggedIn();
    /* const jwt = getCookie("jwtToken") || '';
    const role = getCookie("role") || ''; */
    //console.log(isLoggedIn);
    return <>
        { isLoggedIn  ? <Outlet /> : <Navigate to={'/login'} />} 
    </>    
}

export default SecureRoutesPage