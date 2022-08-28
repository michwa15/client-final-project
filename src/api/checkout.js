import axios from 'axios';

export const purchase = async (data) => {
    const response = await axios.post('/checkout/purchase', data);
    return response;
}