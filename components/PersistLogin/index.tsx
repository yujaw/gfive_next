'use client'

import usePersistLogin from '@/hooks/usePersistLogin'
import { Fragment } from 'react'

const PersistLogin = ({ children }: { children: React.ReactNode }) => {
    const isLoading = usePersistLogin()

    if (isLoading) return null

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default PersistLogin