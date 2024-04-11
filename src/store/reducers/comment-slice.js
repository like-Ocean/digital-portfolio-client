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
    },
});

export const commentActions = { ...commentSlice.actions };

export default commentSlice.reducer;
