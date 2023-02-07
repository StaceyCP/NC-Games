import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getReviewById } from "../api";
import Comments from "./Comments";
const commentIcon = require('../assets/chat.png');
const likeIcon = require('../assets/heart.png');

function ReviewPage() {
    const [review, setReview] = useState({});
    const [reviewLoading, setReviewLoading] = useState(true);
    const {review_id} = useParams();
    useEffect(() => {
        getReviewById(review_id).then(reviewFromAPI => {
            setReview(reviewFromAPI[0])
            setReviewLoading(false)
        })
    }, [review_id])
    const configuredDate = new Date(review.created_at).toDateString()
    if (!reviewLoading) {
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
                            <p>{review.votes}</p>
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
                        <button className="review-page_reaction love" type="button">Love</button>
                        <button className="reaction-page_reaction like" type="button">Like</button>
                        <button className="reaction-page_reaction dislike" type="button">Dislike</button>
                        <p>{review.votes} impressions</p>
                    </div>
                    <hr></hr>
                </section>
                <Comments/>
            </main>
        );
    } else {
        return <h2>Review is loading...</h2>
    }
}

export default ReviewPage;