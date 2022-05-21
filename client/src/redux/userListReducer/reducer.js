import {GET_USER, DELETE_USER, UPDATE_USER} from '../constantes';


const initialState = {
  users: []
};

function updateActive(array, elemento, newObj) {
    var resultado = []
    for (var i = 0; i < array.length; i++) {
      if (array[i].id !== elemento) {
        resultado.push(array[i]);
      }
      else if(array[i].id === elemento) {
        resultado.push(newObj);
      }
    }
    return resultado;
  }

const userListReducer = (state=initialState, action)=>{
    switch(action.type){
        case GET_USER:
            return {
                ...state,
                users: action.users
            }
        
        case DELETE_USER:
            return {
                ...state,
                users: updateActive(state.users,action.users.id,action.users)
            }

        case UPDATE_USER:
            return {
              ...state,
              users: updateActive(state.users,action.update.id,action.update) 
            }
            
        
        default:
            return state;
    }
}

export default userListReducer;