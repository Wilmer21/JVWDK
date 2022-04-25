import { GET_NEW, SHOW_LOADER, HIDE_LOADER, GET_ALL_REVIEWS, EDIT_REVIEW,
    ADD_NEW_REVIEW } from '../constantes';
import axios from 'axios';

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