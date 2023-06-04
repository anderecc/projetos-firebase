import { CLIENTS_GET_DATA } from '../types';

const initialState = {
    data: [],
};

const clientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case CLIENTS_GET_DATA:
            return { ...state, data: [...action.payload] };
        default:
            return { ...state };
    }
};

export default clientsReducer;
