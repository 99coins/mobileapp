import {
    FETCHING_WEEKLY_UPDATE_VIDEO,
    FETCHING_WEEKLY_UPDATE_VIDEO_SUCCESS,
    FETCHING_WEEKLY_UPDATE_VIDEO_FAIL
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    thumbnailUrl: null,
    videoUrl: null,
    video: null,
    fullTitle: null,
    title: null,
    subtitle: null,
    hasError: false,
    errorMessage: null,
    id: 'weeklyVideo'
};

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCHING_WEEKLY_UPDATE_VIDEO:
        return {
            ...state,
            isFetching: true
        };

        case FETCHING_WEEKLY_UPDATE_VIDEO_SUCCESS:
        if (state.data !== action.payload) {
            return {
                ...state,
                isFetching: false,
                title: action.payload.snippet.title,
                videoId: action.payload.contentDetails.videoId,
                hasError: false,
                errorMessage: null
             };
        }
        return state;
       

        case FETCHING_WEEKLY_UPDATE_VIDEO_FAIL:
            return {
                ...state,
                isFetching: false,
                hasError: true,
                errorMessage: action.err
             };

    
        default:
            return state;
    }
}
