import {
    FETCHING_COIN_LIST,
    FETCHING_COIN_LIST_SUCCESS,
    FETCHING_COIN_LIST_FAIL,
    GET_CACHED_COIN_LIST_SUCCESS,
    SET_COIN_SEARCH_INPUT
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    data: [],
    searchInput: null,
    page: 1,
    hasError: false,
    errorMessage: null
};

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCHING_COIN_LIST:
            return {
                ...state,
                isFetching: true,
                hasError: false,
                errorMessage: null
            };
        case GET_CACHED_COIN_LIST_SUCCESS:
            return {
                ...state,
                data: action.payload,
                hasError: false,
                errorMessage: null
            };
        case FETCHING_COIN_LIST_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            };

        case FETCHING_COIN_LIST_FAIL:

            return {
                ...state,
                isFetching: false,
                hasError: true,
                errorMessage: action.err
            };

        case SET_COIN_SEARCH_INPUT:

            return {
                ...state,
                searchInput: action.payload
            };
        default:
            return state;
    }
}
