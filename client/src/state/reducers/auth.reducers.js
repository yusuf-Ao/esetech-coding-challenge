import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authSignout, authSignup } from "../actions/auth.actions";

const authSlice = createSlice ({
    name: 'auth',
    initialState: {
        token : null,
        user: localStorage.getItem('esetech-user') ? JSON.parse(localStorage.getItem('esetech-user')) : null,
        authLoading: false
    },
    extraReducers: (builder) => {
        builder.addCase(authLogin.fulfilled, (state, actions) => {
            state.authLoading = false
            state.user = actions.payload
        })
        builder.addCase(authLogin.pending, (state) => {
            state.authLoading = true
        })
        builder.addCase(authLogin.rejected, (state) => {
            state.authLoading = false
        })


        builder.addCase(authSignup.fulfilled, (state) => {
            state.authLoading = false
        })
        builder.addCase(authSignup.pending, (state) => {
            state.authLoading = true
        })
        builder.addCase(authSignup.rejected, (state) => {
            state.authLoading = false
        })


        builder.addCase(authSignout.fulfilled, (state) => {
            state.authLoading = false
            state.user = null
            state.token = null
        })
        builder.addCase(authSignout.pending, (state) => {
            state.authLoading = true
        })
        builder.addCase(authSignout.rejected, (state) => {
            state.authLoading = false
        })
    }
})

export default authSlice.reducer