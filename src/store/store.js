import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './reducers/user-slice.js';
import { projectSlice } from './reducers/project-slice.js';
import { commentSlice } from './reducers/comment-slice.js';
import { certificateSlice } from './reducers/certificate-slice.js';
import { ratingSlice } from './reducers/rating-slice.js';

export const rootReducer = combineReducers({
    [userSlice.name]: userSlice.reducer,
    [projectSlice.name]: projectSlice.reducer,
    [commentSlice.name]: commentSlice.reducer,
    [certificateSlice.name]: certificateSlice.reducer,
    [ratingSlice.name]: ratingSlice.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export const store = setupStore();
