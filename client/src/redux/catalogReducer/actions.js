import {GET_PAGE_NEWS, UPDATE_FILTERS, UPDATE_PAGE} from '../constants';
import axios from 'axios';

export const getPageNews = (page, pageSize, totalNews, news, filterBox) => {
    return {
        type: GET_PAGE_NEWS,
        payload: {
            page,
            pageSize,
            totalNews,
            news,
            filterBox
        }
    }
}


export const getPaginatedNews = (page, pageSize, filterBox) => (dispatch) => {
    if (Array.isArray(filterBox.categories) && filterBox.categories.length >= 1){
        const cats = filterBox.categories
        axios.get(`http://localhost:3000/news/catalog/?page=${page}&pageSize=${pageSize}&categories=[${[...cats]}]`)
        .then(news => {
        var totalNews = news.data.totalNews;
        dispatch(getPageNews(page, pageSize, totalNews, news, filterBox));
    })
    .catch(error => console.log("Error axios getPaginatedNews: ", error))  
    }
    else {
        axios.get(`http://localhost:3000/news/catalog/?page=${page}&pageSize=${pageSize}`)
        .then(news => {
        var totalNews = news.data.totalNews;
        dispatch(getPageNews(page, pageSize, totalNews, news, filterBox));
    })
    .catch(error => console.log("Error axios getPaginatedNews: ", error))  
    }
    
}


export const updateFilter = (categories) => {
    return {
        type: UPDATE_FILTERS,
        payload: {
            categories
        }
    }
}

export const updatePage = (page) => {
    return {
        type: UPDATE_PAGE,
        payload: {
            page
        }
    }
}