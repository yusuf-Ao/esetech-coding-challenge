import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authSignup } from "../actions/auth.actions";

const authSlice = createSlice ({
    name: 'auth',
    initialState: {
        token : null,
        user: null,
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


        builder.addCase(authSignup.fulfilled, (state, actions) => {
            state.authLoading = false
            state.user = actions.payload
        })
        builder.addCase(authSignup.pending, (state) => {
            state.authLoading = true
        })
        builder.addCase(authSignup.rejected, (state) => {
            state.authLoading = false
        })
    }
})

export default authSlice.reducer