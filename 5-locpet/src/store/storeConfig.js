import { configureStore } from '@reduxjs/toolkit';

import authReducer from './reducers/authReducer';
import messagesReducer from './reducers/messagesReducer';
import contextReducer from './reducers/contextReducer';
import clientsReducer from './reducers/clientsReducer';
import mapReducer from './reducers/mapReducer';

const storeConfig = configureStore({
    reducer: {
        auth: authReducer,
        messages: messagesReducer,
        context: contextReducer,
        clients: clientsReducer,
        map: mapReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default storeConfig;
