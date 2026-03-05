import axios from '../api/axios'
import { useAuth } from '@/hooks/useAuth'

const REFRESH_URL = '/auth/refresh'

const useRefreshToken = () => {
    const { updateAuth } = useAuth()

    const refresh = async () => {
        const response = await axios.get(REFRESH_URL, {
            withCredentials: true,
        })

        updateAuth({
            accessToken: response.data.accessToken,
            username: response.data.username,
            profileImage: response.data.profileImage,
        })

        return response.data.accessToken
    }

    return refresh
}

export default useRefreshToken