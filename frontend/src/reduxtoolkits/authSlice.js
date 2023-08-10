import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn: false,
    token: '',
    role: '',
    name:'',
}

export const authSlice = createSlice({
    name: "Authentication Toolkit",
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.roles;
            state.name = action.payload.name;
            state.isLoggedIn = true;
        },
        logout: (state) => {
            state.token = '';
            state.role = '';
            state.isLoggedIn = false;
        },
    }
});

export const { login, logout } = authSlice.actions

export default authSlice.reducer