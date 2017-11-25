import {
    FETCHING_PRICE_DATA,
    FETCHING_PRICE_DATA_SUCCESS,
    FETCHING_PRICE_DATA_FAIL
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    data: null,
    hasError: false,
    errorMessage: null
}

export default function (state = [], action) {

    switch (action.type) {

        case FETCHING_PRICE_DATA:
            return Object.assign(state, {
                isFetching: true,
                data: null,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_PRICE_DATA_SUCCESS:
            return Object.assign(state, {
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_PRICE_DATA_FAIL:
            return Object.assign(state, {
                isFetching: false,
                data: null,
                hasError: true,
                errorMessage: action.payload
            });

    
        default:
            return state;
    }
}
