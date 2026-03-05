import { ReduxProvider } from "@/components/ReduxProvider"
import PersistLogin from "@/components/PersistLogin"
import ToastHandler from "@/components/Toast"
import WindowHelper from "@/components/WindowHelper"
import "@/styles/styles.css"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html>
            <head>
                <title>G-five Technology Pvt. Ltd.</title>
            </head>
            <body>
                <ReduxProvider>
                    <WindowHelper>
                        <PersistLogin>
                            <ToastHandler />
                            {children}
                        </PersistLogin>
                    </WindowHelper>
                </ReduxProvider>
            </body>
        </html>
    )
}

export default Layout