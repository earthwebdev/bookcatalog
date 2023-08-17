import { useSelector } from 'react-redux';

export const getJWTToken = () => {
    const { token } = useSelector((state) => state.auth);
    return token;
}
export const getLoggedIn = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return isLoggedIn;
}
export const getRole = () => {
    const { role } = useSelector((state) => state.auth);
    return role;
}

export const getName = (state) => 
{
    const { name } = useSelector((state) => state.auth);
    return name;
}

export const getRoleAccess = (data) => {
    const { role } = useSelector((state) => state.auth);
    if(data === role)
        return true;
    return false
}
    