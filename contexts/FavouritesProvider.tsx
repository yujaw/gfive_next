'use client'

import { createContext } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

const FavouritesContext = createContext({
    favItems: [] as string[],
    toggleFav: (id: string) => { },
})

export function FavouritesProvider({ children }: { children: React.ReactNode }) {
    const [favItems, setFavItems] = useLocalStorage('Wishlist', [])


    const toggleFav = (id: String) => {
        setFavItems((currItems: Array<String>) => {
            if (currItems.find((item: String) => item === id) == null) {
                return [...currItems, id]
            } else {
                return currItems.filter((item: String) => item !== id)
            }
        })
    }

    return (
        <FavouritesContext.Provider value={{
            toggleFav,
            favItems
        }}>
            {children}
        </FavouritesContext.Provider>
    )
}

export default FavouritesContext