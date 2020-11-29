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

const initialState = {
    categories: null,
    category: null,
    categoriesError: null,
    categoriesLoading: false
};

export const categoriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_REQUEST:
        case GET_ALL_CATEGORIES_REQUEST:
        case CREATE_NEW_CATEGORY_REQUEST:
        case DELETE_CATEGORY_REQUEST:
        case EDIT_CATEGORY_REQUEST:
            return {
                ...state,
                categoriesLoading: true
            };
        case GET_ALL_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.data,
                categoriesError: null,
                categoriesLoading: false
            };
        case CREATE_NEW_CATEGORY_SUCCESS:
            return {
                ...state,
                categoriesError: null,
                categoriesLoading: false
            };
        case DELETE_CATEGORY_SUCCESS:
        case EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                categoriesError: null,
                categoriesLoading: false
            };
        case GET_CATEGORY_SUCCESS:
            return {
                ...state,
                category: action.data,
                categoriesError: null,
                categoriesLoading: false
            };
        case GET_CATEGORY_ERROR:
        case GET_ALL_CATEGORIES_ERROR:
        case CREATE_NEW_CATEGORY_ERROR:
        case DELETE_CATEGORY_ERROR:
        case EDIT_CATEGORY_ERROR:
            return {
                ...state,
                categoriesError: action.error,
                categoriesLoading: false
            };
        default:
            return state;
    }
};