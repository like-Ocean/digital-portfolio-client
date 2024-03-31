import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './reducers/user-slice.js';

export const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export const store = setupStore()

