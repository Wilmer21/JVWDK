import { combineReducers } from 'redux';
// import loginReducer from './loginReducer/reducer';
import createNewsReducer from './createNewsReducer/reducer';
import reviewReducer from './reviewReducer/reducer';
import newReducer from './newReducer/reducer';
import userListReducer from './userListReducer/reducer';
import categoryList from './categoryListReducer/reducer';
import catalogReducer from './catalogReducer/reducer';


const rootReducer = combineReducers({ 
    catalogReducer,
    createNewsReducer,
    reviewReducer,
    newReducer,
    userListReducer,
    categoryList
})

export default rootReducer;