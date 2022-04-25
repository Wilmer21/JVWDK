import { CREATE_NEWS, GET_CATEGORIES } from '../constantes';

const initialState = {
    newNew: {},
    categories: [],
    isLoading: false,
};

const createNewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case CREATE_NEWS:
            return {
                ...state,
                newNew: action.newNew,
                isLoading: true,
            };
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            };
        default:
            return state;
    };
};

export default createNewsReducer;