import axios from 'axios';

export const getShoes = async () => {
    const response = await axios.get('/products');
    return response;
}

export const getShoesByName = async (value) => {
    const response = await axios.get('/products/search', {params: {value}});
    return response;
}

export const addToUserCart = async (data) => {
    const response = await axios.put('/products/add-to-cart', data);
    return response;
}

export const getShoesByUser = async (user) => {
    const response = await axios.get('/products/cart', {params: {user}});
    return response;
};

export const removeFromUserCart = async (data) => {
    const response = axios.put('/products/remove-cart-item', data);
    return response;
}