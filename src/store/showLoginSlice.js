import { createSlice } from "@reduxjs/toolkit";

const showLoginSlice = createSlice({
    name: 'showlogin',
    initialState: {
        showLogin: false,
    },
    reducers: {
        show: (state, action) => {
            state.showLogin = true;
        }
    }
})

export default showLoginSlice.reducer
export const {show} = showLoginSlice.actions

export const showAsync = amount => dispatch => {
    setTimeout(() => {
        dispatch(show(amount));
    }, 1000);
};
