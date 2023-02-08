import { useState } from "react";
import { postComment } from "../api";

function CommentAdd({review_id}) {
    const [commentBody, setCommentBody] = useState('')
    const handleChange = (e) => {
        setCommentBody(e.target.value)
    }
    let commentToAdd = {
        username: "bainesface",
        body: commentBody
        }
    return (
        <form>
            <img className="user-image" alt="Users profile image"></img>
            <input className="add-comment-input" type="text" value={commentBody} onChange={handleChange}></input>
            <button className="add-comment-btn">Comment</button>
        </form>
    );
}

export default CommentAdd;