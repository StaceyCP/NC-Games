import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewComments } from "../api";
import Loading from './Loading';

const likeIcon = require('../assets/thumbs-up.png');
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
                {comments.length > 0 && comments.map(({comment_id, author, body, created_at, votes}) => {
                    return <article key={comment_id} className='comments-container_list'>
                        <div className='comment-container_item'>
                            <div className='comment-container_item-details'>
                                <h4 className='comment-container_item-author'>{author} <span className='comment-date'>{configureDate(created_at)}</span></h4>
                                <p className='comment-container_item-comment'>{body}</p>
                            </div>
                            <div className='comment-container_statistics'>
                                <p>{votes}</p>
                                <img src={likeIcon} alt="Thumbs up"></img>
                            </div>
                        </div>
                    </article>
                })}
            </section>
        );
    } else {
        return <Loading component={"Comments"}/>
    }
}

export default Comments;