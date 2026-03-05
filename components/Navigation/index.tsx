'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useShoppingCart } from '@/hooks/useShoppingCart'
import { useSearch } from '@/hooks/useSearch'
import { useAuth } from '@/hooks/useAuth'
import { API_URL } from '@/utilities/constants'
import { useWindow } from '@/hooks/useWindow'

const Search = () => {
    const { values, setValues, setTopSearch } = useSearch()
    const router = useRouter()

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ keyword: e.target.value })
    }

    const handleSubmit = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setTopSearch(true)
            router.push(`/products`)
        }
    }

    return (
        <div className='search_container'>
            <div className='search'>
                <div className='search_ico'>
                    <svg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 96 960 960' width='24'><path d='M762.692 895.076 524.461 656.845q-30 22.769-65.792 35.269t-73.865 12.5q-93.585 0-159.117-65.514t-65.532-159.037q0-93.524 65.514-159.101 65.514-65.576 159.038-65.576 93.523 0 159.1 65.532t65.577 159.117q0 39.227-12.885 75.019-12.885 35.792-34.885 64.638l238.231 238.231-37.153 37.153Zm-377.923-242.46q72.308 0 122.462-50.154Q557.385 552.308 557.385 480q0-72.308-50.154-122.462-50.154-50.154-122.462-50.154-72.308 0-122.462 50.154Q212.154 407.692 212.154 480q0 72.308 50.153 122.462 50.154 50.154 122.462 50.154Z' /></svg>
                </div>
                <input type='text' name='home_search' className='search_box' placeholder='Search for products' onChange={handleInput} value={values?.keyword} autoComplete='off' onKeyDown={handleSubmit} />
                {values?.keyword ? (
                    <button className='clear' onClick={() => setValues({ keyword: '' })}>
                        <svg xmlns='http://www.w3.org/2000/svg' height='20' viewBox='0 96 960 960' width='20'><path d='m339 754.153 141-141 141 141L658.153 717l-141-141 141-141L621 397.847l-141 141-141-141L301.847 435l141 141-141 141L339 754.153Zm141.067 185.846q-74.836 0-141.204-28.42-66.369-28.42-116.182-78.21-49.814-49.791-78.247-116.129-28.433-66.337-28.433-141.173 0-75.836 28.42-141.704 28.42-65.869 78.21-115.682 49.791-49.814 116.129-78.247 66.337-28.433 141.173-28.433 75.836 0 141.704 28.42 65.869 28.42 115.682 78.21 49.814 49.791 78.247 115.629 28.433 65.837 28.433 141.673 0 74.836-28.42 141.204-28.42 66.369-78.21 116.182-49.791 49.814-115.629 78.247-65.837 28.433-141.673 28.433ZM480 888q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z' /></svg>
                    </button>
                ) : null}
            </div>
        </div>
    )
}

