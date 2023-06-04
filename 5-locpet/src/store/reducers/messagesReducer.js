import {
    MESSAGES_SET_ERROR_LOGIN,
    MESSAGES_SET_ERROR_MAP,
    MESSAGES_SET_ERROR_REGISTER,
} from '../types';

const initialState = {
    errors: {
        login: '',
        register: '',
        map: '',
    },
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case MESSAGES_SET_ERROR_LOGIN:
            return {
                ...state,
                errors: { ...state.errors, login: action.payload },
            };

        case MESSAGES_SET_ERROR_REGISTER:
            return {
                ...state,
                errors: { ...state.errors, register: action.payload },
            };

        case MESSAGES_SET_ERROR_MAP:
            return {
                ...state,
                errors: { ...state.errors, map: action.payload },
            };

        default:
            return { ...state };
    }
};

export default messagesReducer;
