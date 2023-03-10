import { useContext, useEffect, useState } from "react";
import { postComment } from "../api";
import { LoggedInContext } from "../contexts/LoggedIn";
const defaultUser = require('../assets/blank-profile-picture.png')

function CommentAdd({review_id, setComments, commentCount, setCommentCount, setError, setShowModal}) {
    const {isLoggedIn, loggedInUser} = useContext(LoggedInContext);
    const [commentBody, setCommentBody] = useState('')
    const [isCommentAddDisabled, setIsCommentAddDisabled] = useState(true)

    useEffect(() => {
        if(commentBody.length < 1) return
        setIsCommentAddDisabled(false)
    }, [commentBody])

    let commentToAdd = {
        username: loggedInUser.username,
        body: commentBody
    }

    const handleChange = (e) => {
        setCommentBody(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsCommentAddDisabled(true)
        if (isLoggedIn){
            postComment(review_id, commentToAdd).then((newCommentFromAPI) => {
                setComments((currentComments) => [newCommentFromAPI[0], ...currentComments]);
                setCommentBody('')
                setCommentCount(commentCount + 1)
            }).catch(err => {
                setError("Something went wrong please try again shortly");
                setShowModal(true);
                setIsCommentAddDisabled(false)
            })
        } else {
            setError("Whoops you need to be logged in to post a comment");
            setShowModal(true);
            setIsCommentAddDisabled(false)
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className='add-comment-form'>
            {!isLoggedIn && <img className="user-image" src={defaultUser} alt="Users profile"></img>}
            {isLoggedIn && <img className="user-image" src={loggedInUser.avatar_url} alt="Users profile"></img>}
            <textarea className="add-comment-input" value={commentBody} onChange={handleChange} placeholder="Write your comment here..." rows="1"></textarea>
            <button className="add-comment-btn" disabled={isCommentAddDisabled}>Comment</button>
        </form>
    );
}

export default CommentAdd;