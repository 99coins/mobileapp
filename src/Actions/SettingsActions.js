import {
    SELECTED_TARGET_CURRENCY
} from './../Utils/ActionTypes';
import { Currency } from './../Utils/Constants';


export const selectTargetCurrency = (currency: Currency) => {
     return dispatch => {
         dispatch({ type: SELECTED_TARGET_CURRENCY, currency });
     };
};
