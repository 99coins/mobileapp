import {
    FETCHING_NEWS_LIST,
    FETCHING_NEWS_LIST_SUCCESS,
    FETCHING_NEWS_LIST_FAIL,
    VIEWABLE_NEWS_ITEMS_CHANGED
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    data: [],
    hasError: false,
    errorMessage: null,
    viewableItems: []
};

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCHING_NEWS_LIST:
            return { ...state,    
                isFetching: true,
                hasError: false,
                errorMessage: null 
            };

        case FETCHING_NEWS_LIST_SUCCESS:
        if (state.data !== action.payload) {
            const items = action.payload;
            items[0].sponsored = true;
            return { ...state,    
                isFetching: false,
                data: items
            };
        }
        return state;
       

        case FETCHING_NEWS_LIST_FAIL:
            return { ...state,    
                isFetching: false,
                data: [],
                hasError: true,
                errorMessage: action.err 
            };

         case VIEWABLE_NEWS_ITEMS_CHANGED:
            return { ...state,    
                viewableItems: action.payload
            };

        default:
            return state;
    }
}
