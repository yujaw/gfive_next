import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store/store'
import { setAuth, clearAuth } from '@/state/authSlice'

export const useAuth = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state: RootState) => state.auth)

    const login = (authData: {
        accessToken: string
        username: string
        profileImage: string
        firstname: string
        lastname: string
    }) => {
        dispatch(setAuth(authData))
    }

    const logout = () => {
        dispatch(clearAuth())
    }

    const updateAuth = (data: Partial<typeof auth>) => {
        dispatch(setAuth(data))
    }

    return { auth, login, logout, updateAuth }
}