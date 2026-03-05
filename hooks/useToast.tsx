// hooks/useToast.ts
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { addToast, removeToast } from '@/state/toastSlice'

export const useToast = () => {
    const dispatch = useDispatch()
    const toasts = useSelector((state: RootState) => state.toast.toasts)

    const successNotification = (message: string) => {
        dispatch(addToast({ message, type: 'success' }))
    }

    const errorNotification = (message: string) => {
        dispatch(addToast({ message, type: 'error' }))
    }

    const dismissToast = (id: string) => {
        dispatch(removeToast(id))
    }

    return { toasts, successNotification, errorNotification, dismissToast }
}