import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './reducers/user-slice.js';
import {projectSlice} from "./reducers/project-slice.js";

export const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [projectSlice.name]: projectSlice.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export const store = setupStore()

