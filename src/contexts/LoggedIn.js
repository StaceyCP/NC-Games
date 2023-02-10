import { createContext, useEffect, useState } from "react";
import { getUsers } from "../api";

export const LoggedInContext = createContext();

export const LoggedInProvider = ({children}) => {
    const [usersList, setUsersList] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loggedInUser, setLoggedInUser] = useState({})
    
    useEffect(() => {
        getUsers().then(users => setUsersList(users))
    }, [])

    return (
        <LoggedInContext.Provider value={{usersList, setUsersList, isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser}}>
            {children}
        </LoggedInContext.Provider>
    )
}