const Nav = ({ state, visible }: { state: string, visible: boolean }) => {
    const { openCart, cartQuantity } = useShoppingCart()
    const { auth } = useAuth()
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    return (
        <nav className='nav_bar' style={{
            // position: 'fixed',
            // width: '100%',
            top: visible ? '0' : '-20%',
            transition: visible ? 'top .3s ease' : 'top .4s ease',
            // zIndex: 2,
        }}>
            <div className='nav_container'>
                <Search />
                <div className='nav_cont'>
                    <Link href='/contact' className='cont cont_1'>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M480 983.69v-59.999h267.691q5.385 0 8.847-3.461 3.462-3.462 3.462-8.847v-35.384H618.463V592.924H760V536q0-116-82-198t-198-82q-116 0-198 82t-82 198v56.924h141.537v283.075H212.309q-30.308 0-51.308-21t-21-51.308V536q0-70.154 26.77-131.999 26.769-61.846 73.076-108.154 46.308-46.307 108.154-73.076 61.845-26.77 131.999-26.77t131.999 26.77q61.846 26.769 108.154 73.076 46.307 46.308 73.076 108.154 26.77 61.845 26.77 131.999v375.383q0 30.307-21 51.307-21 21-51.308 21H480ZM212.309 816h69.23V652.923H200v150.768q0 5.385 3.462 8.847 3.462 3.462 8.847 3.462Zm466.152 0H760V652.923h-81.539V816ZM760 816h-81.539H760Zm-478.461 0H200h81.539Z" /></svg>
                    </Link>
                    <button className='cont cont_2 cart_btn' onClick={openCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24"><path d="M286.154 958.306q-29.153 0-49.576-20.422-20.423-20.423-20.423-49.577 0-29.153 20.423-49.576 20.423-20.423 49.576-20.423 29.154 0 49.577 20.423t20.423 49.576q0 29.154-20.423 49.577-20.423 20.422-49.577 20.422Zm387.692 0q-29.154 0-49.577-20.422-20.423-20.423-20.423-49.577 0-29.153 20.423-49.576 20.423-20.423 49.577-20.423 29.153 0 49.576 20.423 20.423 20.423 20.423 49.576 0 29.154-20.423 49.577-20.423 20.422-49.576 20.422ZM240.615 325.999 342 538.308h272.692q3.462 0 6.154-1.731 2.693-1.731 4.616-4.808l107.307-195q2.308-4.231.385-7.5-1.923-3.27-6.539-3.27h-486Zm-28.769-59.998h555.383q24.538 0 37.115 20.884 12.577 20.885 1.192 42.654L677.384 561.691q-9.847 17.308-26.039 26.962-16.192 9.653-35.499 9.653H324l-46.308 84.616q-3.077 4.616-.192 10.001t8.654 5.385h457.691v59.998H286.154q-39.999 0-60.115-34.499-20.115-34.5-1.423-68.884l57.078-102.616-145.539-306.308H60.001v-59.998h113.845l38 80ZM342 538.308h280-280Z" /></svg>
                        {mounted && cartQuantity > 0 && <div>{cartQuantity}</div>}
                    </button>
                    {auth?.username ? (
                        <Link href='/account' className='cont cont_3'>
                            {auth?.profileImage ? (
                                <img src={`${API_URL}${auth?.profileImage}`} alt='user_profile' />
                            ) : (
                                <img src="images/user.svg" alt='user_profile' style={{ padding: ".7rem" }} />
                            )}
                        </Link>
                    ) : (
                        <Link href='/signin' className='cont cont_2'>
                            <svg xmlns="http://www.w3.org/2000/svg" id="Outline" height="24" viewBox="0 96 960 960" width="24"><path d="M489 936v-60h291V276H489v-60h291q24 0 42 18t18 42v600q0 24-18 42t-42 18H489Zm-78-185-43-43 102-102H120v-60h348L366 444l43-43 176 176-174 174Z" /></svg>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

const MobileNav = () => {
    const { openCart } = useShoppingCart()
    const { cartQuantity } = useShoppingCart()
    const [Input, setInput] = useState('')
    const [search, setSearch] = useState(false)
    const [mounted, setMounted] = useState(false)

    const router = useRouter()

    useEffect(() => { setMounted(true) }, [])

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
    }

    return (
        <Fragment>
            <div className="bottom_container">
                <div className="bottom_nav">
                    <button className="links" onClick={() => router.push('/')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 96 960 960" width="22"><path d="M264 840h96V600h240v240h96V492L480 330 264 492v348Zm-72 72V456l288-216 288 216v456H528V672h-96v240H192Zm288-327Z" /></svg>
                    </button>
                    <button className="links" onClick={() => router.push('/contact')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 96 960 960" width="22"><path d="M480 984v-72h264v-48H576V576h168v-48q0-112-77.237-188-77.238-76-186.5-76Q371 264 293.5 340T216 528v48h168v288H216q-29-2-50.5-22T144 792V528.165q0-69.728 26.5-131.446Q197 335 243 289.5 289 244 350.039 218q61.04-26 130-26Q549 192 610.5 218q61.5 26 107 71.5t72 107.166Q816 458.332 816 528v384q0 29-21.15 50.5T744 984H480ZM216 792h96V648h-96v144Zm432 0h96V648h-96v144Zm96 0h-96 96Zm-432 0h-96 96Z" /></svg>
                    </button>
                    <button className="links" onClick={openCart}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 96 960 960" width="22"><path d="M263.788 960Q234 960 213 938.788q-21-21.213-21-51Q192 858 213.212 837q21.213-21 51-21Q294 816 315 837.212q21 21.213 21 51Q336 918 314.788 939q-21.213 21-51 21Zm432 0Q666 960 645 938.788q-21-21.213-21-51Q624 858 645.212 837q21.213-21 51-21Q726 816 747 837.212q21 21.213 21 51Q768 918 746.788 939q-21.213 21-51 21ZM253 360l83 192h301l82-192H253Zm-31-72h570q14 0 20.5 11t1.5 23L702.627 579.855Q694 600 676.5 612 659 624 637 624H317l-42 72h493v72H276q-43 0-63.5-36.153Q192 695.695 213 660l52-90-131-306H48v-72h133l41 96Zm114 264h301-301Z" /></svg>
                        {mounted && cartQuantity > 0 && <div className='quant'>{cartQuantity}</div>}
                    </button>
                    <button className="links" onClick={() => setSearch(!search)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 96 960 960" width="22"><path d="M765 912 526 673q-30 22-65.792 34.5T384.035 720Q284 720 214 650t-70-170q0-100 70-170t170-70q100 0 170 70t70 170.035q0 40.381-12.5 76.173T577 622l239 239-51 51ZM384 648q70 0 119-49t49-119q0-70-49-119t-119-49q-70 0-119 49t-49 119q0 70 49 119t119 49Z" /></svg>
                    </button>
                    <button className="links" onClick={() => router.push('/account')}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="22" viewBox="0 96 960 960" width="22"><path d="M480 576q-60 0-102-42t-42-102q0-60 42-102t102-42q60 0 102 42t42 102q0 60-42 102t-102 42ZM192 864v-96q0-23 12.5-43.5T239 690q55-32 116.292-49 61.293-17 124.5-17Q543 624 604.5 641T721 690q22 13 34.5 34t12.5 44v96H192Zm72-72h432v-24q0-5.177-3.025-9.412Q689.95 754.353 685 752q-46-28-98-42t-107-14q-55 0-107 14t-98 42q-5 4-8 7.724T264 768v24Zm216.212-288Q510 504 531 482.788q21-21.213 21-51Q552 402 530.788 381q-21.213-21-51-21Q450 360 429 381.212q-21 21.213-21 51Q408 462 429.212 483q21.213 21 51 21ZM480 432Zm0 360Z" /></svg>
                    </button>
                </div>
            </div>
            {search && (
                <div className="mobile_search">
                    <div className='search'>
                        <div className='search_ico'>
                            <svg xmlns='http://www.w3.org/2000/svg' height='18' viewBox='0 96 960 960' width='18'><path d='M762.692 895.076 524.461 656.845q-30 22.769-65.792 35.269t-73.865 12.5q-93.585 0-159.117-65.514t-65.532-159.037q0-93.524 65.514-159.101 65.514-65.576 159.038-65.576 93.523 0 159.1 65.532t65.577 159.117q0 39.227-12.885 75.019-12.885 35.792-34.885 64.638l238.231 238.231-37.153 37.153Zm-377.923-242.46q72.308 0 122.462-50.154Q557.385 552.308 557.385 480q0-72.308-50.154-122.462-50.154-50.154-122.462-50.154-72.308 0-122.462 50.154Q212.154 407.692 212.154 480q0 72.308 50.153 122.462 50.154 50.154 122.462 50.154Z' /></svg>
                        </div>
                        <input type='text' name='home_search' className='search_box' placeholder='Search for products' onChange={handleInput} value={Input} autoComplete='off' />
                        {Input && (
                            <button className='clear' onClick={() => setInput('')}>
                                <svg xmlns='http://www.w3.org/2000/svg' height='18' viewBox='0 96 960 960' width='18'><path d='m339 754.153 141-141 141 141L658.153 717l-141-141 141-141L621 397.847l-141 141-141-141L301.847 435l141 141-141 141L339 754.153Zm141.067 185.846q-74.836 0-141.204-28.42-66.369-28.42-116.182-78.21-49.814-49.791-78.247-116.129-28.433-66.337-28.433-141.173 0-75.836 28.42-141.704 28.42-65.869 78.21-115.682 49.791-49.814 116.129-78.247 66.337-28.433 141.173-28.433 75.836 0 141.704 28.42 65.869 28.42 115.682 78.21 49.814 49.791 78.247 115.629 28.433 65.837 28.433 141.673 0 74.836-28.42 141.204-28.42 66.369-78.21 116.182-49.791 49.814-115.629 78.247-65.837 28.433-141.673 28.433ZM480 888q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z' /></svg>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    )
}

const TopSearch = () => {
    const { setTopSearch } = useSearch()

    return (
        <Fragment>
            <div className="nav_search">
                <Search />
                <div className="nav_overlay" onClick={() => setTopSearch(false)} />
            </div>
        </Fragment>
    )
}

const Navigation = () => {
    const [showNav, setShowNav] = useState(false)
    const [links, setLinks] = useState(false)
    const { isWide } = useWindow()

    const { openCart, cartQuantity } = useShoppingCart()
    const { topSearch, setTopSearch } = useSearch()
    const { auth } = useAuth()
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => { setMounted(true) }, [])

    useEffect(() => {
        const handleScroll = () => {
            if (isWide) {
                setShowNav(window.scrollY > 250)
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const showlinks = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.add('active')
        setLinks(true)
        document.body.style.overflow = 'hidden'
    }

    const hidelinks = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.classList.remove('active')
        setLinks(false)
        document.body.style.overflow = 'scroll'
    }

    const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        links ? hidelinks(e) : showlinks(e)
    }

    return (
        <Fragment>
            <nav className='home_nav'>
                <div className='home_logo_container'>
                    <Link href='/'>
                        <img src='/images/logo_text.png' alt='LOGO' />
                    </Link>
                </div>

                {!isWide ? (
                    links ? (
                        <div className='nav_links'>
                            <div className='link'><Link href='/products'>Products</Link></div>
                            <div className='link'><Link href='/about'>About</Link></div>
                            <div className='link'><Link href='/services'>Services</Link></div>
                            <div className='link'><Link href='/contact'>Contact</Link></div>
                            {auth ? (
                                <div className='link'><Link href='account'>Account</Link></div>
                            ) : (
                                <div className='link'><Link href='signin'>Login/Signup</Link></div>
                            )}
                        </div>
                    ) : null
                ) : (
                    <Fragment>
                        <div className='nav_links'>
                            <div className='link'><Link href='/products'>Products</Link></div>
                            <div className='link'><Link href='/about'>About</Link></div>
                            <div className='link'><Link href='/services'>Services</Link></div>
                            <div className='link'><Link href='/contact'>Contact</Link></div>
                        </div>

                        <div className="nav_func">
                            <button className='func search' onClick={() => setTopSearch(true)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M14 14L10 10" stroke="#21313C" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6Z" stroke="#21313C" strokeWidth="2" />
                                </svg>
                            </button>

                            <button className='func cart' onClick={openCart}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="21" viewBox="0 96 960 960" width="21">
                                    <path d="M286.154 958.306q-29.153 0-49.576-20.422-20.423-20.423-20.423-49.577 0-29.153 20.423-49.576 20.423-20.423 49.576-20.423 29.154 0 49.577 20.423t20.423 49.576q0 29.154-20.423 49.577-20.423 20.422-49.577 20.422Zm387.692 0q-29.154 0-49.577-20.422-20.423-20.423-20.423-49.577 0-29.153 20.423-49.576 20.423-20.423 49.577-20.423 29.153 0 49.576 20.423 20.423 20.423 20.423 49.576 0 29.154-20.423 49.577-20.423 20.422-49.576 20.422ZM240.615 325.999 342 538.308h272.692q3.462 0 6.154-1.731 2.693-1.731 4.616-4.808l107.307-195q2.308-4.231.385-7.5-1.923-3.27-6.539-3.27h-486Zm-28.769-59.998h555.383q24.538 0 37.115 20.884 12.577 20.885 1.192 42.654L677.384 561.691q-9.847 17.308-26.039 26.962-16.192 9.653-35.499 9.653H324l-46.308 84.616q-3.077 4.616-.192 10.001t8.654 5.385h457.691v59.998H286.154q-39.999 0-60.115-34.499-20.115-34.5-1.423-68.884l57.078-102.616-145.539-306.308H60.001v-59.998h113.845l38 80ZM342 538.308h280-280Z" />
                                </svg>
                                {mounted && cartQuantity > 0 && <div className="quant">{cartQuantity}</div>}
                            </button>

                            {auth?.username ? (
                                <Fragment>
                                    <Link href='/account' className='cont cont_3'>
                                        {auth?.profileImage ? (
                                            <img src={`${API_URL}${auth?.profileImage}`} alt='user_profile' />
                                        ) : (
                                            <img src="images/user.svg" alt='user_profile' style={{ padding: ".5rem" }} />
                                        )}
                                    </Link>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div className='link'>
                                        <Link href={'/signin'}>Sign In</Link>
                                    </div>
                                    <button className='btn primary' onClick={() => router.push('/signup')}>Sign Up</button>
                                </Fragment>
                            )}
                        </div>

                        {topSearch && <TopSearch />}
                    </Fragment>
                )}

                {!isWide && (
                    <svg className="ham hamRotate" viewBox="0 0 100 100" width="35" onClick={(e) => handleClick(e as any)}>
                        <path className="line top" d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20" />
                        <path className="line middle" d="m 70,50 h -40" />
                        <path className="line bottom" d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20" />
                    </svg>
                )}
            </nav>

            {isWide ? <Nav state={auth?.username} visible={showNav} /> : <MobileNav />}
        </Fragment>
    )
}

export default Navigation