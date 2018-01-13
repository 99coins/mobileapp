import {
    GET_UNREAD_COUNT,
    GET_UNREAD_COUNT_SUCCESS
} from './../Utils/ActionTypes';

const initialState = {
    badgeCount: 0
};

export default function (state = initialState, action) {
    switch (action.type) {

        case GET_UNREAD_COUNT:
             return state;
        case GET_UNREAD_COUNT_SUCCESS:
            return { ...state, badgeCount: action.payload };
        default: return state;
    }
}
