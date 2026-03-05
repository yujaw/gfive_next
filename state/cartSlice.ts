import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
    id: string
    quantity: number
    price: number
}

interface CartState {
    cartItems: CartItem[]
    cartQuantity: number
    isOpen: boolean
}

const savedCart = typeof window !== 'undefined' ? localStorage.getItem('Cart') : null

const initialState: CartState = {
    cartItems: savedCart ? JSON.parse(savedCart) : [],
    cartQuantity: 0,
    isOpen: false,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        openCart: (state) => { state.isOpen = true },
        closeCart: (state) => { state.isOpen = false },

        increaseCartQuantity: (state, action: PayloadAction<{ id: string; price: number }>) => {
            const item = state.cartItems.find(i => i.id === action.payload.id)
            if (item) {
                item.quantity += 1
            } else {
                state.cartItems.push({ id: action.payload.id, quantity: 1, price: action.payload.price })
            }
            state.cartQuantity += 1
        },

        decreaseCartQuantity: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find(i => i.id === action.payload)
            if (item?.quantity === 1) {
                state.cartItems = state.cartItems.filter(i => i.id !== action.payload)
            } else if (item) {
                item.quantity -= 1
            }
            state.cartQuantity -= 1
        },

        removeFromCart: (state, action: PayloadAction<string>) => {
            const item = state.cartItems.find(i => i.id === action.payload)
            if (item) state.cartQuantity -= item.quantity
            state.cartItems = state.cartItems.filter(i => i.id !== action.payload)
        },

        clearCart: (state) => {
            state.cartItems = []
            state.cartQuantity = 0
        },
    },
})

export const { openCart, closeCart, increaseCartQuantity, decreaseCartQuantity, removeFromCart, clearCart } = cartSlice.actions
export default cartSlice.reducer  