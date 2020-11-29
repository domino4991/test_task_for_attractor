import {
    CLEAN_USERS_ERRORS,
    DELETE_USER_ERROR, DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS, EDIT_USER_ERROR, EDIT_USER_REQUEST, EDIT_USER_SUCCESS,
    GET_ALL_USERS_ERROR, GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS,
    GET_USER_ERROR, GET_USER_REQUEST, GET_USER_SUCCESS,
    LOGIN_USER_ERROR, LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_ERROR, LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_ERROR, REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../actionTypes";

const initialState = {
    user: null,
    users: null,
    usersError: null,
    usersLoading: false,
    userInfo: null
}

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS_REQUEST:
        case LOGIN_USER_REQUEST:
        case LOGOUT_USER_REQUEST:
        case REGISTER_USER_REQUEST:
        case DELETE_USER_REQUEST:
        case GET_USER_REQUEST:
        case EDIT_USER_REQUEST:
            return {
                ...state,
                usersLoading: true
            };
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                user: action.data,
                usersLoading: false
            };
        case LOGOUT_USER_SUCCESS:
            return {
                ...state,
                user: null,
                usersError: null,
                usersLoading: false
            };
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                usersError: null,
                usersLoading: false
            };
        case GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.data,
                usersError: null,
                usersLoading: false
            };
        case GET_USER_SUCCESS:
            return {
                ...state,
                usersError: null,
                usersLoading: false,
                userInfo: action.data
            };
        case DELETE_USER_SUCCESS:
        case EDIT_USER_SUCCESS:
            return {
                ...state,
                usersError: null,
                usersLoading: false
            };
        case GET_ALL_USERS_ERROR:
        case LOGIN_USER_ERROR:
        case LOGOUT_USER_ERROR:
        case REGISTER_USER_ERROR:
        case DELETE_USER_ERROR:
        case GET_USER_ERROR:
        case EDIT_USER_ERROR:
            return {
                ...state,
                usersError: action.error,
                usersLoading: false
            };
        case CLEAN_USERS_ERRORS:
            return {
                ...state,
                usersError: null
            };
        default:
            return state;
    }
};