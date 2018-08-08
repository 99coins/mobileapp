import { ActionConst } from 'react-native-router-flux';

const initialState = {
  scene: 'Coins',
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {
    // focus action is dispatched when a new screen comes into focus    
    case 'Navigation/NAVIGATE':
      return {
        ...state,
        scene: action.routeName,
      };

    // ...other actions

    default:
      return state;
  }
}
