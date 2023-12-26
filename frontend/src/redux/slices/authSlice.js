import { createSlice } from "@reduxjs/toolkit";

const getUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("user")) || null
}

const initialState = {
    user: getUserFromLocalStorage(),
    registerMessage: false,
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

    }
})

export const {
    login,
    logout,
} = authSlice.actions

export default authSlice.reducer