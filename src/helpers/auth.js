import { setCookie, getCookie, deleteCookie } from "./cookies"
import { setLocalStorage, getLocalStorage, deleteLocalStorage } from "./localStorage";
import axios from 'axios';

export const setAuthentication = (token, user, expires) => {
    setCookie('token', token, expires);
    setLocalStorage('user', user);
}

export const isAuthenticated = () => {
    if (getCookie('token') && getLocalStorage('user')) {
        return getLocalStorage('user');
    } else {
        return false;
    }
}

export const logout = async (user) => {
    await axios.post('api/auth/logout', user);
    deleteCookie('token');
    deleteLocalStorage('user');
}