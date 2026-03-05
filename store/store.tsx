import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/state/authSlice"
import toastReducer from "@/state/toastSlice"
import searchReducer from "@/state/searchSlice"
import cartReducer from "@/state/cartSlice"
import filterReducer from "@/state/filterSlice"
import windowReducer from "@/state/windowSlice"
import favouritesReducer from "@/state/favouritesSlice"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer,
        search: searchReducer,
        cart: cartReducer,
        filter: filterReducer,
        window: windowReducer,
        favourites: favouritesReducer
    },
})

store.subscribe(() => {
    localStorage.setItem('Chips', JSON.stringify(store.getState().filter.chip))
    localStorage.setItem('Sort', JSON.stringify(store.getState().filter.sort))
    localStorage.setItem('Cart', JSON.stringify(store.getState().cart.cartItems))
})

export default store