import { useContext, useState } from "react";
import { postUser } from "../api";
import { LoggedInContext } from "../contexts/LoggedIn";

function SignUp() {
    const [newUsername, setNewUsername] = useState("");
    const [usersName, setUsersName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newAvatar_url, setNewAvatar_url] = useState("");
    const [isUnique, setIsUnique] = useState(false);
    const {setLoggedInUser, usersList} = useContext(LoggedInContext);
    const newUser = {
        username: newUsername,
        name: usersName,
        avatar_url: newAvatar_url
    }

    const checkUsername = (usernameToCheck) => {
        const filteredUsernames = usersList.filter((user) => user.username === usernameToCheck)
        if (filteredUsernames.length === 0) {
            setIsUnique(true);
        }
    }

    const handleSignUp = (e) => {
        e.preventDefault()
    }

    return (
        <article className="signup-page">
            <form className="signup-form">
                <h2>Sign Up</h2>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" value={newUsername} onChange={(e) => {
                    setNewUsername(e.target.value)
                }}></input>
                <label htmlFor="name">Name</label>
                <input id="name" type="text" value={usersName} onChange={(e) => {
                    setUsersName(e.target.value)
                }}></input>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" value={newPassword} onChange={(e) => {
                    setNewPassword(e.target.value)
                }}></input>
                <label htmlFor="avatar-select">Choose your avatar</label>
                <select id="avatar-select">
                    <option value="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--little-miss-sunshine.svg?v=174862859148275311501659605004"></option>
                    <option value="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--little-miss-sparkle.svg?v=151946554679424235311659605001"></option>
                    <option value="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--mr-small.svg?v=25849821238677734511659605028"></option>
                    <option value="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--mr-messy.svg?v=161336296327173425491659605021"></option>
                </select>
            </form>
        </article>
    );
}

export default SignUp;