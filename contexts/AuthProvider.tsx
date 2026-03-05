'use client'

import { createContext, Dispatch, SetStateAction, useState } from 'react'

interface AuthInterface {
    accessToken: string,
    username: string,
    profileImage: string,
    firstname: string,
    lastname: string,
}

interface AuthContextInterface {
    auth: AuthInterface,
    setAuth: Dispatch<SetStateAction<AuthInterface>>,
}

const AuthContext = createContext({} as AuthContextInterface)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<AuthInterface>({} as AuthInterface)

    return (
        <AuthContext.Provider value={{
            auth,
            setAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext