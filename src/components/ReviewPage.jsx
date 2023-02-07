import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewById, updateReviewById } from "../api";
import Comments from "./Comments";
import Loading from "./Loading";
import Modal from "./Modal";

const commentIcon = require('../assets/chat.png');
const likeIcon = require('../assets/heart.png');

function ReviewPage() {
    const [review, setReview] = useState({});
    const [voteCount, setVoteCount] = useState('')
    const [reviewLoading, setReviewLoading] = useState(true);
    const [error, setError] = useState('');
    const configuredDate = new Date(review.created_at).toDateString()
    const {review_id} = useParams();
    useEffect(() => {
        getReviewById(review_id).then(reviewFromAPI => {
            setReview(reviewFromAPI[0])
            setReviewLoading(false)
            setVoteCount(reviewFromAPI[0].votes)
        })
    }, [review_id])
    
    let vote = {
        inc_votes: 1
    }
 
    const handleVote = (num) => {
        vote.inc_votes = num
        updateReviewById(review_id, vote).then((updatedReviewFromAPI) => {
            setVoteCount(updatedReviewFromAPI[0].votes)
            return updatedReviewFromAPI
        }).catch(err => {
            setError("Something went wrong! Try again in a moment");
        })
    }
    console.log(error)
    if (!reviewLoading && error === '') {
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
                            <p>{review.comment_count}</p>
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
                        <button className="review-page_reaction love" type="button" aria-label="Add 2 to the review impressions" onClick={() => {
                            handleVote(2)
                            }}>Love</button>
                        <button className="reaction-page_reaction like" type="button" aria-label="Add 1 to the review impressions" onClick={() => {
                            handleVote(1)
                            }}>Like</button>
                        <button className="reaction-page_reaction dislike" type="button" aria-label="Remove 1 from the review impressions" onClick={() => {
                            handleVote(-1)
                            }}>Dislike</button>
                        <p>{voteCount} impressions</p>
                    </div>
                    <hr></hr>
                </section>
                <Comments/>
            </main>
        );
    } else if (error !== '') {
        return <Modal text={error}/>
    } else {
        return <Loading component={"Review"}/>
    }
}

export default ReviewPage;