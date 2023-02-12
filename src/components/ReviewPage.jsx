import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { getReviewById, updateReviewById } from "../api";
import { ErrorContext } from "../contexts/Error";
import Comments from "./Comments";
import Loading from "./Loading";
import Modal from "./Modal"

const commentIcon = require('../assets/chat.png');
const likeIcon = require('../assets/thumbs-up.png');

function ReviewPage() {
    const [review, setReview] = useState({});
    const [voteCount, setVoteCount] = useState('')
    const [reviewLoading, setReviewLoading] = useState(true);
    const [likeReaction, setLikeReaction] = useState(false);
    const [dislikeReaction, setDislikeReaction] = useState(false);
    const [commentCount, setCommentCount] = useState(0)
    const [isRequestError, setIsRequestError] = useState(false)
    
    const configuredDate = new Date(review.created_at).toDateString()
    const {error, setError, showModal, setShowModal} = useContext(ErrorContext)
    const {review_id} = useParams();

    useEffect(() => {
        getReviewById(review_id).then(reviewFromAPI => {
            setError('')
            setReview(reviewFromAPI[0])
            setReviewLoading(false)
            setVoteCount(reviewFromAPI[0].votes)
            setCommentCount(Number(reviewFromAPI[0].comment_count))
        }).catch(err => {
            setReviewLoading(false)
            setIsRequestError(true)
            setError("404 Review not found")
        })
    }, [review_id, setError, setShowModal])
    
    let vote = {
        inc_votes: 1
    }
 
    const handleVote = (num) => {
        vote.inc_votes = num
        setVoteCount(voteCount + num)
        updateReviewById(review_id, vote).then((updatedReviewFromAPI) => {
            return updatedReviewFromAPI
        }).catch(err => {
            setShowModal(true);
            setError("Whoops something went wrong! Please try again shortly");
        })
    }

    if (!reviewLoading && !isRequestError) {
        return (
            <main className="review-page">
                <section className="review-page_content">
                    <img className="review-page_img" src={review.review_img_url} alt={`Game relating to the review ${review.title}`}></img>
                    <article className="review-page_post-details">
                        <div className="review-page_review-owner">
                            <h2>{review.title}</h2>
                            <p>Posted on {configuredDate}</p>
                            <p>by {review.owner}</p>
                        </div>
                        <div className="review-page_review-statistics">
                            <p>{voteCount}</p>
                            <img src={likeIcon} alt="heart icon"></img>
                            <p>{commentCount}</p>
                            <img src={commentIcon} alt="speach bubble icon"></img>
                        </div>
                    </article>
                    <hr></hr>
                    <article className="review-page_post-content">
                        {review.review_body}
                    </article>
                    <hr></hr>
                    <div className="review-page_reactions">
                        <h3>Did you like this review?</h3>
                        {error !== '' && showModal === true && <Modal/>}
                        <button className="reaction-page_reaction like" type="button" aria-label="Add 1 to the review likes" onClick={() => {
                            if (!likeReaction && !dislikeReaction) {
                                setLikeReaction(true);
                                handleVote(1);
                                document.querySelector(".like").classList.add('reacted')
                            } else if (likeReaction) {
                                setLikeReaction(false);
                                handleVote(-1);
                                document.querySelector(".like").classList.remove('reacted')
                            }}}></button>
                        <button className="reaction-page_reaction dislike" type="button" aria-label="Remove 1 from the review likes" onClick={() => {
                            if (!likeReaction && !dislikeReaction) {
                                setDislikeReaction(true);
                                handleVote(-1);
                                document.querySelector(".dislike").classList.add('reacted')
                            } else if (dislikeReaction){
                                setDislikeReaction(false);
                                handleVote(1);
                                document.querySelector(".dislike").classList.remove('reacted')
                            }}}></button>
                        <p>{voteCount} likes</p>
                    </div>
                    <hr></hr>
                </section>
                <Comments setError={setError} setShowModal={setShowModal} commentCount={commentCount} setCommentCount={setCommentCount}/>
            </main>
        );
    } else if (reviewLoading) {
        return <Loading component={"Review"}/>
    } else if (isRequestError) {
        return <h2>{error}</h2>
    }
}

export default ReviewPage;