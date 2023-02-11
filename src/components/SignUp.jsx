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
    const [isUsernameValid, setIsUsernameValid] = useState("");
    const [isNameValid, setIsNameValid] = useState("")
    const [isPasswordValid, setIsPasswordValid] = useState("");
    const {loggedInUser, setLoggedInUser, setIsLoggedIn} = useContext(LoggedInContext);
    const {error, setError, showModal, setShowModal} = useContext(ErrorContext);

    const avatar1 = document.querySelector(".avatar-1");
    const avatar2 = document.querySelector(".avatar-2");
    const avatar3 = document.querySelector(".avatar-3");
    const avatar4 = document.querySelector(".avatar-4");

    const newUser = {
        username: newUsername,
        name: usersName,
        avatar_url: newAvatar_url
    }

    const handleSignUp = (e) => {
        if (isUsernameValid !== "" && isNameValid !== "" && isPasswordValid !== "") {
            e.preventDefault()
        } else {
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
    }

    const usernameRegex = /^[a-z0-9_-]{3,16}$/gi
    const nameRegex = /^[a-z-]{1,16}$/gi
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/gm

    function nameValidation(e) {
        const name = document.getElementById("name");
        const nameValue = e.target.value;
        const isValid = nameRegex.test(nameValue);
        if (isValid) {
        setIsNameValid("")
        name.classList.add("valid");
        name.classList.remove("invalid");
        } else {
        setIsNameValid("Please enter a valid name")
        name.classList.add("invalid");
        name.classList.remove("valid");
        }
      }

    function usernameValidation(e) {
        const username = document.getElementById("username");
        const usernameValue = e.target.value;
        const isValid = usernameRegex.test(usernameValue);
        if (isValid) {
        setIsUsernameValid("")
        username.classList.add("valid");
        username.classList.remove("invalid");
        } else {
        setIsUsernameValid("Username should be at least 3 characters and contain only letters and numbers")
        username.classList.add("invalid");
        username.classList.remove("valid");
        }
      }
      
      function passwordValidation(e) {
        const password = document.getElementById("password")
        const passwordText = e.target.value;
        const isValid = passwordRegex.test(passwordText);
        if (isValid) {
          setIsPasswordValid("")
          password.classList.add("valid");
          password.classList.remove("invalid");

        } else {
          setIsPasswordValid("Your password should be at least 6 characters and contain a combination of numbers, letters as well as at least 1 uppercase letter")
          password.classList.add("invalid");
          password.classList.remove("valid");
        }
      }
    
    return (
        <article className="signup-page">
            {!isSignedUp && <form className="signup-form" onSubmit={handleSignUp}>
                {error !== '' && showModal && <Modal setShowModal={setShowModal}/>}
                <h2>Sign Up</h2>
                <label htmlFor="username">Username</label>
                <input id="username" className="signup-input" required type="text" value={newUsername} onChange={(e) => {
                    usernameValidation(e)
                    setNewUsername(e.target.value)
                }}></input>
                {isUsernameValid !== "" && <p className="username-invalid">{isUsernameValid}</p>}
                <label htmlFor="name">Name</label>
                <input id="name" className="signup-input" required type="text" value={usersName} onChange={(e) => {
                    nameValidation(e)
                    setUsersName(e.target.value)
                }}></input>
                {isNameValid !== "" && <p className="name-invalid">{isNameValid}</p>}
                <label htmlFor="password">Password</label>
                <input id="password" className="signup-input" required type="password" value={newPassword} onChange={(e) => {
                    passwordValidation(e)
                    setNewPassword(e.target.value)
                }}></input>
                {isPasswordValid !== "" && <p className="password-invalid">{isPasswordValid}</p>}
                <p>Choose your avatar (optional)</p>
                <div>
                    <img className="avatar-selection avatar-1" src="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--little-miss-sunshine.svg?v=174862859148275311501659605004" alt="little miss sunshine avatar" onClick={() => {
                        setNewAvatar_url("https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--little-miss-sunshine.svg?v=174862859148275311501659605004")
                        avatar1.classList.add("chosen-avatar")
                        avatar2.classList.remove("chosen-avatar")
                        avatar3.classList.remove("chosen-avatar")
                        avatar4.classList.remove("chosen-avatar")
                    }}></img>
                    <img className="avatar-selection avatar-2" src="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--mr-sneeze.svg?v=9954179417480753611659605028" alt="mr small avatar" onClick={() => {
                        setNewAvatar_url("https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--mr-sneeze.svg?v=9954179417480753611659605028")
                        avatar2.classList.add("chosen-avatar")
                        avatar1.classList.remove("chosen-avatar")
                        avatar3.classList.remove("chosen-avatar")
                        avatar4.classList.remove("chosen-avatar")
                    }}></img>
                    <img className="avatar-selection avatar-3" src="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--little-miss-sparkle.svg?v=151946554679424235311659605001" alt="little miss sparkle avatar" onClick={() => {
                        setNewAvatar_url("https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--little-miss-sparkle.svg?v=151946554679424235311659605001")
                        avatar3.classList.add("chosen-avatar")
                        avatar2.classList.remove("chosen-avatar")
                        avatar1.classList.remove("chosen-avatar")
                        avatar4.classList.remove("chosen-avatar")
                    }}></img>
                    <img className="avatar-selection avatar-4" src="https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--mr-messy.svg?v=161336296327173425491659605021" alt="mr messy avatar" onClick={() => {
                        setNewAvatar_url("https://cdn.shopify.com/s/files/1/0194/0815/8819/t/26/assets/svg--character--mr-messy.svg?v=161336296327173425491659605021")
                        avatar4.classList.add("chosen-avatar")
                        avatar2.classList.remove("chosen-avatar")
                        avatar3.classList.remove("chosen-avatar")
                        avatar1.classList.remove("chosen-avatar")
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