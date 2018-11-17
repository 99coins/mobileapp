import {
    APP_STATE_CHANGED
} from './../Utils/ActionTypes';


export const onAppStateChange = () => {
     return dispatch => {
         dispatch({ type: APP_STATE_CHANGED });
     };
};