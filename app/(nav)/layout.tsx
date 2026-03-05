import "@/styles/styles.css"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import Cart from "@/components/Cart"
import { Fragment } from "react"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Fragment>
            <Navigation />
            <Cart />
            {children}
            <Footer />
        </Fragment>
    )
}

export default Layout
