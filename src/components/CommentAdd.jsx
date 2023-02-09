import { useContext, useEffect, useState } from "react";
import { postComment } from "../api";
import { LoggedInContext } from "../contexts/LoggedIn";

function CommentAdd({review_id, setError, setShowModal, setComments}) {
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
        if (isLoggedIn) {
            postComment(review_id, commentToAdd).then((newCommentFromAPI) => {
                setComments((currentComments) => [newCommentFromAPI[0], ...currentComments]);
                setCommentBody('')
            }).catch(err => {
                console.log(err);
                setError("Something went wrong please try again shortly");
                setShowModal(true);
                setIsCommentAddDisabled(false)
            })
        }
    }
    
    return (
        <form onSubmit={handleSubmit} className='add-comment-form'>
            <img className="user-image" src={loggedInUser.avatar_url} alt="Users profile"></img>
            <input className="add-comment-input" type="text-area" value={commentBody} onChange={handleChange} placeholder="Write your comment here..." required></input>
            <button className="add-comment-btn" disabled={isCommentAddDisabled}>Comment</button>
        </form>
    );
}

export default CommentAdd;