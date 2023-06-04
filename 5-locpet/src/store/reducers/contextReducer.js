import { CONTEXT_SET_LOADING, CONTEXT_SET_MAP } from '../types';

const initialState = {
    loading: false,
    mapVisible: false,
};

const contextReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONTEXT_SET_LOADING:
            return { ...state, loading: action.payload };
        case CONTEXT_SET_MAP:
            return { ...state, mapVisible: action.payload };
        default:
            return { ...state };
    }
};

export default contextReducer;
