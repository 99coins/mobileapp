import axios from 'axios';
import {
  FETCHING_LESSONS,
  FETCHING_LESSONS_SUCCESS,
  FETCHING_LESSONS_FAIL,
  SELECT_LESSON,
  FETCHING_LESSONS_DURATION,
  FETCHING_LESSONS_DURATION_SUCCESS,
  FETCHING_LESSONS_DURATION_FAIL
} from './../Utils/ActionTypes';
import { YOUTUBE_BASE_URL, COURSES_PLAYLIST_ID, YOUTUBE } from './../Utils/Constants';



export default function fetchLessonList() {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_LESSONS });

    return axios.get(`${YOUTUBE_BASE_URL}/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=${COURSES_PLAYLIST_ID}&key=${YOUTUBE}`)
      .then(res => {
        dispatch({ type: FETCHING_LESSONS_SUCCESS, payload: res.data });
        const lessonList = getState().lessonList;
        const id = res.data.items[0].id;
        if (lessonList.selectedItem === null) {
          dispatch(selectLesson(id));
        }
        dispatch(getLessonsDuration());
      })
      .catch(err => {
        dispatch({ type: FETCHING_LESSONS_FAIL, payload: err });
      });
  };
}
export function getLessonsDuration() {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_LESSONS_DURATION });
    const lessonList = getState().lessonList;
    let lessonIds = '';
        for (let i = 0; i < lessonList.data.items.length; i++) { 
           lessonIds += lessonList.data.items[i].contentDetails.videoId;
           if (i < lessonList.data.items.length - 1) {
              lessonIds += ',';
           }
    }

    return axios.get(`${YOUTUBE_BASE_URL}/videos?part=contentDetails&id=${lessonIds}&key=${YOUTUBE}`)
      .then(res => {
        dispatch({ type: FETCHING_LESSONS_DURATION_SUCCESS, payload: res.data });
      })
      .catch(err => {
        dispatch({ type: FETCHING_LESSONS_DURATION_FAIL, payload: err });
      });
  };
}

  export const selectLesson = (id) => {
    return dispatch => {
      dispatch({ type: SELECT_LESSON, payload: id });
    };
  };
