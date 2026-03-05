import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import {
    openCart,
    closeCart,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
    clearCart,
} from '../state/cartSlice'

export const useShoppingCart = () => {
    const dispatch = useDispatch()
    const cartItems = useSelector((state: RootState) => state.cart.cartItems)
    const isOpen = useSelector((state: RootState) => state.cart.isOpen)
    const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0)

    const getItemQuantity = (id: string) =>
        cartItems.find(item => item.id === id)?.quantity || 0

    return {
        cartItems,
        cartQuantity,
        isOpen,
        getItemQuantity,
        openCart: () => dispatch(openCart()),
        closeCart: () => dispatch(closeCart()),
        increaseCartQuantity: (id: string, price: number) => dispatch(increaseCartQuantity({ id, price })),
        decreaseCartQuantity: (id: string) => dispatch(decreaseCartQuantity(id)),
        removeFromCart: (id: string) => dispatch(removeFromCart(id)),
        clearCart: () => dispatch(clearCart()),
    }
}