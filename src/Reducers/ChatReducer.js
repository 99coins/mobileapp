import {
    CHAT_BUTTON_TAPPED,
    OPEN_CHAT_FORM,
    OPEN_CHAT_WINDOW,
    CLOSE_CHAT_FORM,
    SET_NICK_NAME,
    SAVE_NICNAME_SET,
    SAVE_NICNAME_SET_SUCCESS,
    CHECK_IF_NAME_SET_SUCCESS,
    GET_UNREAD_COUNT,
    GET_UNREAD_COUNT_SUCCESS
} from './../Utils/ActionTypes';

const initialState = {
    badgeCount: 0,
    modalVisible: false,
    userNickName: '',
    shouldShowModal: true
};

export default function (state = initialState, action) {
    switch (action.type) {

        case CHAT_BUTTON_TAPPED:
            console.log('CHAT BUTTON TAPPED');
            return state;
        case SAVE_NICNAME_SET:
            console.log('SAVE_NICNAME_SET');
            return state;
        case SAVE_NICNAME_SET_SUCCESS:
            console.log('SAVE_NICNAME_SET_SUCCESS');
            return { ...state, shouldShowModal: false, modalVisible: false };
        case OPEN_CHAT_WINDOW:
            console.log('OPEN_CHAT_WINDOW');
            return { ...state, badgeCount: 0 };
        case OPEN_CHAT_FORM:
            console.log('OPEN_CHAT_FORM');
            return { ...state, modalVisible: true };
        case CLOSE_CHAT_FORM:
            console.log('CLOSE_CHAT_FORM');
            return { ...state, modalVisible: false };
        case SET_NICK_NAME:
            console.log('SET_NICK_NAME');
            return { ...state, userNickName: action.payload };
        case CHECK_IF_NAME_SET_SUCCESS:
            console.log('CHECK_IF_NAME_SET_SUCCESS');
            return { ...state, shouldShowModal: (action.payload !== 'true') };
        case GET_UNREAD_COUNT:
             return state;
        case GET_UNREAD_COUNT_SUCCESS:
            return { ...state, badgeCount: action.payload };
        default: return state;
    }
}
