'use client'

import { Provider } from 'react-redux'
import Store from '@/store/store'

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={Store}>
        {children}
    </Provider>
}