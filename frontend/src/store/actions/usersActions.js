import {
    CLEAN_USERS_ERRORS,
    DELETE_USER_ERROR, DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS, EDIT_USER_ERROR, EDIT_USER_REQUEST, EDIT_USER_SUCCESS,
    GET_ALL_USERS_ERROR, GET_ALL_USERS_REQUEST,
    GET_ALL_USERS_SUCCESS, GET_USER_ERROR, GET_USER_REQUEST,
    GET_USER_SUCCESS,
    LOGIN_USER_ERROR, LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS, LOGOUT_USER_REQUEST,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_ERROR, REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../actionTypes";
import axiosBase from "../../axiosBase";
import {toast} from "react-toastify";
import {push} from 'connected-react-router';

const loginUserRequest = () => ({type: LOGIN_USER_REQUEST});
const loginUserSuccess = data => ({type: LOGIN_USER_SUCCESS, data});
const loginUserError = error => ({type: LOGIN_USER_ERROR, error});

const logoutUserRequest = () => ({type: LOGOUT_USER_REQUEST});
const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});
const logoutUserError = error => ({type: LOGIN_USER_ERROR, error});

const registerUserRequest = () => ({type: REGISTER_USER_REQUEST});
const registerUserSuccess = () => ({type: REGISTER_USER_SUCCESS});
const registerUserError = error => ({type: REGISTER_USER_ERROR, error});

const getAllUsersRequest = () => ({type: GET_ALL_USERS_REQUEST});
const getAllUsersSuccess = data => ({type: GET_ALL_USERS_SUCCESS, data});
const getAllUsersError = error => ({type: GET_ALL_USERS_ERROR, error});

const getUserInfoRequest = () => ({type: GET_USER_REQUEST});
const getUserInfoSuccess = data => ({type: GET_USER_SUCCESS, data});
const getUserInfoError = error => ({type: GET_USER_ERROR, error});

const deleteUserRequest = () => ({type: DELETE_USER_REQUEST});
const deleteUserSuccess = () => ({type: DELETE_USER_SUCCESS});
const deleteUserError = error => ({type: DELETE_USER_ERROR, error});

const editUserRequest = () => ({type: EDIT_USER_REQUEST});
const editUserSuccess = () => ({type: EDIT_USER_SUCCESS});
const editUserError = error => ({type: EDIT_USER_ERROR, error});

export const loginUser = userData => {
    return async dispatch => {
        dispatch(loginUserRequest());
        try {
            const response = await axiosBase.post('/users/sessions', userData);
            dispatch(loginUserSuccess(response.data));
            if(response.data.role === 'admin') {
                dispatch(push('/'));
            }
        } catch (e) {
            if(e.response && e.response.data) {
                if(!e.response.data.error.errors) {
                    toast.success(e.response.data.error);
                }
                dispatch(loginUserError(e.response.data));
            } else {
                dispatch(loginUserError(e.message));
            }
        }
    }
};

export const logoutUser = () => {
    return async dispatch => {
        dispatch(logoutUserRequest());
        try {
            const response = await axiosBase.delete('/users/sessions');
            toast.success(response.data.message);
            dispatch(logoutUserSuccess());
            setTimeout(() => {
                dispatch(push('/plug-page'));
            }, 3000);
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(logoutUserError(e.response.data.error));
            } else {
                dispatch(logoutUserError(e.message));
            }
        }
    };
};

export const registerUser = data => {
    return async dispatch => {
        dispatch(registerUserRequest());
        try {
            const response = await axiosBase.post('/users/register', data);
            toast.success(response.data.message);
            dispatch(registerUserSuccess());
            setTimeout(() => {
                dispatch(push('/login'));
            }, 3000);
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(registerUserError(e.response.data));
            } else {
                dispatch(registerUserError(e.message));
            }
        }
    };
};

export const cleanUsersError = () => {
    return async dispatch => {
        dispatch({type: CLEAN_USERS_ERRORS});
    };
};

export const getAllUsers = () => {
    return async dispatch => {
        dispatch(getAllUsersRequest());
        try {
            const response = await axiosBase.get('/users');
            dispatch(getAllUsersSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getAllUsersError(e.response.data.error));
            } else {
                dispatch(getAllUsersError(e.message));
            }
        }
    };
};

export const deleteUser = id => {
    return async dispatch => {
        dispatch(deleteUserRequest());
        try {
            const response = await axiosBase.delete(`/users/${id}`);
            toast.success(response.data.message);
            dispatch(getAllUsers());
            dispatch(deleteUserSuccess());
        } catch (e) {
            if(e.response && e.response.data) {
                if(e.response.data.error.errors) {
                    dispatch(deleteUserError(e.response.data));
                } else {
                    toast.success(e.response.data.error);
                    dispatch(deleteUserError(null));
                }
            } else {
                dispatch(deleteUserError(e.message));
            }
        }
    };
};

export const getUserInfo = (id) => {
    return async dispatch => {
        dispatch(getUserInfoRequest());
        try {
            const response = await axiosBase.get(`/users/${id}`);
            dispatch(getUserInfoSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getUserInfoError(e.response.data.error));
            } else {
                dispatch(getUserInfoError(e.message));
            }
        }
    };
};

export const editUser = (id, data) => {
    return async dispatch => {
        dispatch(editUserRequest());
        try {
            const response = await axiosBase.put(`/users/${id}`, data);
            toast.success(response.data.message);
            dispatch(editUserSuccess());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(editUserError(e.response.data));
            } else {
                dispatch(editUserError(e.message));
            }
        }
    };
};