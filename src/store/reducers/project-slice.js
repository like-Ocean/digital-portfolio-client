import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    projects: [],
};

export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        clearProjects: () => initialState,
    },
});

export const projectActions = { ...projectSlice.actions };

export default projectSlice.reducer;
