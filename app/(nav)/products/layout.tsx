import { Fragment } from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    )
}

export default Layout
