import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setIsWide } from '../state/windowSlice'

export const useWindow = () => {
    const dispatch = useDispatch()
    const isWide = useSelector((state: RootState) => state.window.isWide)

    return {
        isWide,
        setIsWide: (wide: boolean) => dispatch(setIsWide(wide))
    }
}