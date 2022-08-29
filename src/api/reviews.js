import axios from 'axios';

export const getReviews = async () => {
    const response = await axios.get('/reviews');
    return response;
}

export const addReview = async (newReview) => {
    const response = await axios.post('/reviews/add', newReview);
    return response;
}