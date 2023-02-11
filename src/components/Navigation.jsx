import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../contexts/LoggedIn";
const defaultUser = require('../assets/blank-profile-picture.png')

function Navigation() {
    const {loggedInUser, isLoggedIn, setIsLoggedIn, setLoggedInUser} = useContext(LoggedInContext);
    return (
        <nav className="user-navigation">
            <h1 className="app-title"><Link className="app-title_link" to="/">Table Top</Link></h1>
            {isLoggedIn && <div className="user-information">
                <p onClick={() => {
                    setIsLoggedIn(false)
                    setLoggedInUser({})
                }}>log out</p>
                <p>|</p>
                <p className="user-information_username">{loggedInUser.username}</p>
                <img className="user-information_avatar" src={loggedInUser.avatar_url} alt={`${loggedInUser} avatar`}></img>
            </div>}
            {!isLoggedIn && <div className="user-information">
                <p className="user-information_username"><Link to="/login" className="user_login-link">Log In</Link></p>
                <img className="user-information_avatar" src={defaultUser} alt="default blank avatar"></img>
            </div> }
        </nav>
    );
}

export default Navigation;