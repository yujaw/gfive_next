'use client'
import { Fragment } from 'react'
import { useRouter } from 'next/navigation';

const Error = () => {
    const router = useRouter()

    return (
        <Fragment>
            <div className="error">
                <img src='/images/404.gif' alt="404" />
                <span className="title">Looks like you're lost</span>
                <span className="desc">Oops, the file you requested may have been moved, edited, or deleted</span>
                <button className="home_btn" onClick={() => router.push('/')}>Back Home</button>
            </div>
        </Fragment >
    )
}

export default Error