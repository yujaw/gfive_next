import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Sort {
    name: string
    order: number
}

interface FilterState {
    chip: string[]
    sort: Sort
    priceRange: number[]
    page: number
    filtermenu: boolean
}

const savedChips = typeof window !== 'undefined' ? localStorage.getItem('Chips') : null
const savedSort = typeof window !== 'undefined' ? localStorage.getItem('Sort') : null

const initialState: FilterState = {
    chip: savedChips ? JSON.parse(savedChips) : [],
    sort: savedSort ? JSON.parse(savedSort) : { name: 'name', order: 1 },
    priceRange: [0, 1000000],
    page: 1,
    filtermenu: false,
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        toggleChip: (state, action: PayloadAction<string>) => {
            if (state.chip.includes(action.payload)) {
                state.chip = state.chip.filter(item => item !== action.payload)
            } else {
                state.chip.push(action.payload)
            }
            state.page = 1
        },

        clearChip: (state) => {
            state.chip = []
            state.page = 1
        },

        setSort: (state, action: PayloadAction<Partial<Sort>>) => {
            state.sort = { ...state.sort, ...action.payload }
        },

        toggleOrder: (state) => {
            state.sort.order = state.sort.order === 1 ? -1 : 1
        },

        setPriceRange: (state, action: PayloadAction<number[]>) => {
            state.priceRange = action.payload
            state.page = 1
        },

        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },

        setFiltermenu: (state, action: PayloadAction<boolean>) => {
            state.filtermenu = action.payload
        },
    },
})

export const { toggleChip, clearChip, setSort, toggleOrder, setPriceRange, setPage, setFiltermenu } = filterSlice.actions
export default filterSlice.reducer