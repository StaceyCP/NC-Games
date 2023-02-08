import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewComments } from "../api";

const commentIcon = require('../assets/chat.png');
const likeIcon = require('../assets/heart.png');
function Comments() {
    const {review_id} = useParams();
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);
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
                {comments.length > 0 && comments.map(comment => {
                    return <article key={comment.comment_id} className='comments-container_list'>
                        <div className='comment-container_item'>
                            <div className='comment-container_item-details'>
                                <h4 className='comment-container_item-author'>{comment.author} <span className='comment-date'>{configureDate(comment.created_at)}</span></h4>
                                <p className='comment-container_item-comment'>{comment.body}</p>
                            </div>
                            <div className='comment-container_statistics'>
                                <p>{comment.votes}</p>
                                <img src={likeIcon} alt="heart icon"></img>
                            </div>
                        </div>
                    </article>
                })}
            </section>
        );
    } else {
        return <h3>Comments loading...</h3>
    }
}

export default Comments;