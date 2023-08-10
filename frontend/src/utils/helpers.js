import { useSelector } from 'react-redux';

export const getJWTToken = () => {
    const { jwt } = useSelector((state) => state.auth);
    return jwt;
}
export const getLoggedIn = () => {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return isLoggedIn;
}
export const getRole = () => {
    const { role } = useSelector((state) => state.auth);
    return role;
}


export const getRoleAccess = (data) => {
    const { role } = useSelector((state) => state.auth);
    if(data === role)
        return true;
    return false
}
    