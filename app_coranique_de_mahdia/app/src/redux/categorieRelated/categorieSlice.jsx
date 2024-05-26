import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categoriesList: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
};

const categorieSlice = createSlice({
    name: 'categorie',
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
            state.categoriesList = action.payload;
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
        underCategorieControl: (state) => {
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
    underGroupControl,
    stuffDone,
} = categorieSlice.actions;

export const categorieReducer = categorieSlice.reducer;