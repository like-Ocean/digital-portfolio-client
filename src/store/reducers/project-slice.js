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
        createProject: (state, action) => {
            state.projects.push(action.payload);
        },
        updateProject: (state, action) => {
            const index = state.projects.findIndex(project => project.id === action.payload.id);
            if (index !== -1) {
                state.projects[index] = action.payload;
            }
        }
    },
});

export const projectActions = { ...projectSlice.actions };

export default projectSlice.reducer;
