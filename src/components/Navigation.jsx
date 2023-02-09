import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../contexts/LoggedIn";

function Navigation() {
    const {loggedInUser} = useContext(LoggedInContext);
    return (
        <nav className="user-navigation">
            <h1 className="app-title"><Link className="app-title_link" to="/">Table Top</Link></h1>
            <div className="user-information">
                <img className="user-information_avatar" src={loggedInUser.avatar_url} alt={`${loggedInUser} avatar`}></img>
                <p className="user-information_username">{loggedInUser.username}</p>
            </div>
        </nav>
    );
}

export default Navigation;