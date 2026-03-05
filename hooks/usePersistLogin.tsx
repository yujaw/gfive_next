import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import useRefreshToken from '@/hooks/useRefreshToken'

const usePersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true)
    const { auth } = useAuth()
    const refresh = useRefreshToken()

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }

        // ✅ if no accessToken, try to get one from the refresh cookie
        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false)

    }, [])

    return isLoading
}

export default usePersistLogin