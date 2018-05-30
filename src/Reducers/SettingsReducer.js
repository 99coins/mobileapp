import {
    SELECTED_TARGET_CURRENCY
} from './../Utils/ActionTypes';
import { USD } from './../Utils/Constants';


const initialState = {
    targetCurrency: USD,
};

export default function (state = initialState, action) {
    switch (action.type) {

        case SELECTED_TARGET_CURRENCY:
            return { ...state,    
                targetCurrency: action.currency,
            };    
        default:
            return state;
    }
}
