import {
    FETCHING_PRICE_DATA,
    FETCHING_PRICE_DATA_SUCCESS,
    FETCHING_PRICE_DATA_FAIL
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    data: [],
    hasError: false,
    errorMessage: null
};

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCHING_PRICE_DATA:
            return Object.assign({}, state, {
                isFetching: true,
                data: state.data,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_PRICE_DATA_SUCCESS:
        if (state.data !== action.payload) {
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            });
        }
        return state;
       

        case FETCHING_PRICE_DATA_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                data: [],
                hasError: true,
                errorMessage: action.err
            });

    
        default:
            return state;
    }
}
