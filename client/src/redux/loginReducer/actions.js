import { LOGIN, LOGOUT, ADD_NEW_ADDRESS } from '../constantes';
import axios from 'axios';
import Swal from 'sweetalert2';
import { styled } from '@material-ui/core';

const showAlert = (message, time) => {
    return Swal.fire({
        position: 'center',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: time,
    });
};

const showAlertWarning = (message, time) => {
    return Swal.fire({
        position: 'center',
        icon: 'warning',
        title: message,
        showConfirmButton: false,
        timer: time,
    });
};


export const login = (user)=>(dispatch, getState)=>{
    dispatch({type: LOGIN, payload: user})       
        
        sessionStorage.setItem('token', user.token)
        sessionStorage.setItem('role', user.user.user_role);
        sessionStorage.setItem('id', user.user.id);
        sessionStorage.setItem('email', user.user.email);
        showAlert('Succesfull sign in!', 2000);
        setTimeout(() => window.location.reload(false), 2000);
        
}
export const logout = (token)=> dispatch =>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      const url = "http://localhost:3000/auth/logout"

    return axios.post(url,null,config)
    .then(()=>{
        dispatch({type: LOGOUT})
        localStorage.clear();
        sessionStorage.clear();

        window.location.replace("http://localhost:3001/")
    })
    .catch(err => console.log("ERROR LOGOUT: ", err));
}