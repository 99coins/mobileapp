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
    return firebase.firestore().collection('Lessons').get()
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

// export default function FetchPriceData() {
//     return dispatch => {
//         dispatch({ type: FETCHING_PRICE_DATA });

//         return axios.get(`${COIN_MARKET_CAP_BASE_URL}/v2/ticker/?limit=100`)
//             .then(res => {
//                 dispatch({ type: FETCHING_PRICE_DATA_SUCCESS, payload: res.data });
//             })
//             .catch(err => {
//                 dispatch({ type: FETCHING_PRICE_DATA_FAIL, payload: err });
//             });
//      };
// }