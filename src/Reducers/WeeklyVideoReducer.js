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
    hasError: false,
    errorMessage: null,
    id: 'weeklyVideo'
};

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCHING_WEEKLY_UPDATE_VIDEO:
            return Object.assign({}, state, {
                isFetching: true,
                thumbnailUrl: state.thumbnailUrl,
                videoUrl: state.videoUrl,
                video: state.video,
                hasError: false,
                errorMessage: null
            });

        case FETCHING_WEEKLY_UPDATE_VIDEO_SUCCESS:
        if (state.data !== action.payload) {
            return Object.assign({}, state, {
                isFetching: false,
                thumbnailUrl: 'https://embed-ssl.wistia.com/deliveries/8ec51a3eae023a6c44de2b7f03012f126eda62f9.jpg?image_crop_resized=640x330'/*action.payload.videos[0].thumbnail.url*/,
                videoUrl: action.payload.videos[0].assets[1].url,
                video: action.payload.videos[0].assets[1],
                hasError: false,
                errorMessage: null
            }); 
        }
        return state;
       

        case FETCHING_WEEKLY_UPDATE_VIDEO_FAIL:
            return Object.assign({}, state, {
                isFetching: false,
                thumbnailUrl: null,
                videoUrl: null,
                video: null,
                hasError: true,
                errorMessage: action.err
            });

    
        default:
            return state;
    }
}
