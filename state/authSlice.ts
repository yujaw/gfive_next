import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface AuthState {
    accessToken: string,
    username: string,
    profileImage: string,
    firstname: string,
    lastname: string,
}

const initialState: AuthState = {
    accessToken: '',
    username: '',
    profileImage: '',
    firstname: '',
    lastname: '',
}

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<Partial<AuthState>>) => {
            // state.accessToken = action.payload.accessToken
            // state.username = action.payload.username
            // state.profileImage = action.payload.profileImage
            // state.firstname = action.payload.firstname
            // state.lastname = action.payload.lastname
            return { ...state, ...action.payload }
        },
        clearAuth: () => initialState
    }
})

export const { setAuth, clearAuth } = authSlice.actions
export default authSlice.reducer