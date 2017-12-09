import {
    FETCHING_NEWS_LIST,
    FETCHING_NEWS_LIST_SUCCESS,
    FETCHING_NEWS_LIST_FAIL
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    data: [],
    hasError: false,
    errorMessage: null
};

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCHING_NEWS_LIST:
            return Object.assign({}, state, {
                isFetching: true,
                data: state.data,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_NEWS_LIST_SUCCESS:
        console.log('SUCCESSS**********');
        console.log(action.payload);
        if (state.data !== action.payload) {
            return Object.assign({}, state, {
                isFetching: false,
                data: action.payload,
                hasError: false,
                errorMessage: null
            });
        }
        return state;
       

        case FETCHING_NEWS_LIST_FAIL:
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
