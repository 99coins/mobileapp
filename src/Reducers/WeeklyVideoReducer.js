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
            const fullTitle = action.payload.title.split('-');
            return {
                ...state,
                isFetching: false,
                title: fullTitle[0],
                subtitle: fullTitle[1],
                videoUrl: action.payload.videos[0][1].url,
                video: action.payload.videos[0][1],
                shareUrl: action.payload.url,
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
