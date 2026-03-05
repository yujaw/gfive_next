// components/Toast/index.tsx
'use client'

import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { removeToast } from '@/state/toastSlice'
import type { RootState } from '@/store/store'

const ToastHandler = () => {
    const dispatch = useDispatch()
    const toasts = useSelector((state: RootState) => state.toast.toasts)
    const shownToasts = useRef<Set<string>>(new Set())

    useEffect(() => {
        toasts.forEach(({ id, message, type }) => {
            if (shownToasts.current.has(id)) return

            shownToasts.current.add(id)

            toast[type](message, {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
                onClose: () => {
                    dispatch(removeToast(id))
                    shownToasts.current.delete(id)
                }
            })
        })
    }, [toasts])

    return <ToastContainer />
}

export default ToastHandler