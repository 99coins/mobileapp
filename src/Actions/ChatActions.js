import {
    CHAT_BUTTON_TAPPED,
    GET_UNREAD_COUNT,
} from './../Utils/ActionTypes';


export const chatButtonTapped = () => {
    return {
        type: CHAT_BUTTON_TAPPED
    };
};

export function getUnreadCount() {
    return dispatch => {
        dispatch({ type: GET_UNREAD_COUNT });

        // return Smooch.getUnreadCount().then(res => {
        //     dispatch({ type: GET_UNREAD_COUNT_SUCCESS, payload: res });
        // });
    };
}
