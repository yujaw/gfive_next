'use client'

import React, { Fragment, useState, useEffect, useRef } from 'react'
import Link from 'next/link';
import { useToast } from "@/hooks/useToast";
import { useAuth } from '@/hooks/useAuth';
import useInput from '@/hooks/useInput'
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import { useRouter } from 'next/navigation';
import { useWindow } from '@/hooks/useWindow';

const LOGIN_URL = '/auth'

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const SignIn = () => {

    const axiosPrivate = useAxiosPrivate()

    const router = useRouter()

    const emailRef = useRef<HTMLInputElement>(null)

    const { successNotification, errorNotification } = useToast()

    const [email, resetEmail, emailAttribs] = useInput('email', '')
    const [validEmail, setValidEmail] = useState(false)
    const [pass, setPass] = useState('')
    const { updateAuth } = useAuth()
    const { isWide } = useWindow()

    useEffect(() => {
        emailRef.current?.focus()
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email))
    }, [email])

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await axiosPrivate.post(
                LOGIN_URL,
                {
                    username: email,
                    password: pass,
                }
            )
            console.log(res.data)
            const { accessToken, username, profileImage, firstname, lastname } = res?.data
            console.log(username)

            console.log(res?.data)
            updateAuth({ accessToken, username, profileImage, firstname, lastname })
            successNotification("User logged in")
            resetEmail()
            setPass('')
            router.push('/');
        } catch (err: any) {
            console.log(err)
            if (!err?.response) {
                errorNotification('No Server Response')
            } else if (err.reponse?.status === 400) {
                errorNotification('Missing Email or Password')
            } else if (err.response?.status === 401) {
                errorNotification('Unauthorized')
            } else if (err.response?.status === 403) {
                errorNotification('Invalid Username or Password')
            } else {
                errorNotification('Login Failed')
            }
        }

    }

    return (
        <Fragment>
            <div className='signin'>
                <div className='signin_container'>
                    <div className="container">
                        <div className="header">
                            <Link href='/'>
                                <img src="/images/logo_text_color.png" alt="Logo" />
                            </Link>
                        </div>
                        <div className="title">Log In to your account</div>
                        <div className="api_login">
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" width="24" height="24">
                                    <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
                                </svg>
                                <span>
                                    Google
                                </span>
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24">
                                    <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                                </svg>
                                <span>
                                    Facebook
                                </span>
                            </button>
                        </div>
                        <div className="separator">
                            <span>or</span>
                        </div>
                        <form className="signin_form" onSubmit={handleSubmit}>
                            <div className="input_container">
                                <span className="desc">Email Address</span>
                                <input
                                    ref={emailRef}
                                    type="text"
                                    name="email"
                                    {...emailAttribs}
                                    required
                                    aria-invalid={validEmail ? 'false' : 'true'}
                                    aria-describedby='femailnote'
                                    autoComplete='off'
                                />
                            </div>
                            <div className="input_container">
                                <span className="desc">Password</span>
                                <input
                                    type="password"
                                    name="pass"
                                    onChange={(e) => setPass(e.target.value)}
                                    required
                                    value={pass}
                                    autoComplete='off'
                                />
                            </div>
                            <input type="submit" value="Sign In" disabled={!validEmail} />
                        </form>
                        <div className="signin_footer">Don't have an account? <Link href='/signup'>Sign Up</Link></div>
                    </div>
                </div>
                {isWide && (<div className="info"></div>)}
            </div>
        </Fragment>
    )
}

export default SignIn