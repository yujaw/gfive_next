'use client'

import React, { Fragment, useEffect, useState } from 'react'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'

interface User {
    firstname?: string
    lastname?: string
    address?: string
    city?: string
    postalcode?: string
}

const AccountInfo = () => {
    const [user, setUser] = useState<User>({})
    const [original, setOriginal] = useState<User>({})  // ✅ for reset

    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth()
    const { successNotification, errorNotification } = useToast()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axiosPrivate.get<User>('/users')
                setUser(res.data)
                setOriginal(res.data)  // ✅ save original for reset
            } catch (err) {
                console.log(err)
            }
        }
        fetchData()
    }, [auth?.username])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            await axiosPrivate.put('/users', {
                firstname: user?.firstname,
                lastname: user?.lastname,
                address: user?.address,
                city: user?.city,
                postalcode: user?.postalcode
            })
            setOriginal(user)  // ✅ update original after save
            successNotification('Account updated successfully')
        } catch (err) {
            console.log(err)
            errorNotification('Failed to update account')
        }
    }

    const handleReset = () => {
        setUser(original)  // ✅ reset to original instead of window.location.reload()
    }

    return (
        <Fragment>
            <div className='account-desc'>
                <div className='title header'>
                    <div className="utils">
                        <div className="ico" />
                        <div className="ico" />
                        <div className="ico" />
                    </div>
                    Account Info
                </div>
                <form onSubmit={handleSubmit}>
                    <div className='container'>
                        <div className='sub_container'>
                            <div className='title'>Account</div>
                            <div className='items'>
                                <input
                                    type='text'
                                    placeholder='First Name'
                                    value={user.firstname || ''}
                                    onChange={e => setUser(curr => ({ ...curr, firstname: e.target.value }))}
                                />
                                <input
                                    type='text'
                                    placeholder='Last Name'
                                    value={user.lastname || ''}
                                    onChange={e => setUser(curr => ({ ...curr, lastname: e.target.value }))}
                                />
                            </div>
                            <div className='items'>
                                <input
                                    type='text'
                                    placeholder='Address'
                                    value={user.address || ''}
                                    onChange={e => setUser(curr => ({ ...curr, address: e.target.value }))}
                                />
                                <input
                                    type='text'
                                    placeholder='City'
                                    value={user.city || ''}
                                    onChange={e => setUser(curr => ({ ...curr, city: e.target.value }))}
                                />
                            </div>
                            <div className='items'>
                                <input
                                    type='number'
                                    placeholder='Zip'
                                    value={user.postalcode || ''}
                                    onChange={e => setUser(curr => ({ ...curr, postalcode: e.target.value }))}
                                />
                            </div>
                        </div>
                        <div className='button'>
                            <button type='button' className='secondary' onClick={handleReset}>Reset</button>
                            <button type='submit' className='primary'>Save</button>
                        </div>
                    </div>
                </form>
            </div>
        </Fragment>
    )
}

export default AccountInfo