import {
    CREATE_NEW_CATEGORY_ERROR, CREATE_NEW_CATEGORY_REQUEST,
    CREATE_NEW_CATEGORY_SUCCESS,
    DELETE_CATEGORY_ERROR, DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    EDIT_CATEGORY_ERROR, EDIT_CATEGORY_REQUEST,
    EDIT_CATEGORY_SUCCESS,
    GET_ALL_CATEGORIES_ERROR, GET_ALL_CATEGORIES_REQUEST,
    GET_ALL_CATEGORIES_SUCCESS,
    GET_CATEGORY_ERROR, GET_CATEGORY_REQUEST,
    GET_CATEGORY_SUCCESS
} from "../actionTypes";
import axiosBase from "../../axiosBase";
import {toast} from "react-toastify";
import {getAllArticles} from "./articlesActions";

const getAllCategoriesRequest = () => ({type: GET_ALL_CATEGORIES_REQUEST});
const getAllCategoriesSuccess = data => ({type: GET_ALL_CATEGORIES_SUCCESS, data});
const getAllCategoriesError = error => ({type: GET_ALL_CATEGORIES_ERROR, error});

const createNewCategoryRequest = () => ({type: CREATE_NEW_CATEGORY_REQUEST});
const createNewCategorySuccess = () => ({type: CREATE_NEW_CATEGORY_SUCCESS});
const createNewCategoryError = error => ({type: CREATE_NEW_CATEGORY_ERROR, error});

const editCategoryRequest = () => ({type: EDIT_CATEGORY_REQUEST});
const editCategorySuccess = () => ({type: EDIT_CATEGORY_SUCCESS});
const editCategoryError = error => ({type: EDIT_CATEGORY_ERROR, error});

const deleteCategoryRequest = () => ({type: DELETE_CATEGORY_REQUEST});
const deleteCategorySuccess = () => ({type: DELETE_CATEGORY_SUCCESS});
const deleteCategoryError = error => ({type: DELETE_CATEGORY_ERROR, error});

const getCategoryRequest = () => ({type: GET_CATEGORY_REQUEST});
const getCategorySuccess = data => ({type: GET_CATEGORY_SUCCESS, data});
const getCategoryError = error => ({type: GET_CATEGORY_ERROR, error});

export const getAllCategories = () => {
    return async dispatch => {
        dispatch(getAllCategoriesRequest());
        try {
            const response = await axiosBase.get('/categories');
            dispatch(getAllCategoriesSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getAllCategoriesError(e.response.data.error));
            } else {
                dispatch(getAllCategoriesError(e.message));
            }
        }
    };
};

export const createNewCategory = data => {
    return async dispatch => {
        dispatch(createNewCategoryRequest());
        try {
            const response = await axiosBase.post('/categories', data);
            toast.success(response.data.message);
            dispatch(createNewCategorySuccess());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(createNewCategoryError(e.response.data));
            } else {
                dispatch(createNewCategoryError(e.message));
            }
        }
    };
};

export const deleteCategory = id => {
    return async dispatch => {
        dispatch(deleteCategoryRequest());
        try {
            const response = await axiosBase.delete(`/categories/${id}`);
            toast.success(response.data.message);
            dispatch(getAllCategories());
            dispatch(getAllArticles());
            dispatch(deleteCategorySuccess());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(deleteCategoryError(e.response.data.error));
            } else {
                dispatch(deleteCategoryError(e.message));
            }
        }
    };
};

export const getCategory = id => {
    return async dispatch => {
        dispatch(getCategoryRequest());
        try {
            const response = await axiosBase.get(`/categories/${id}`);
            dispatch(getCategorySuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getCategoryError(e.response.data));
            } else {
                dispatch(getCategoryError(e.message));
            }
        }
    };
};

export const editCategory = (id, data) => {
    return async dispatch => {
        dispatch(editCategoryRequest());
        try {
            const response = await axiosBase.put(`/categories/${id}`, data);
            toast.success(response.data.message);
            dispatch(editCategorySuccess());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(editCategoryError(e.response.data));
            } else {
                dispatch(editCategoryError(e.message));
            }
        }
    };
};