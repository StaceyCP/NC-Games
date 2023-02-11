import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../contexts/LoggedIn";
const defaultUser = require('../assets/blank-profile-picture.png')

function LogIn() {
    const {isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser, usersList} = useContext(LoggedInContext);
    const [isVerified, setIsVerified] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [attemptedLogin, setAttemptedLogin] = useState(false);

    const verifyUser = (userToVerify) => {
        setAttemptedLogin(true)
        if (username === userToVerify.username) {
            setIsVerified(true)
        }
    }

    const handleLogIn = (e) => {
        e.preventDefault()
        const userToLogin = usersList.filter((user) => username === user.username)
        verifyUser(userToLogin[0])
        if (isVerified) {
            setLoggedInUser(userToLogin[0])
            setIsLoggedIn(true)
        }
    }
    if (!isLoggedIn) {
        return (
            <article className="login-page">
                <form onSubmit={handleLogIn} className="login-form">
                    <h2 className="login-title">Log In</h2>
                    <img className="user-information_avatar" src={defaultUser} alt="default blank avatar"></img>
                    <label htmlFor="username">Username</label>
                    <input id="username" required className="login-input" type="text" value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }}></input>
                    <label htmlFor="password">Password</label>
                    <input id="password" required className="login-input" type="password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}></input>
                    {!isVerified && attemptedLogin && <p>Oh no! Your password or your username don't match our records please try again</p>}
                    <button className="login-btn">Log in</button>
                    <p>Not got an account? <Link to="/signup">Sign Up</Link></p>
                </form>
            </article>
        );
    } else {
        return (
            <article className="loggedin-confirm">
                <h2>Success!</h2>
                <img className="user-avatar" src={loggedInUser.avatar_url} alt={loggedInUser.username}></img>
                <h2>Logged in as {loggedInUser.username}</h2>
                <button><Link className="loggedin-confirm_link" to="/">Reviews</Link></button>
            </article>
        );
    }
}

export default LogIn;