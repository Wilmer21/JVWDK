import { combineReducers } from 'redux';
// import loginReducer from './loginReducer/reducer';
import createNewsReducer from './createNewsReducer/reducer';
import reviewReducer from './reviewReducer/reducer';
import newReducer from './newReducer/reducer';


const rootReducer = combineReducers({ 
    createNewsReducer,
    reviewReducer,
    newReducer
})

export default rootReducer;