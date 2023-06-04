import { AUTH_RESET_USER, AUTH_SET_TOKEN, AUTH_SET_USER } from '../types';
const initialState = {
    user: { name: '', email: '', id: '' },
    token: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_SET_USER:
            return { ...state, user: { ...action.payload } };

        case AUTH_RESET_USER:
            return { user: { name: '', email: '', id: '' }, token: '' };

        case AUTH_SET_TOKEN:
            return { ...state, token: action.payload };

        default:
            return { ...state };
    }
};

export default authReducer;
