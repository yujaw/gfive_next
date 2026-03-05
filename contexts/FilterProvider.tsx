import { createContext, useState } from "react"
import useLocalStorage from "../hooks/useLocalStorage"

interface Sort {
    name: string
    order: number
}

interface FilterContextType {
    chip: string[]
    clearChip: () => void
    setSort: (value: Sort | ((curr: Sort) => Sort)) => void
    sort: Sort
    toggleOrder: () => void
    toggleChip: (items: string) => void
    page: number
    setPage: React.Dispatch<React.SetStateAction<number>>
    priceRange: number[]
    setPriceRange: (range: number[]) => void
    filtermenu: boolean
    setFiltermenu: React.Dispatch<React.SetStateAction<boolean>>
}

const FilterContext = createContext<FilterContextType>({} as FilterContextType)

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
    const [chip, setChip] = useLocalStorage<string[]>('Chips', [])
    const [sort, setSort] = useLocalStorage<Sort>('Sort', {
        name: "name",
        order: 1,
    })
    const [priceRange, setPriceRange] = useState<number[]>([0, 1000000])
    const [page, setPage] = useState<number>(1)
    const [filtermenu, setFiltermenu] = useState<boolean>(false)

    const toggleChip = (items: string) => {
        setChip((currItems: string[]) => {
            if (!currItems.includes(items)) {
                return [...currItems, items]
            } else {
                return currItems.filter((item) => item !== items)
            }
        })
        setPage(1)
    }

    const toggleOrder = () => {
        setSort((curr: Sort) => ({ ...curr, order: curr.order === 1 ? -1 : 1 }))
    }

    const clearChip = () => {
        setChip([])
        setPage(1)
    }

    const updatePriceRange = (newRange: number[]) => {
        setPriceRange(newRange)
        setPage(1)
    }

    return (
        <FilterContext.Provider
            value={{
                chip,
                clearChip,
                setSort,
                sort,
                toggleOrder,
                toggleChip,
                page,
                setPage,
                priceRange,
                setPriceRange: updatePriceRange,
                filtermenu,
                setFiltermenu,
            }}
        >
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContext