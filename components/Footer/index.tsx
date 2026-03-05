'use client'

import { Fragment } from 'react'
import Link from 'next/link'

const Footer = () => {
    var date = new Date().getFullYear()

    return (
        <Fragment>
            <div className="footer">
                <div className="footer_cont">
                    <div className="footer_nav">
                        <div className="footer_items">
                            <div className="footer_logo">
                                <img src="/images/logo_text_white.png" alt="logo" />
                            </div>
                        </div>
                        <div className="footer_items">
                            <div className="title">
                                About
                            </div>
                            <div className="nav">
                                <Link href='about' className="links">About Us</Link>
                                <Link href='terms' className="links">Terms and Conditions</Link>
                                <Link href='warranty' className="links">Warranty</Link>
                                <Link href='privacy' className="links">Privacy Policy</Link>
                                <Link href='contact' className="links">Contact Us</Link>
                            </div>
                        </div>
                        <div className="footer_items">
                            <div className="title">
                                Services
                            </div>
                            <div className="nav">
                                <Link href='products' className="links">Desktop</Link>
                                <Link href='products' className="links">Laptop</Link>
                                <Link href='products' className="links">Printers</Link>
                                <Link href='products' className="links">Accessories</Link>
                            </div>
                        </div>
                        <div className="footer_items">
                            <div className="title">
                                Social
                            </div>
                            <div className="nav">
                                <Link href='' target='_blank' className="links">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.1rem" viewBox="0 0 512 512">
                                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" />
                                    </svg>
                                    Facebook
                                </Link>
                                <Link href='' className="links">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.1rem" viewBox="0 0 448 512">
                                        <path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z" />
                                    </svg>
                                    Instagram
                                </Link>
                                <Link href='' className="links">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.1rem" viewBox="0 0 576 512">
                                        <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                                    </svg>
                                    Youtube
                                </Link>
                                <Link href='' className="links">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.1rem" viewBox="0 0 512 512">
                                        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                                    </svg>
                                    X
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="footer_bottom">
                        <div className="text">
                            &copy; {date} GFive Pvt. Ltd.
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer