'use client'

import { useWindow } from '@/hooks/useWindow'
import React, { useEffect, Fragment } from 'react'

const WindowHelper = ({ children }: { children: React.ReactNode }) => {

    const { setIsWide } = useWindow()

    useEffect(() => {
        const checkWidth = () => setIsWide(window.innerWidth >= 768)
        checkWidth()
        window.addEventListener('resize', checkWidth)
        return () => window.removeEventListener('resize', checkWidth)
    }, [])

    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default WindowHelper
