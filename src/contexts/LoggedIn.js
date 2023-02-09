import { createContext, useEffect, useState } from "react";
import { getUsers } from "../api";

export const LoggedInContext = createContext();

export const LoggedInProvider = ({children}) => {
    const [usersList, setUsersList] = useState([])
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [loggedInUser, setLoggedInUser] = useState({
        "username": "tickle122",
        "name": "Tom Tickle",
        "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
        })
    
    useEffect(() => {
        getUsers().then(users => setUsersList(users))
    }, [])

    return (
        <LoggedInContext.Provider value={{usersList, setUsersList, isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser}}>
            {children}
        </LoggedInContext.Provider>
    )
}