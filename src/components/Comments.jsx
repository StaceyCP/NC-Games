import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { deleteCommentById, getReviewComments } from "../api";
import { LoggedInContext } from '../contexts/LoggedIn';
import Loading from './Loading';

const likeIcon = require('../assets/thumbs-up.png');
function Comments({setError, setShowModal}) {
    const {review_id} = useParams();
    const {loggedInUser} = useContext(LoggedInContext);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);

    const handleDelete = (comment_id) => {
        deleteCommentById(comment_id).then(() => {
            setComments(currComments => currComments.filter((comment) => comment.comment_id !== comment_id ))
        })
        .catch(err => {
            setError("Oh no! Something went wrong, please try again in a moment")
            setShowModal(true)
        })
    }

    const configureDate = (timestamp) =>  new Date(timestamp).toDateString()
    useEffect(() => {
        getReviewComments(review_id).then(reviewComments => {
            setComments(reviewComments)
            setCommentsLoading(false)
        })
    }, [review_id])

    if (!commentsLoading) {
        return (
            <section className='comments-container'>
                <h3>Comments</h3>
                {comments.length === 0 && <p>Be the first to leave a comment</p>}
                {comments.length > 0 && comments.map(({comment_id, author, body, created_at, votes}) => {
                    return <article key={comment_id} className='comments-container_list'>
                        <div className='comment-container_item'>
                            <div className='comment-container_item-details'>
                                <h4 className='comment-container_item-author'>{author}</h4>
                                <p className='comment-container_item-timestamp'>{configureDate(created_at)}</p>
                                <p className='comment-container_item-comment'>{body}</p>
                            </div>
                            <div className='comment-container_statistics'>
                                <p>{votes}</p>
                                <img src={likeIcon} alt="Thumbs up"></img>
                            </div>
                            {loggedInUser.username === author && <button className='comment-delete' type='button' onClick={() => {
                                handleDelete(comment_id)
                                }}>Delete</button>}
                        </div>
                        <hr className='comment-divider'></hr>
                    </article>
                })}
            </section>
        );
    } else {
        return <Loading component={"Comments"}/>
    }
}

export default Comments;