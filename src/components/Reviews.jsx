import { useContext } from "react";
import { ReviewsContext } from "../contexts/ReviewsContext";
import ReviewCard from "./ReviewCard";
import Loading from "./Loading";

function Reviews() {
    const {reviews, setReviews, reviewsLoading, setReviewsLoading} = useContext(ReviewsContext)
    if (!reviewsLoading) {
        return (
            <section className="reviews-container">
                <h2>Reviews</h2>
                <hr></hr>
                {reviews.map(review => {
                    return <ReviewCard key={review.review_id} review={review}/>
                })}
            </section>
        );
    } else {
        return <Loading component={"Reviews"}/>
    }
}

export default Reviews;