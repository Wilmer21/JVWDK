export const HOLA = "HOLA";
export const ADIOS = "ADIOS";

export const CREATE_NEWS = "CREATE_NEWS";
export const GET_CATEGORIES = "GET_CATEGORIES";

export const DELETE_CATEGORIES = "DELETE_CATEGORIES";

export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const ADD_NEW_ADDRESS = "ADD_NEW_ADDRESS"

export const GET_PAGE_NEWS = "getPageNews";
export const UPDATE_FILTERS = "updateFilters";
export const UPDATE_PAGE = "updatePage";

export const GET_REVIEWS = "GET_REVIEWS"

export const GET_NEW = "GET_NEW"

export const SHOW_LOADER = "SHOW_LOADER"
export const HIDE_LOADER = "HIDE_LOADER"
export const GET_ALL_REVIEWS = "GET_ALL_REVIEWS"
export const ADD_NEW_REVIEW = "ADD_NEW_REVIEW"
export const EDIT_REVIEW =  "EDIT_REVIEW"

export const GET_USER = "GET_USER"
export const DELETE_USER = "DELETE_USER"
export const UPDATE_USER = "UPDATE_USER"

export const config = token => {
    return {
        headers: {
             Authorization: `Bearer ${token}` 
        }
    }
};