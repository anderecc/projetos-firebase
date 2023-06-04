import { MAP_GET_POSITION, MAP_SET_ADDRESS } from '../types';

const initialState = {
    position: {
        lat: '',
        lng: '',
    },
    address: '',
};

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case MAP_GET_POSITION:
            return { ...state, position: { ...action.payload } };

        case MAP_SET_ADDRESS:
            return { ...state, address: action.payload };

        default:
            return { ...state };
    }
};

export default mapReducer;
