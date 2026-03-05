'use client'

import React, { Fragment, useState, useRef, useEffect, FormEvent } from 'react'
import Link from 'next/link';
import axios from '@/api/axios'
import { useToast } from '@/hooks/useToast';
import { useRouter } from 'next/navigation';
import { useWindow } from '@/hooks/useWindow';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const REGISTER_URL = '/users'

const Signup = () => {

    const fnameRef = useRef<HTMLInputElement>(null)
    const lnameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const errRef = useRef<HTMLDivElement>(null)

    const [fname, setFname] = useState('')
    const [validFname, setValidFname] = useState(false)
    const [fnameFocus, setFnameFocus] = useState(false)

    const [lname, setLname] = useState('')
    const [validLname, setValidLname] = useState(false)
    const [lnameFocus, setLnameFocus] = useState(false)

    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(false)
    const [emailFocus, setEmailFocus] = useState(false)

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [check, setCheck] = useState(false)
    const [errMsg, setErrMsg] = useState('errmsg')

    const { errorNotification, successNotification } = useToast()
    const { isWide } = useWindow()
    const router = useRouter()

    useEffect(() => {
        fnameRef?.current?.focus()
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidFname(USER_REGEX.test(fname));
    }, [fname])

    useEffect(() => {
        setValidLname(USER_REGEX.test(lname));
    }, [lname])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd, matchPwd])

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const emailValid = EMAIL_REGEX.test(email)
        const fnameValid = USER_REGEX.test(fname)
        const lnameValid = USER_REGEX.test(lname)
        const pwdValid = PWD_REGEX.test(pwd)

        if (!emailValid || !fnameValid || !lnameValid || !pwdValid) {
            errorNotification('Invalid Input')
            return
        }

        if (!check) return errorNotification('You must agree to our privacy policy and terms of service to continue')

        postData(fname, lname, pwd, email)
    }

    const postData = async (fname: string, lname: string, password: string, email: string) => {
        try {
            await axios
                .post(REGISTER_URL, { firstname: fname, lastname: lname, username: email, password })
                .then(() => {
                    successNotification("User Created Successfully")
                    router.push('/')
                })
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred'
            errorNotification(errorMessage)
        }
    }

    return (
        <Fragment>
            <div className='signup'>
                {
                    isWide && (
                        <div className="info"></div>
                    )
                }
                <div className="signup_container">
                    <div className="container">
                        <div className="header">
                            <Link href='/'>
                                <img src="/images/logo_text_color.png" alt="Logo" />
                            </Link>
                        </div>
                        <div className="title">Create your account</div>
                        <div className="api_login">
                            <button>
                                {/* <svg width="52" height="52" role="img"><title>Google's Logo</title><g id="Google-Button" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><rect x="0" y="0" width="52" height="52" rx="2"></rect><g id="logo_googleg_48dp" transform="translate(13.65, 13.65) scale(1.4300000000000002)"><path d="M17.64,9.20454545 C17.64,8.56636364 17.5827273,7.95272727 17.4763636,7.36363636 L9,7.36363636 L9,10.845 L13.8436364,10.845 C13.635,11.97 13.0009091,12.9231818 12.0477273,13.5613636 L12.0477273,15.8195455 L14.9563636,15.8195455 C16.6581818,14.2527273 17.64,11.9454545 17.64,9.20454545 L17.64,9.20454545 Z" id="Shape" fill="#4285F4"></path><path d="M9,18 C11.43,18 13.4672727,17.1940909 14.9563636,15.8195455 L12.0477273,13.5613636 C11.2418182,14.1013636 10.2109091,14.4204545 9,14.4204545 C6.65590909,14.4204545 4.67181818,12.8372727 3.96409091,10.71 L0.957272727,10.71 L0.957272727,13.0418182 C2.43818182,15.9831818 5.48181818,18 9,18 L9,18 Z" id="Shape" fill="#34A853"></path><path d="M3.96409091,10.71 C3.78409091,10.17 3.68181818,9.59318182 3.68181818,9 C3.68181818,8.40681818 3.78409091,7.83 3.96409091,7.29 L3.96409091,4.95818182 L0.957272727,4.95818182 C0.347727273,6.17318182 0,7.54772727 0,9 C0,10.4522727 0.347727273,11.8268182 0.957272727,13.0418182 L3.96409091,10.71 L3.96409091,10.71 Z" id="Shape" fill="#FBBC05"></path><path d="M9,3.57954545 C10.3213636,3.57954545 11.5077273,4.03363636 12.4404545,4.92545455 L15.0218182,2.34409091 C13.4631818,0.891818182 11.4259091,0 9,0 C5.48181818,0 2.43818182,2.01681818 0.957272727,4.95818182 L3.96409091,7.29 C4.67181818,5.16272727 6.65590909,3.57954545 9,3.57954545 L9,3.57954545 Z" id="Shape" fill="#EA4335"></path><path d="M0,0 L18,0 L18,18 L0,18 L0,0 Z" id="Shape"></path></g></g></svg> */}
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
                        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                        <form className="signup_form" onSubmit={handleSubmit}>
                            <div className="input_container">
                                <span className="desc">
                                    First Name
                                </span>
                                <input ref={fnameRef}
                                    // autoComplete='off'
                                    type="text"
                                    name="fname"
                                    onChange={(e) => { setFname(e.target.value) }}
                                    value={fname}
                                    required
                                    aria-invalid={validFname ? "false" : "true"}
                                    aria-describedby="fnamenote"
                                    onFocus={() => setFnameFocus(true)}
                                    onBlur={() => setFnameFocus(false)}
                                />
                            </div>
                            <div className="input_container">
                                <span className="desc">Last Name</span>
                                <input ref={lnameRef}
                                    // autoComplete='off'
                                    type="text"
                                    name="lname"
                                    onChange={(e) => { setLname(e.target.value) }}
                                    value={lname}
                                    required
                                    aria-invalid={validLname ? "false" : "true"}
                                    aria-describedby="lnamenote"
                                    onFocus={() => setLnameFocus(true)}
                                    onBlur={() => setLnameFocus(false)}
                                />
                            </div>
                            <div className="input_container">
                                <span className="desc">Email Address</span>
                                <input ref={emailRef}
                                    // autoComplete='off'
                                    type="text"
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="emailnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                            </div>
                            <div className="input_container">
                                <span className="desc">Password</span>
                                <input
                                    // autoComplete='off'
                                    type="password"
                                    name="pass"
                                    onChange={(e) => { setPwd(e.target.value) }}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="passnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                            </div>
                            <div className="input_container">
                                <span className="desc">Confirm Password</span>
                                <input
                                    // autoComplete='off'
                                    type="password"
                                    name="c_pass"
                                    onChange={(e) => { setMatchPwd(e.target.value) }}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="cpassnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                            </div>
                            <div className="terms_container">
                                <input
                                    type="checkbox"
                                    name="check"
                                    checked={check}
                                    onChange={() => setCheck(!check)}
                                />
                                <span className='desc'>I accept the <Link href='/privacy'>Privacy Policy</Link> and the <Link href='/terms'>Terms of Service</Link></span>
                            </div>
                            <input
                                type="submit"
                                disabled={!validFname || !validLname || !validEmail || !validPwd || !validMatch || !check}
                                value="Sign Up"
                            />
                        </form>
                        <div className="signup_footer">Have an account? <Link href='/signin'>Log in Now</Link></div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Signup