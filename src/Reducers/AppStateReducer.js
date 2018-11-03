import { ActionConst } from 'react-native-router-flux';
import { AppState } from 'react-native';
import {
    APP_STATE_CHANGED
} from './../Utils/ActionTypes';

const initialState = {
  appState: AppState.currentState,
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus    
    case APP_STATE_CHANGED:
      return {
        ...state,
        appState: AppState.currentState,
      };

    // ...other actions

    default:
      return state;
  }
}