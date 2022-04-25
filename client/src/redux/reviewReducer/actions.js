import axios from 'axios';
import {GET_REVIEWS} from '../constantes';

export const getReviews = (totalReviews, avgRating, reviews) => {
        return {
        type: GET_REVIEWS, 
        payload: {
            totalReviews,
            avgRating,
            reviews
        }
    }
}

export const getDataReviews = (newId) => (dispatch) => {
    axios.get(`http://localhost:3000/news/${newId}/review/`)
    .then(response => {
        const reviews = response.data;
        const totalReviews = reviews.length;
        const avgRating = reviews.reduce((acc, current) => acc + current.rating, 0) / totalReviews;
        dispatch(getReviews(totalReviews, avgRating, reviews))
    })
    .catch(err => console.log(err))
}