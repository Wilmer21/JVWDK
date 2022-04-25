import { GET_NEW, SHOW_LOADER, HIDE_LOADER, GET_ALL_REVIEWS, ADD_NEW_REVIEW } from '../constantes';


const initialState = {
news: {},
isLoading: false,
newId: 0,
reviews: [],
};

const newReducer = (state = initialState, action) => {
switch(action.type) {
   case SHOW_LOADER:
       return {
           ...state,
           isLoading: true
       };
   case GET_NEW:
       return {
           ...state,
           news: action.news
       };
   case HIDE_LOADER:
       return {
           ...state,
           isLoading: false
       };
   
   case GET_ALL_REVIEWS:
       return {
           ...state,
           reviews: action.reviews
       };
   default:
       return {
           ...state
       };
};

};

export default newReducer;