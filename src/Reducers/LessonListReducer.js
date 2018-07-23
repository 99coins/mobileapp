import {
    FETCHING_LESSONS,
    FETCHING_LESSONS_SUCCESS,
    FETCHING_LESSONS_FAIL,
    FETCHING_LESSONS_DURATION_SUCCESS,
    SELECT_LESSON,
    PLAY_SELECTED_LESSON
} from './../Utils/ActionTypes';

const initialState = {
    isFetching: false,
    data: [],
    hasError: false,
    errorMessage: null,
    selectedItem: null,
    playSelected: false
};

export default function (state = initialState, action) {
    switch (action.type) {

        case FETCHING_LESSONS:
            return {
                ...state,
                isFetching: true,
                hasError: false,
                errorMessage: null
            };

        case FETCHING_LESSONS_SUCCESS:
            return {
                ...state,
                isFetching: false,
                data: action.payload
            };
        case SELECT_LESSON:
            return {
                ...state,
                selectedItem: action.payload,
            };
        case PLAY_SELECTED_LESSON:
            return {
                ...state,
                playSelected: action.payload,
            };

        case FETCHING_LESSONS_FAIL:
            return {
                ...state,
                isFetching: false,
                data: [],
                hasError: true,
                errorMessage: action.err
            };

        case FETCHING_LESSONS_DURATION_SUCCESS:
            {
                const updatedData = state.data;
                const updatedItems = action.payload.items;
                updatedItems.forEach((u) => {
                    const item = updatedData.items.filter(i => {
                        return u.id === i.contentDetails.videoId;
                    })[0];
                    item.contentDetails.duration = u.contentDetails.duration;
                });
                return {
                    ...state,
                    data: updatedData,
                };
            }

        default:
            return state;
    }
}
