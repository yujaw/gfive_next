import { createContext, useState } from "react"
import Cart from '@/components/Cart'
import useLocalStorage from "@/hooks/useLocalStorage"

interface CartItem {
    id: String,
    quantity: number,
    price: number
}

interface ShoppingCartContext {
    getItemQuantity: (id: String) => number,
    increaseCartQuantity: (id: String) => void,
    decreaseCartQuantity: (id: String) => void,
    removeFromCart: (id: String) => void,
    openCart: () => void,
    closeCart: () => void,
    clearCart: () => void,
    cartItems: CartItem[],
    cartQuantity: number,
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)


export const ShoppingCartProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('Cart', [])
    const cartQuantity = cartItems.reduce((quantity: number, item: CartItem) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)

    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: String) {
        return cartItems.find((item: CartItem) => item.id === id)?.quantity || 0
    }

    const increaseCartQuantity = (id: String) => {
        setCartItems((currItems: CartItem[]) => {
            if (currItems.find((item: CartItem) => item.id === id) == null) {
                return [...currItems, { id, quantity: 1 }];
            }
            else {
                return currItems.map((item: CartItem) => {
                    if (item.id === id) {
                        return Object.assign(Object.assign({}, item), { quantity: item.quantity + 1 });
                    }
                    else {
                        return item;
                    }
                });
            }
        });
    }

    const decreaseCartQuantity = (id: String) => {
        setCartItems((currItems: CartItem[]) => {
            var _a;
            if (((_a = currItems.find((item: CartItem) => item.id === id)) === null || _a === void 0 ? void 0 : _a.quantity) === 1) {
                return currItems.filter((item: CartItem) => item.id !== id);
            }
            else {
                return currItems.map((item: CartItem) => {
                    if (item.id === id) {
                        return Object.assign(Object.assign({}, item), { quantity: item.quantity - 1 });
                    }
                    else {
                        return item;
                    }
                });
            }
        });
    }

    const removeFromCart = (id: String) => {
        setCartItems((currItems: CartItem[]) => {
            return currItems.filter((item: CartItem) => item.id !== id);
        });
    }

    const clearCart = () => {
        setCartItems([])
    }

    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            openCart,
            closeCart,
            clearCart,
            cartItems,
            cartQuantity,
        }}>
            {children}
            <Cart />
        </ShoppingCartContext.Provider>
    )
}

export default ShoppingCartContext;