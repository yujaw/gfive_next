import axios from '../api/axios'
import { useAuth } from './useAuth'

const LOGOUT_URL = '/auth/logout'

const useLogout = () => {
    const { logout } = useAuth()

    const logoff = async () => {
        try {
            await axios
                .post(LOGOUT_URL, {}, {
                    withCredentials: true,
                })
                .then(() => {
                    logout()
                })
        } catch (err) {
            console.log(err)
        }
    }

    return logoff
}

export default useLogout