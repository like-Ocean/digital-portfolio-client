import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comments: [],
};

export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload;
        },
        clearComments: () => initialState,
        addComment: (state, action) => {
            state.comments.push(action.payload);
        },
    },
});

export const commentActions = { ...commentSlice.actions };

export default commentSlice.reducer;
