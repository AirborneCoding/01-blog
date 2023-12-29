import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user")) || null
}

const initialState = {
    user: getUserFromLocalStorage(),
    registerMessage: false,
    isEmailVerified: false,
    verifyResetPasswordMessage: {
        isSend: false,
        isVerified: false,
        isChanged: false
    },
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action) {
            const user = { ...action.payload.user, token: action.payload.user.token };
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout(state, action) {
            state.user = null
            localStorage.removeItem("user")
        },
        setVerifyEmailMessage(state, action) {
            state.isEmailVerified = true
        },
        setIsSendVerifyPassword(state, action) {
            state.verifyResetPasswordMessage.isSend = action.payload
        },
        setIsVerifyPasswordLink(state, action) {
            state.verifyResetPasswordMessage.isVerified = action.payload
        },
        setIsPasswordChanged(state, action) {
            state.verifyResetPasswordMessage.isChanged = action.payload
        },

    }
})

export const {
    login,
    logout,

    setVerifyEmailMessage,
    setIsSendVerifyPassword,
    setIsVerifyPasswordLink,
    setIsPasswordChanged,
} = authSlice.actions

export default authSlice.reducer