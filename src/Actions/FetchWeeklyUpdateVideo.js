import axios from 'axios';
import { NNBITCOINS_BASE_URL } from './../Utils/Constants';
import {
    FETCHING_WEEKLY_UPDATE_VIDEO,
    FETCHING_WEEKLY_UPDATE_VIDEO_SUCCESS,
    FETCHING_WEEKLY_UPDATE_VIDEO_FAIL
} from './../Utils/ActionTypes';

const VIMEO_ID = '179859217';

export default function FetchWeeklyUpdateVideo() {
    return dispatch => {
        dispatch({ type: FETCHING_WEEKLY_UPDATE_VIDEO });

        return axios.get(`${NNBITCOINS_BASE_URL}/${VIMEO_ID}/config`)
            .then(res => {
                dispatch({ type: FETCHING_WEEKLY_UPDATE_VIDEO_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: FETCHING_WEEKLY_UPDATE_VIDEO_FAIL, payload: err });
            });
    };
}
