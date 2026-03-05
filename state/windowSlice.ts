import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface WindowState {
    isWide: boolean
}

const initialState: WindowState = {
    isWide: false
}

const windowSlice = createSlice({
    name: "window",
    initialState: initialState,
    reducers: {
        setIsWide: (state, action: PayloadAction<boolean>) => {
            state.isWide = action.payload
        }
    }
})

export const { setIsWide } = windowSlice.actions
export default windowSlice.reducer