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
                thumbnailUrl: action.payload.video.thumbs['640'],
                videoUrl: action.payload.request.files.hls.cdns.akfire_interconnect_quic.url,
                video: action.payload.video,
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
