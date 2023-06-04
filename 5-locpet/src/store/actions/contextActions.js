import { CONTEXT_SET_LOADING, CONTEXT_SET_MAP } from '../types';

export const contextSetLoading = (value) => (dispatch) => {
    dispatch({ type: CONTEXT_SET_LOADING, payload: value });
};

export const contextSetMap = (value) => (dispatch) => {
    dispatch({ type: CONTEXT_SET_MAP, payload: value });
};
