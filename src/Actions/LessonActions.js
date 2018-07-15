import firebase from 'react-native-firebase';
import {
  FETCHING_LESSONS,
  FETCHING_LESSONS_SUCCESS,
  FETCHING_LESSONS_FAIL,
  SELECT_LESSON
} from './../Utils/ActionTypes';


export default function fetchLessonList() {
  return (dispatch, getState) => {
    dispatch({ type: FETCHING_LESSONS });
    return firebase.firestore().collection('Lessons').orderBy('location').get()
      .then(snapshot => {
        dispatch({ type: FETCHING_LESSONS_SUCCESS, payload: snapshot.docs });
        const lessonList = getState().lessonList;
        const id = snapshot.docs[0].id;
        if (lessonList.selectedItem === null) {
          dispatch(selectLesson(id));
        }
      });
  };
}

export const selectLesson = (id) => {
  return dispatch => {
    dispatch({ type: SELECT_LESSON, payload: id });
  };
};
