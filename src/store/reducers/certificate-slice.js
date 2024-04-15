import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    certificates: [],
};

export const certificateSlice = createSlice({
    name: 'certificates',
    initialState,
    reducers: {
        setCertificates: (state, action) => {
            state.certificates = action.payload;
        },
        clearCertificates: () => initialState,
        createCertificate: (state, action) => {
            state.certificates.push(action.payload);
        },
        updateCertificate: (state, action) => {
            const index = state.certificates.findIndex(
                (certificate) => certificate.id === action.payload.id,
            );
            if (index !== -1) {
                state.certificates[index] = action.payload;
            }
        },
    },
});

export const certificateActions = { ...certificateSlice.actions };

export default certificateSlice.reducer;
