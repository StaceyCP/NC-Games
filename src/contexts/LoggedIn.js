import { createContext, useState } from "react";

export const LoggedInContext = createContext();

export const LoggedInProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [loggedInUser, setLoggedInUser] = useState({
        "username": "tickle122",
        "name": "Tom Tickle",
        "avatar_url": "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953"
        })

        return (
            <LoggedInContext.Provider value={{isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser}}>
                {children}
            </LoggedInContext.Provider>
        )
}