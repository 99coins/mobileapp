import {
    CHAT_BUTTON_TAPPED,
} from './../Utils/ActionTypes';

const initialState = {
    shouldDisplayChatWindow: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case CHAT_BUTTON_TAPPED:
            return { ...state, shouldDisplayChatWindow: true };
        default: return state;
    }
}
