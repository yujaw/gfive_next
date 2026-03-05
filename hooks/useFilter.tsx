import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { toggleChip, clearChip, setSort, toggleOrder, setPriceRange, setPage, setFiltermenu } from '@/state/filterSlice'

export const useFilter = () => {
    const dispatch = useDispatch()
    const chip = useSelector((state: RootState) => state.filter.chip)
    const sort = useSelector((state: RootState) => state.filter.sort)
    const priceRange = useSelector((state: RootState) => state.filter.priceRange)
    const page = useSelector((state: RootState) => state.filter.page)
    const filtermenu = useSelector((state: RootState) => state.filter.filtermenu)

    return {
        chip,
        sort,
        priceRange,
        page,
        filtermenu,
        toggleChip: (item: string) => dispatch(toggleChip(item)),
        clearChip: () => dispatch(clearChip()),
        setSort: (value: { name?: string; order?: number }) => dispatch(setSort(value)),
        toggleOrder: () => dispatch(toggleOrder()),
        setPriceRange: (range: number[]) => dispatch(setPriceRange(range)),
        setPage: (page: number) => dispatch(setPage(page)),
        setFiltermenu: (value: boolean) => dispatch(setFiltermenu(value)),
    }
}