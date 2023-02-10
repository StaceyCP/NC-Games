import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoggedInContext } from "../contexts/LoggedIn";

function LogIn() {
    const {isLoggedIn, setIsLoggedIn, loggedInUser, setLoggedInUser, usersList} = useContext(LoggedInContext);
    const [isVerified, setIsVerified] = useState(false)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const verifyUser = (userToVerify) => {
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
            <article>
                <form onSubmit={handleLogIn}>
                    <label>Username</label>
                    <input type="text" value={username} onChange={(e) => {
                        setUsername(e.target.value)
                    }}></input>
                    <label>Password</label>
                    <input type="password" value={password} onChange={(e) => {
                        setPassword(e.target.value)
                    }}></input>
                    <button>Log in</button>
                </form>
            </article>
        );
    } else {
        return (
            <article>
                <h2>Success!</h2>
                <img src={loggedInUser.avatar_url} alt={loggedInUser.username}></img>
                <h2>Logged in as {loggedInUser.username}</h2>
                <button><Link to="/">Reviews</Link></button>
            </article>
        );
    }
}

export default LogIn;