'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import useLogout from '@/hooks/useLogout'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import { useToast } from "@/hooks/useToast"
import { useAuth } from '@/hooks/useAuth'
import { API_URL } from '@/utilities/constants'
import { useWindow } from '@/hooks/useWindow'

const USER_URL = '/users'

interface UserProfile {
    firstname?: string
    lastname?: string
    profileimage?: string
}

const Account = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<UserProfile>()
    const [uploading, setUploading] = useState(false)

    const { isWide } = useWindow()

    const axiosPrivate = useAxiosPrivate()
    const router = useRouter()
    const logout = useLogout()
    const imageRef = useRef<HTMLInputElement>(null)
    const { updateAuth, auth } = useAuth()
    const { successNotification, errorNotification } = useToast()

    useEffect(() => {
        const getUser = async () => {
            try {
                const response = await axiosPrivate.get(USER_URL)
                const userData = response.data
                console.log('userData:', userData)
                setProfile(userData)
                if (userData?.profileimage) {
                    updateAuth({ profileImage: userData.profileimage })
                }
            } catch (err) {
                console.error('Get user error:', err)
                router.replace('/signin')
            }
        }

        getUser()
    }, [])

    const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        const files = e.target.files
        if (!files || files.length === 0) return

        const file: File = files[0]

        if (file.size > 2 * 1024 * 1024) {
            errorNotification("File size too large (max 2MB)")
            e.target.value = ''
            return
        }

        const allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
        if (!allowedTypes.includes(file.type)) {
            errorNotification("Invalid file type. Please select a JPEG, PNG, GIF, or WebP image.")
            e.target.value = ''
            return
        }

        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const response = await axiosPrivate.put('/users', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })

            const userData = response.data.user || response.data
            setProfile(userData)
            if (userData?.profileimage) {
                updateAuth({ profileImage: userData.profileimage })
            }
            successNotification('Profile image updated successNotificationfully')
        } catch (err: any) {
            errorNotification(err.response?.data?.message || 'Failed to upload image')
        } finally {
            setUploading(false)
            e.target.value = ''
        }
    }

    const signout = async () => {
        await logout()
        router.replace('/signin')
    }

    console.log(API_URL)

    return (
        <Fragment>
            <div className='account-container'>
                <div className='account'>
                    <div className='account-navigation'>
                        <div className='nav-profile'>
                            <div
                                className={`image-container ${uploading ? 'uploading' : ''}`}
                                onClick={() => !uploading && imageRef.current?.click()}
                                style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}
                            >
                                {auth?.profileImage ? (
                                    <img src={`${API_URL}${auth?.profileImage}`} alt='Profile' style={{ opacity: uploading ? 0.5 : 1 }} />
                                ) : (
                                    <img src='/images/user.svg' alt='Profile' style={{ opacity: uploading ? 0.5 : 1 }} />
                                )}
                                <input
                                    type="file"
                                    ref={imageRef}
                                    hidden
                                    onChange={uploadImage}
                                    accept='image/jpeg,image/jpg,image/png,image/gif,image/webp'
                                    disabled={uploading}
                                />
                                <div className="overlay">
                                    {uploading ? (
                                        <div className="upload-spinner">Uploading...</div>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" height="1rem" viewBox="0 0 512 512">
                                            <path d="M288 109.3V352c0 17.7-14.3 32-32 32s-32-14.3-32-32V109.3l-73.4 73.4c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l128-128c12.5-12.5 32.8-12.5 45.3 0l128 128c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L288 109.3zM64 352H192c0 35.3 28.7 64 64 64s64-28.7 64-64H448c35.3 0 64 28.7 64 64v32c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V416c0-35.3 28.7-64 64-64zM432 456a24 24 0 1 0 0-48 24 24 0 1 0 0 48z" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div className='name'>
                                {`${profile?.firstname || ''} ${profile?.lastname || ''}`}
                            </div>
                            <div className='logout_btn'>
                                <button className='logout' onClick={signout}>Logout</button>
                            </div>
                        </div>
                        <div className='nav-contents'>
                            <Link href='/account'>
                                <div>
                                    <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 96 960 960' width='20'>
                                        <path d='M480 576q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160 896V784q0-34 17.5-62.5T224 678q62-31 126-46.5T480 616q66 0 130 15.5T736 678q29 15 46.5 43.5T800 784v112H160Zm80-80h480v-32q0-11-5.5-20T700 750q-54-27-109-40.5T480 696q-56 0-111 13.5T260 750q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560 416q0-33-23.5-56.5T480 336q-33 0-56.5 23.5T400 416q0 33 23.5 56.5T480 496Zm0-80Zm0 400Z' />
                                    </svg>
                                    {isWide && <span>Account Details</span>}
                                </div>
                            </Link>
                            <Link href='/account/shippinginfo'>
                                <div>
                                    <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 96 960 960' width='20'>
                                        <path d='M240 896q-50 0-85-35t-35-85H40V336q0-33 23.5-56.5T120 256h560v160h120l120 160v200h-80q0 50-35 85t-85 35q-50 0-85-35t-35-85H360q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T280 776q0-17-11.5-28.5T240 736q-17 0-28.5 11.5T200 776q0 17 11.5 28.5T240 816ZM120 696h32q17-18 39-29t49-11q27 0 49 11t39 29h272V336H120v360Zm600 120q17 0 28.5-11.5T760 776q0-17-11.5-28.5T720 736q-17 0-28.5 11.5T680 776q0 17 11.5 28.5T720 816Zm-40-200h170l-90-120h-80v120ZM360 516Z' />
                                    </svg>
                                    {isWide && <span>Shipping Details</span>}
                                </div>
                            </Link>
                            <Link href='/account/orders'>
                                <div>
                                    <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 96 960 960' width='20'>
                                        <path d='m400 486 80-40 80 40V296H400v190ZM280 776v-80h200v80H280Zm-80 160q-33 0-56.5-23.5T120 856V296q0-33 23.5-56.5T200 216h560q33 0 56.5 23.5T840 296v560q0 33-23.5 56.5T760 936H200Zm0-640v560-560Zm0 560h560V296H640v320l-160-80-160 80V296H200v560Z' />
                                    </svg>
                                    {isWide && <span>Orders</span>}
                                </div>
                            </Link>
                            <Link href='/account/wishlist'>
                                <div>
                                    <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 96 960 960' width='20'>
                                        <path d='m480 936-58-52q-101-91-167-157T150 608.5Q111 556 95.5 512T80 422q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810 608.5Q771 661 705 727T538 884l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518 376h-76q-15-41-55-67.5T300 282q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480 828Zm0-273Z' />
                                    </svg>
                                    {isWide && <span>Wishlist</span>}
                                </div>
                            </Link>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </Fragment>
    )
}

export default Account