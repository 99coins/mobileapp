import axios from 'axios';
import { YOUTUBE_BASE_URL, NEWS_PLAYLIST_ID, YOUTUBE } from './../Utils/Constants';
import {
    FETCHING_WEEKLY_UPDATE_VIDEO,
    FETCHING_WEEKLY_UPDATE_VIDEO_SUCCESS,
    FETCHING_WEEKLY_UPDATE_VIDEO_FAIL
} from './../Utils/ActionTypes';

export default function fetchWeeklyUpdateVideo() {
    return dispatch => {
        dispatch({ type: FETCHING_WEEKLY_UPDATE_VIDEO });

        return axios.get(`${YOUTUBE_BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=1&playlistId=${NEWS_PLAYLIST_ID}&key=${YOUTUBE}`)
            .then(res => {
                dispatch({ type: FETCHING_WEEKLY_UPDATE_VIDEO_SUCCESS, payload: res.data.items[0] });
            })
            .catch(err => {
                dispatch({ type: FETCHING_WEEKLY_UPDATE_VIDEO_FAIL, payload: err });
            });
    };
}

