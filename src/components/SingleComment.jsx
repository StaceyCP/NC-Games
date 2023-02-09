import { useState, useContext } from "react"
import { updateCommentById } from "../api"
import { ErrorContext } from "../contexts/Error"

function SingleComment({comment_id, author, body, created_at, votes}) {
    const {setError, setShowModal} = useContext(ErrorContext)

    let vote = {
        inc_votes: 1
    }
    
    const handleCommentVote = (num, comment_id) => {
        vote.inc_votes = num
        setCommentVoteCount(commentVoteCount + num)
        updateCommentById(comment_id, vote).then((updatedCommentFromAPI) => {
            return updatedCommentFromAPI
        }).catch(err => {
            setShowModal(true);
            setError("Whoops something went wrong! Please try again shortly");
        })
    }
    
    const configureDate = (timestamp) =>  new Date(timestamp).toDateString()
    const [likeReaction, setLikeReaction] = useState(false);
    const [dislikeReaction, setDislikeReaction] = useState(false);
    const [commentVoteCount, setCommentVoteCount] = useState(votes);

    return (
        <article key={comment_id} className='comments-container_list'>
            <div className='comment-container_item'>
                <div className='comment-container_item-details'>
                    <h4 className='comment-container_item-author'>{author} <span className='comment-date'>{configureDate(created_at)}</span></h4>
                    <p className='comment-container_item-comment'>{body}</p>
                </div>
                <div className='comment-container_statistics'>
                    <button className={`comment_reaction like-${comment_id} comment-like`} type="button" aria-label="Add 1 to the review likes" onClick={() => {
                        if (!likeReaction && !dislikeReaction) {
                            handleCommentVote(1, comment_id);
                            setCommentVoteCount(commentVoteCount + 1)
                            document.querySelector(`.like-${comment_id}`).classList.add('reacted')
                            setLikeReaction(true)
                        } else if (likeReaction) {
                            handleCommentVote(-1, comment_id);
                            setCommentVoteCount(commentVoteCount - 1)
                            document.querySelector(`.like-${comment_id}`).classList.remove('reacted')
                            setLikeReaction(false)
                        }
                    }}></button>
                    <p>{commentVoteCount}</p>
                    <button className={`comment_reaction dislike-${comment_id} comment-dislike`} type="button" aria-label="Remove 1 from the review likes" onClick={() => {
                        if (!likeReaction && !dislikeReaction) {
                            handleCommentVote(-1, comment_id);
                            setCommentVoteCount(commentVoteCount - 1)
                            document.querySelector(`.dislike-${comment_id}`).classList.add('reacted')
                            setDislikeReaction(true)
                        } else if (dislikeReaction) {
                            handleCommentVote(1, comment_id);
                            setCommentVoteCount(commentVoteCount + 1)
                            document.querySelector(`.dislike-${comment_id}`).classList.remove('reacted')
                            setDislikeReaction(false)
                        }
                    }}></button>
                </div>
            </div>
        </article>
    );
}

export default SingleComment;