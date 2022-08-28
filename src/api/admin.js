import axios from 'axios';

export const deleteShoe = async (shoe) => {
    const response = await axios.delete('/admin/delete', {data: shoe});
    return response;
}

export const addShoe = async (data) => {
    const response = await axios.post('/admin/add', data);
    return response;
}

export const getUsers = async () => {
    const response = await axios.get('/admin/get-users');
    return response;
}