import { configureStore } from "@reduxjs/toolkit"

// Slice
import authReducer from "./slices/authSlice"
// redux-toolkit query
import authServices from './services/authServices';
import postsServices from './services/postsServices';
import commentsServices from './services/commentsServices';
import categoryServices from './services/categoryServices';
import authorsServices from './services/authorsServices'
import usersServices from './services/usersServices';
import othersServices from './services/othersServices';

export const store = configureStore({
    reducer: {
        // slices
        auth: authReducer,

        // redux-toolkit query
        [authServices.reducerPath]: authServices.reducer,
        [postsServices.reducerPath]: postsServices.reducer,
        [commentsServices.reducerPath]: commentsServices.reducer,
        [categoryServices.reducerPath]: categoryServices.reducer,
        [authorsServices.reducerPath]: authorsServices.reducer,
        [usersServices.reducerPath]: usersServices.reducer,
        [othersServices.reducerPath]: othersServices.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(
            authServices.middleware,
            postsServices.middleware,
            commentsServices.middleware,
            categoryServices.middleware,
            authorsServices.middleware,
            usersServices.middleware,
            othersServices.middleware,
        );
    },
})