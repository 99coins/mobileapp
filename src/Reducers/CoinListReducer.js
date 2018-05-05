import {
    FETCHING_COIN_LIST,
    FETCHING_COIN_LIST_SUCCESS,
    FETCHING_COIN_LIST_FAIL,
    GET_CACHED_COIN_LIST_SUCCESS
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    data: [],
    baseImageUrl: '',
    hasError: false,
    errorMessage: null
};

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCHING_COIN_LIST:
            return { ...state,    
                isFetching: true,
                data: [],
                hasError: false,
                errorMessage: null 
            };
        case GET_CACHED_COIN_LIST_SUCCESS:
        case FETCHING_COIN_LIST_SUCCESS:
            return { ...state,    
                isFetching: false,
                data: Object.values(action.payload.Data),
                baseImageUrl: action.payload.BaseImageUrl,
                hasError: false,
                errorMessage: null 
            };

        case FETCHING_COIN_LIST_FAIL:

            return { ...state,    
                isFetching: false,
                data: [],
                hasError: true,
                errorMessage: action.err 
            };
        default:
            return state;
    }
}
