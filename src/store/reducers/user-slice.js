import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuth: true,
    user: {
        id: 1,
        login: 'helops',
        email: 'ihelops@yandex.ru',
        first_name: 'Ахтем',
        surname: 'Махтиев',
        phone: '89220334557',
        about: 'mama',
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
    },
});

export const userActions = { ...userSlice.actions };
