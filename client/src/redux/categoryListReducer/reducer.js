import { GET_CATEGORIES, DELETE_CATEGORIES } from '../constantes';

const initialState = {
    categories: [],
    isDelete: false
}

const categoryList = (state = initialState , action ) => {
    switch(action.type){
        case GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        
        case DELETE_CATEGORIES:
            return {
                ...state,
                isDelete: true
            }
        
        default:
            return state;
    }
}

export default categoryList