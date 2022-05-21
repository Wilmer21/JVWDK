import axios from 'axios';
import { GET_USER, DELETE_USER, UPDATE_USER, config } from '../constantes';

export const getUsers = () => dispatch =>{
    return axios.get('http://localhost:3000/users')
    .then(user =>{
        dispatch({
            type: GET_USER,
            users: user.data
        })
    })
    .catch(err => console.log('ERROR GET: ', err))
}

export const desactiveUsers = (id, token) => dispatch => {
    return axios.delete(`http://localhost:3000/users/${id}`, null, config(token))
    .then(user=>{
        console.log(user)
        dispatch({
            type: DELETE_USER,
            users: user.data
        })
    })
    .catch(err => console.log('ERROR DELETE: ', err))
}

export const activeUsers = (id, token) => dispatch => {
    return axios.put(`http://localhost:3000/users/active/${id}`, null, config(token))
    .then(user=>{
        console.log(user)
        dispatch({
            type: DELETE_USER,
            users: user.data
        })
    })
    .catch(err => console.log('ERROR DELETE: ', err))
}

export const updateUserAdmin = (id, token) => dispatch =>{
    return axios.put(`http://localhost:3000/auth/promote/${id}`, null, config(token))
    .then(user_admin =>{
        dispatch({
            type: UPDATE_USER,
            update: user_admin.data
        })
    })
    .catch(err => console.log("ERROR DE UPDATE ",err))
}

export const updateUser = (id, token) => dispatch =>{
    return axios.put(`http://localhost:3000/auth/user/promote/${id}`, null, config(token))
    .then(user_admin =>{
        dispatch({
            type: UPDATE_USER,
            update: user_admin.data
        })
    })
    .catch(err => console.log("ERROR DE UPDATE ",err))
}

export const forcePassword = (id, token) => dispatch => {
    return axios.post(`http://localhost:3000/users/forcePassword/${id}`, null, config(token))
    .then(user => {
        dispatch({
            type: UPDATE_USER,
            update: user.data
        })
    })
    .catch(error => {
        console.log(error)
    })
}