import { createContext, useState } from "react";

export const ErrorContext = createContext()

export const ErrorProvider = ({children}) => {
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false)

    return (
        <ErrorContext.Provider value={{error, setError, showModal, setShowModal}}>
            {children}
        </ErrorContext.Provider>
    )
}