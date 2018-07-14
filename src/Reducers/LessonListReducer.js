import {
    FETCHING_LESSONS,
    FETCHING_LESSONS_SUCCESS,
    FETCHING_LESSONS_FAIL,
    SELECT_LESSON
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    data: [],
    hasError: false,
    errorMessage: null,
    selectedItem: null
};

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCHING_LESSONS:
            return { ...state,    
                isFetching: true,
                hasError: false,
                errorMessage: null 
            };

        case FETCHING_LESSONS_SUCCESS:
            return { ...state,    
                isFetching: false,
                data: action.payload
            };  
        case SELECT_LESSON:
            return { ...state,    
                selectedItem: action.payload,
        };      

        case FETCHING_LESSONS_FAIL:
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
