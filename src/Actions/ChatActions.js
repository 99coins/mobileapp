import firebase from 'react-native-firebase';
import {
    OPEN_CHAT_WINDOW,
    OPEN_CHAT_FORM,
    CLOSE_CHAT_FORM,
    GET_UNREAD_COUNT_SUCCESS,
    SAVE_NICNAME_SET,
    SAVE_NICNAME_SET_SUCCESS,
    SET_NICK_NAME,
    CHECK_IF_NAME_SET,
    CHECK_IF_NAME_SET_SUCCESS

} from './../Utils/ActionTypes';
import { AsyncStorage } from 'react-native';

const Smooch = require('react-native-smooch');

export function chatButtonTapped() {
    return (dispatch, getState) => {
       firebase.analytics().logEvent('click_chat_button', {});
       if (getState().chatState.shouldShowModal) {
          firebase.analytics().logEvent('page_chat_form', {}); 
          dispatch({ type: OPEN_CHAT_FORM });
          return;
       }
      dispatch(openChat());
    };
}
export const openChat = (nickName) => {
     return dispatch => {
         if (nickName) {
            console.log('Nickname:', nickName);
            Smooch.setFirstName(nickName);
            dispatch(saveNickNameSet());
            setTimeout(() => Smooch.show(), 1000);
         } else {
             Smooch.show();
         }
        firebase.analytics().logEvent('page_chat', {});
        dispatch({ type: OPEN_CHAT_WINDOW }); 
     };
};

export const closeChatForm = () => {
     return dispatch => {
         firebase.analytics().logEvent('click_dismiss_chat_form', {});
         dispatch({ type: CLOSE_CHAT_FORM });
     };
};

export const setNickName = (nickName) => {
     return dispatch => {
         firebase.analytics().logEvent('enter_nickname', { nickname: nickName });
         dispatch({ type: SET_NICK_NAME, payload: nickName });
     };
};

// export default function FetchCoinList() {
//     return dispatch => {
//         dispatch({ type: FETCHING_COIN_LIST });

//         return axios.get(`${CRYPTO_COMPARE_BASE_URL}/data/all/coinlist`)
//             .then(res => {
//                 dispatch({ type: FETCHING_COIN_LIST_SUCCESS, payload: res.data });
//             })
//             .catch(err => {
//                 dispatch({ type: FETCHING_COIN_LIST_FAIL, payload: err });
//             });
//     };
// }

export const saveNickNameSet = () => {
  return dispatch => {
    dispatch({ type: SAVE_NICNAME_SET });
    return AsyncStorage.setItem('@didSetNickName', 'true')
      .then(() => {
        firebase.analytics().logEvent('nickname_saved', {});
        dispatch({ type: SAVE_NICNAME_SET_SUCCESS }); 
      });
  };
};


export const checkIfNameWasSet = () => {
  return dispatch => {
    dispatch({ type: CHECK_IF_NAME_SET });
    return AsyncStorage.getItem('@didSetNickName')
      .then((value) => {
        dispatch(receiveData(value));
      });
  };
};
export const receiveData = (value) => {
  return {
    type: CHECK_IF_NAME_SET_SUCCESS,
    payload: value || '',
  };
};

// export function async checkIfNameWasSet() {

//     return dispatch => {
//         dispatch( {type: CHECK_IF_NAME_SET })

//         return (
//             try {
//                 const value = await AsyncStorage.getItem('@didSetNickName');
//                 if (value !== null) {
//                 console.log(value);
//                 this.setState({ shouldShowModal: false });
//              }
//             } catch (error) {
//                 console.log(error);
//             }
//             }
//         );
//     }

// }

export function getUnreadCount() {
    return dispatch => {
        //dispatch({ type: GET_UNREAD_COUNT });
        return Smooch.getUnreadCount().then(res => {
            dispatch({ type: GET_UNREAD_COUNT_SUCCESS, payload: res });
        });
    };
}
