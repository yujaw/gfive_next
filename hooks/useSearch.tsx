import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setValues, toggleSearch, setTopSearch } from '@/state/searchSlice'

export const useSearch = () => {
    const dispatch = useDispatch()
    const values = useSelector((state: RootState) => state.search.values)
    const search = useSelector((state: RootState) => state.search.search)
    const topSearch = useSelector((state: RootState) => state.search.topSearch)

    return {
        values,
        search,
        topSearch,
        setValues: (val: Partial<typeof values>) => dispatch(setValues(val)),
        toggleSearch: (val: boolean) => dispatch(toggleSearch(val)),
        setTopSearch: (val: boolean) => dispatch(setTopSearch(val)),
    }
}