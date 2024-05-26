import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    sallesList: [], // Initialize as an empty array
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const salleSlice = createSlice({
    name: 'salle',
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
            state.sallesList = action.payload;
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
        underSalleControl: (state) => {
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
    underSalleControl,
    stuffDone,
} = salleSlice.actions;

export const salleReducer = salleSlice.reducer;