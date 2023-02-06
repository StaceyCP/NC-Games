import { useContext } from "react";
import { ReviewsContext } from "../contexts/ReviewsContext";
import ReviewCard from "./ReviewCard";

function Reviews() {
    const {reviews, setReviews, reviewsLoading, setReviewsLoading} = useContext(ReviewsContext)
    if (!reviewsLoading) {
        return (
            <section className="reviews-container">
                {reviews.map(review => {
                    return <ReviewCard key={review.review_id} review={review}/>
                })}
            </section>
        );
    } else {
        return (
            <h2>Reviews Loading ... </h2>
        )
    }
}

export default Reviews;