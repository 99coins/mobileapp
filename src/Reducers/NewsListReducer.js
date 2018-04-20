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
            items[0].imageurl = 'https://ik.imagekit.io/bkjbek18z/content/wp-content/uploads/2018/04/Corporate-governance-underpins-DasCoin%E2%80%99s-rise.jpg';
            return { ...state,    
                isFetching: false,
                data: action.payload
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
