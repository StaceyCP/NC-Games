import { useContext } from "react";
import { ReviewsContext } from "../contexts/ReviewsContext";
import ReviewCard from "./ReviewCard";

function Reviews() {
    const {reviews, setReviews} = useContext(ReviewsContext)
    return (
        <section>
            {reviews.map(review => {
                return <ReviewCard key={review.review_id} review={review}/>
            })}
        </section>
    );
}

export default Reviews;