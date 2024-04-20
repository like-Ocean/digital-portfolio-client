import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    ratings: [],
};

export const ratingSlice = createSlice({
    name: 'ratings',
    initialState,
    reducers: {
        addRating: (state, action) => {
            state.ratings.push(action.payload);
        },
        setRatings: (state, action) => {
            state.ratings = action.payload;
        },
        updateRating: (state, action) => {
            const index = state.ratings.findIndex((rating) => rating.id === action.payload.id);
            if (index !== -1) {
                state.ratings[index] = action.payload;
            }
        },
    },
});

export const ratingActions = { ...ratingSlice.actions };

export default ratingSlice.reducer;
