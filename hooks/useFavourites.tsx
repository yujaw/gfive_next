// hooks/useFavourites.ts
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { toggleFav } from '@/state/favouritesSlice'

export const useFavourites = () => {
    const dispatch = useDispatch()
    const favItems = useSelector((state: RootState) => state.favourites.favItems)

    const toggle = (id: string) => {
        dispatch(toggleFav(id))
    }

    return { favItems, toggleFav: toggle }
}