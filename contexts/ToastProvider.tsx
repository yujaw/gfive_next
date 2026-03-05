import { createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/ReactToastify.min.css";
// import "react-toastify/dist/ReactToastify.css";

interface ToastContextInterface {
    successNotification: (text: String) => void,
    errorNotification: (text: String) => void
}

export const ToastContext = createContext({} as ToastContextInterface)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {

    const successNotification = (text: String) => {
        toast.success(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    const errorNotification = (text: String) => {
        toast.error(text, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <ToastContext.Provider value={{
            successNotification,
            errorNotification
        }}>
            <ToastContainer />
            {children}
        </ToastContext.Provider>
    )
}