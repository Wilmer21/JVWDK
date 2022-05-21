import { GET_NEW, SHOW_LOADER, HIDE_LOADER, GET_ALL_REVIEWS, EDIT_REVIEW,
    ADD_NEW_REVIEW } from '../constantes';
import axios from 'axios';
import Swal from 'sweetalert2';

const showAlert = (message, time) => {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: time,
    });
};

export const hideLoader = () => dispatch => {
    dispatch({
        type: HIDE_LOADER
    });
};

export const showLoader = () => dispatch => {
    dispatch({
        type: SHOW_LOADER
    });
};

export const getNews = (userId, newId) => dispatch => {
    return axios.get(`http://localhost:3000/news/news-detail/${newId}?userId=${userId}`)
    .then(news => {
        dispatch({
            type: GET_NEW,
            news: news.data
        });
    })
    .catch(err => console.log(err));
};

export const getReviews = id => dispatch => {
    return axios.get(`http://localhost:3000/news/${id}/review`)
    .then(res => {
        dispatch({
            type: GET_ALL_REVIEWS,
            reviews: res.data
        });
    })
    .catch(err => console.log(err));
};

export const editReviewAction = (review, reviewId, newId) => dispatch => {
    return axios.put(`http://localhost:3000/news/${newId}/review/${reviewId}`, {form: review})
    .then(res => {
        dispatch({
            type: EDIT_REVIEW,
            review: res.data
        });
        setTimeout(() => window.location.reload(false),2000);
        showAlert('Reseña editada!', 2000);
    })
    .catch(err => console.log(err));
};

export const addNewReview = (review, newId, userId) => dispatch => {
    console.log("Noricia: ", newId);
    return axios.post(`http://localhost:3000/news/${newId}/review/${userId}`, {form: review})
    .then(res => {
        dispatch({
            type: ADD_NEW_REVIEW,
            newReview: res.data
        });
        setTimeout(() => window.location.reload(false),2000);
        showAlert('Reseña creada! Gracias!! Vuelva prontos!', 2000);
    })
    .catch(err => console.log(err));
};