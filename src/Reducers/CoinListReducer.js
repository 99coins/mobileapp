import {
    FETCHING_COIN_LIST,
    FETCHING_COIN_LIST_SUCCESS,
    FETCHING_COIN_LIST_FAIL
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    data: [],
    hasError: false,
    errorMessage: null
};

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCHING_COIN_LIST:
            return Object.assign(state, {
                isFetching: true,
                data: [],
                hasError: false,
                errorMessage: null
            });

        case FETCHING_COIN_LIST_SUCCESS:
            return Object.assign(state, {
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_COIN_LIST_FAIL:
            return Object.assign(state, {
                isFetching: false,
                data: [],
                hasError: true,
                errorMessage: action.payload
            });

    
        default:
            return state;
    }
}
