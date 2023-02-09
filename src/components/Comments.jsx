import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviewComments } from "../api";
import CommentAdd from './CommentAdd';
import Loading from './Loading';
import SingleComment from './SingleComment';

function Comments({setError, setShowModal}) {
    const {review_id} = useParams();
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);

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
                <CommentAdd review_id={review_id} setError={setError} setShowModal={setShowModal} setComments={setComments}/>
                {comments.length === 0 && <p>Be the first to leave a comment</p>}
                {comments.length > 0 && comments.map(({comment_id, author, body, created_at, votes}) => {
                    return <SingleComment comment_id={comment_id} author={author} body={body} created_at={created_at} votes={votes} setShowModal={setShowModal} setError={setError}/>
                })}
            </section>
        );
    } else {
        return <Loading component={"Comments"}/>
    }
}

export default Comments;