import {GET_REVIEWS} from '../constantes';

const initialState = {
    totalReviews: 0,
    avgRating: 0,
    reviews: []
}

export default function reviewReducer(state = initialState, action){
    switch(action.type){
        case GET_REVIEWS: 
            return {
                ...state,
                totalReviews: action.payload.totalReviews,
                avgRating: action.payload.avgRating,
                reviews: action.payload.reviews
            }
        default:
            return state;
    }
}