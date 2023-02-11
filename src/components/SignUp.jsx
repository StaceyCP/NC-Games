import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { postUser } from "../api";
import { ErrorContext } from "../contexts/Error";
import { LoggedInContext } from "../contexts/LoggedIn";
import Modal from "./Modal";

function SignUp() {
    const [newUsername, setNewUsername] = useState("");
    const [usersName, setUsersName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newAvatar_url, setNewAvatar_url] = useState("");
    const [isSignedUp, setIsSignedUp] = useState(false)
    const {loggedInUser, setLoggedInUser, setIsLoggedIn} = useContext(LoggedInContext);
    const {error, setError, showModal, setShowModal} = useContext(ErrorContext);
    const newUser = {
        username: newUsername,
        name: usersName,
        avatar_url: newAvatar_url
    }

    const handleSignUp = (e) => {
        e.preventDefault()
        postUser(newUser).then((userFromAPI) => {
            setIsSignedUp(true)
            setIsLoggedIn(true)
            setLoggedInUser(userFromAPI)
        }).catch(err => {
            setError(err.response.data)
            setShowModal(true)
        })
    }
    
    return (
        <article className="signup-page">
            {!isSignedUp && <form className="signup-form" onSubmit={handleSignUp}>
                {error !== '' && showModal && <Modal setShowModal={setShowModal}/>}
                <h2>Sign Up</h2>
                <label htmlFor="username">Username</label>
                <input id="username" className="signup-input" type="text" value={newUsername} onChange={(e) => {
                    setNewUsername(e.target.value)
                }}></input>
                <label htmlFor="name">Name</label>
                <input id="name" className="signup-input" type="text" value={usersName} onChange={(e) => {
                    setUsersName(e.target.value)
                }}></input>
                <label htmlFor="password">Password</label>
                <input id="password" className="signup-input" type="password" value={newPassword} onChange={(e) => {
                    setNewPassword(e.target.value)
                }}></input>
                <p>Choose your avatar</p>
                <div>
                    <img className="avatar-selection" src="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--little-miss-sunshine.svg?v=174862859148275311501659605004" alt="little miss sunshine avatar" onClick={() => {
                        setNewAvatar_url("https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--little-miss-sunshine.svg?v=174862859148275311501659605004")
                    }}></img>
                    <img className="avatar-selection" src="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--mr-sneeze.svg?v=9954179417480753611659605028" alt="mr small avatar" onClick={() => {
                        setNewAvatar_url("https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--mr-sneeze.svg?v=9954179417480753611659605028")
                    }}></img>
                    <img className="avatar-selection" src="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--little-miss-sparkle.svg?v=151946554679424235311659605001" alt="little miss sparkle avatar" onClick={() => {
                        setNewAvatar_url("https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--little-miss-sparkle.svg?v=151946554679424235311659605001")
                    }}></img>
                    <img className="avatar-selection" src="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--mr-messy.svg?v=161336296327173425491659605021" alt="mr messy avatar" onClick={() => {
                        setNewAvatar_url("https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--mr-messy.svg?v=161336296327173425491659605021")
                    }}></img>
                </div>
                <button className="signup-btn">Sign Up</button>
                </form>}
            {isSignedUp && <article className="loggedin-confirm">
                    <h2>Nice to see you {loggedInUser.username}</h2>
                    <p>You've successfully signed up to Table Top</p>
                    <img className="user-avatar" src={loggedInUser.avatar_url} alt={loggedInUser.username}></img>
                    <button><Link className="loggedin-confirm_link" to="/">Reviews</Link></button>
                </article>}
        </article>
    );
}

export default SignUp;