// state/favouritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FavouritesState {
    favItems: string[]
}

const getInitialFavItems = (): string[] => {
    if (typeof window === 'undefined') return []
    const localValue = localStorage.getItem('Wishlist')
    if (localValue) {
        try {
            return JSON.parse(localValue)
        } catch (error) {
            console.error('Error parsing JSON from localStorage:', error)
            return []
        }
    }
    return []
}

const initialState: FavouritesState = {
    favItems: getInitialFavItems()
}

const favouritesSlice = createSlice({
    name: 'favourites',
    initialState,
    reducers: {
        toggleFav: (state, action: PayloadAction<string>) => {
            const exists = state.favItems.find(item => item === action.payload)
            if (exists) {
                state.favItems = state.favItems.filter(item => item !== action.payload)
            } else {
                state.favItems.push(action.payload)
            }
        }
    }
})

export const { toggleFav } = favouritesSlice.actions
export default favouritesSlice.reducer