import {
    CREATE_NEW_ARTICLE_ERROR, CREATE_NEW_ARTICLE_REQUEST,
    CREATE_NEW_ARTICLE_SUCCESS,
    DELETE_ARTICLE_ERROR, DELETE_ARTICLE_REQUEST,
    DELETE_ARTICLE_SUCCESS,
    EDIT_ARTICLE_ERROR,
    EDIT_ARTICLE_REQUEST,
    EDIT_ARTICLE_SUCCESS,
    GET_ALL_ARTICLES_ERROR, GET_ALL_ARTICLES_REQUEST,
    GET_ALL_ARTICLES_SUCCESS,
    GET_ARTICLE_ERROR,
    GET_ARTICLE_REQUEST,
    GET_ARTICLE_SUCCESS
} from "../actionTypes";

const initialState = {
    articles: null,
    articlesError: null,
    article: null,
    articlesLoading: false
};

export const articlesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_ARTICLES_REQUEST:
        case CREATE_NEW_ARTICLE_REQUEST:
        case DELETE_ARTICLE_REQUEST:
        case EDIT_ARTICLE_REQUEST:
        case GET_ARTICLE_REQUEST:
            return {
                ...state,
                articlesLoading: true
            };
        case GET_ALL_ARTICLES_SUCCESS:
            return {
                ...state,
                articles: action.data,
                articlesError: null,
                articlesLoading: false
            };
        case CREATE_NEW_ARTICLE_SUCCESS:
            return {
                ...state,
                articlesError: null,
                articlesLoading: false
            };
        case GET_ARTICLE_SUCCESS:
            return {
                ...state,
                article: action.data,
                articlesError: null,
                articlesLoading: false
            };
        case DELETE_ARTICLE_SUCCESS:
        case EDIT_ARTICLE_SUCCESS:
            return {
                ...state,
                articlesError: null,
                articlesLoading: false
            };
        case GET_ALL_ARTICLES_ERROR:
        case CREATE_NEW_ARTICLE_ERROR:
        case DELETE_ARTICLE_ERROR:
        case EDIT_ARTICLE_ERROR:
        case GET_ARTICLE_ERROR:
            return {
                ...state,
                articlesError: action.error,
                articlesLoading: false
            };
        default:
            return state;
    }
};