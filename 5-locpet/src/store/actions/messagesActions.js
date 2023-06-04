import {
    MESSAGES_SET_ERROR_LOGIN,
    MESSAGES_SET_ERROR_MAP,
    MESSAGES_SET_ERROR_REGISTER,
} from '../types';

export const messagesSetErrorLogin = (message) => (dispatch) => {
    dispatch({ type: MESSAGES_SET_ERROR_LOGIN, payload: message });
};
export const messagesSetErrorRegister = (message) => (dispatch) => {
    dispatch({ type: MESSAGES_SET_ERROR_REGISTER, payload: message });
};

export const messagesSetErrorMap = (message) => (dispatch) => {
    dispatch({ type: MESSAGES_SET_ERROR_MAP, payload: message });
};
