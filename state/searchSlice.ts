import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Values {
    keyword: string,
    result: any
}

interface SearchState {
    values: Values,
    search: boolean,
    topSearch: boolean,
    // toggleSearch: () => void,
    // setTopSearch: (value: boolean) => void
}

const initialState: SearchState = {
    values: {
        keyword: '',
        result: []
    },
    topSearch: false,
    search: false
}

const searchSlice = createSlice({
    name: "search",
    initialState: initialState,
    reducers: {
        setValues: (state, action: PayloadAction<Partial<Values>>) => {
            state.values = { ...state.values, ...action.payload }
        },
        toggleSearch: (state, action: PayloadAction<boolean>) => {
            state.search = action.payload
        },
        setTopSearch: (state, action: PayloadAction<boolean>) => {
            state.topSearch = action.payload
        }
    }
})

export const { setValues, toggleSearch, setTopSearch } = searchSlice.actions
export default searchSlice.reducer