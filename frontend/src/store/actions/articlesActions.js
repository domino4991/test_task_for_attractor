import {
    CREATE_NEW_ARTICLE_ERROR,
    CREATE_NEW_ARTICLE_REQUEST,
    CREATE_NEW_ARTICLE_SUCCESS,
    DELETE_ARTICLE_ERROR,
    DELETE_ARTICLE_REQUEST,
    DELETE_ARTICLE_SUCCESS,
    EDIT_ARTICLE_ERROR, EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_SUCCESS,
    GET_ALL_ARTICLES_ERROR,
    GET_ALL_ARTICLES_REQUEST,
    GET_ALL_ARTICLES_SUCCESS,
    GET_ARTICLE_ERROR, GET_ARTICLE_REQUEST,
    GET_ARTICLE_SUCCESS
} from "../actionTypes";
import axiosBase from "../../axiosBase";
import {toast} from "react-toastify";

const getAllArticlesRequest = () => ({type: GET_ALL_ARTICLES_REQUEST});
const getAllArticlesSuccess = data => ({type: GET_ALL_ARTICLES_SUCCESS, data});
const getAllArticlesError = error => ({type: GET_ALL_ARTICLES_ERROR, error});

const createNewArticleRequest = () => ({type: CREATE_NEW_ARTICLE_REQUEST});
const createNewArticleSuccess = () => ({type: CREATE_NEW_ARTICLE_SUCCESS});
const createNewArticleError = error => ({type: CREATE_NEW_ARTICLE_ERROR, error});

const deleteArticleRequest = () => ({type: DELETE_ARTICLE_REQUEST});
const deleteArticleSuccess = () => ({type: DELETE_ARTICLE_SUCCESS});
const deleteArticleError = error => ({type: DELETE_ARTICLE_ERROR, error});

const getArticleRequest = () => ({type: GET_ARTICLE_REQUEST});
const getArticleSuccess = data => ({type: GET_ARTICLE_SUCCESS, data});
const getArticleError = error => ({type: GET_ARTICLE_ERROR, error});

const editArticleRequest = () => ({type: EDIT_ARTICLE_REQUEST});
const editArticleSuccess = () => ({type: EDIT_ARTICLE_SUCCESS});
const editArticleError = error => ({type: EDIT_ARTICLE_ERROR, error});

export const getAllArticles = () => {
    return async dispatch => {
        dispatch(getAllArticlesRequest());
        try {
            const response = await axiosBase.get('/articles');
            dispatch(getAllArticlesSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getAllArticlesError(e.response.data.error));
            } else {
                dispatch(getAllArticlesError(e.message));
            }
        }
    };
};

export const createNewArticle = data => {
    return async dispatch => {
        dispatch(createNewArticleRequest());
        try {
            const response = await axiosBase.post('/articles', data);
            toast.success(response.data.message);
            dispatch(createNewArticleSuccess());
        } catch (e) {
            if(e.response && e.response.data) {
                if(e.response.data.errors.category_id && e.response.data.errors.category_id.kind === 'ObjectId') {
                    e.response.data.errors.category_id.message = 'Поле "Категории" не должно быть пустым';
                }
                dispatch(createNewArticleError(e.response.data));
            } else {
                dispatch(createNewArticleError(e.message));
            }
        }
    };
};

export const deleteArticle = id => {
    return async dispatch => {
        dispatch(deleteArticleRequest());
        try {
            const response = await axiosBase.delete(`/articles/${id}`);
            toast.success(response.data.message);
            dispatch(getAllArticles());
            dispatch(deleteArticleSuccess());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(deleteArticleError(e.response.data.error));
            } else {
                dispatch(deleteArticleError(e.message));
            }
        }
    };
};

export const getArticle = id => {
    return async dispatch => {
        dispatch(getArticleRequest());
        try {
            const response = await axiosBase.get(`/articles/${id}`);
            dispatch(getArticleSuccess(response.data));
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(getArticleError(e.response.data.error));
            } else {
                dispatch(getArticleError(e.message));
            }
        }
    };
};

export const editArticle = (id, data) => {
    return async dispatch => {
        dispatch(editArticleRequest());
        try {
            const response = await axiosBase.put(`/articles/${id}`, data);
            toast.success(response.data.message);
            dispatch(editArticleSuccess());
        } catch (e) {
            if(e.response && e.response.data) {
                dispatch(editArticleError(e.response.data));
            } else {
                dispatch(editArticleError(e.message));
            }
        }
    };
};