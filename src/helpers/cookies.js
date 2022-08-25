import Cookies from 'js-cookie';

export const setCookie = (key, value, expires) => {
    Cookies.set(key, value, { expires } );
};

export const getCookie = (key) => {
    return Cookies.get(key);
};

export const deleteCookie = (key) => {
    Cookies.remove(key);
};