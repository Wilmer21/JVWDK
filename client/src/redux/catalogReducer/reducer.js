import {GET_PAGE_NEWS, UPDATE_FILTERS, UPDATE_PAGE} from '../constantes';

const initialState = {
    page: 1,
    pageSize: 1,
    totalNews: 0,
    news: {},
    filterBox: {}
}

export default function catalogReducer(state = initialState, action)  {
    switch (action.type){
        case GET_PAGE_NEWS:
            return {
                page: action.payload.page, pageSize: action.payload.pageSize, 
                totalNews: action.payload.totalNews, news: action.payload.news.data,
                filterBox: action.payload.filterBox
            }
        case UPDATE_FILTERS: 
            return {
                ...state,
                filterBox: action.payload.categories
            }
        case UPDATE_PAGE:
            return{
                ...state,
                page: action.payload.page
            }    
        default: 
            return state;
    }
}
