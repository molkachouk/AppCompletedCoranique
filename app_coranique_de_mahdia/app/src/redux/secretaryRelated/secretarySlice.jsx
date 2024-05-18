import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    secretarysList: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const secretarySlice = createSlice({
    name: 'secretary',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        stuffDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.statestatus = "added";
        },
        getSuccess: (state, action) => {
            state.secretarysList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        underSecretaryControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        }
    },
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    underSecretaryControl,
    stuffDone,
} = secretarySlice.actions;

export const secretaryReducer = secretarySlice.reducer;