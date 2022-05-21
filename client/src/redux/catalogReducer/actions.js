import {GET_PAGE_NEWS, UPDATE_FILTERS, UPDATE_PAGE} from '../constantes';
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
    console.log(" page>"+page, " pagesize>"+pageSize, " filter>"+filterBox);
    console.log(filterBox);
    if (Array.isArray(filterBox.categories) && filterBox.categories.length >= 1){
        console.log('aqui entro');
        const cats = filterBox.categories
        console.log(`${[...cats]}`);
        axios.get(`http://localhost:3000/news/catalog/?page=${page}&pageSize=${pageSize}&categories=[${[...cats]}]`)
        .then(news => {
            console.log("aqui se ejecuta la api news");
            console.log(news);
        var totalNews = news.data.totalNews;
        dispatch(getPageNews(page, pageSize, totalNews, news, filterBox));
    })
    .catch(error => console.log("Error axios getPaginatedNews: ", error))  
    }
    else {
        axios.get(`http://localhost:3000/news/catalog/?page=${page}&pageSize=${pageSize}`)
        .then(news => {
            console.log(news);
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