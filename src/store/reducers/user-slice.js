import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: false,
    user: {
        id: null,
        login: null,
        email: null,
        first_name: null,
        surname: null,
        country: null,
        city: null,
        avatar: null,
        phone: null,
        about: null,
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuth = true;
            state.user = action.payload;
        },
        logout: () => initialState,
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
});

export const userActions = { ...userSlice.actions };
