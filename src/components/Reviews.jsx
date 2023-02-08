import ReviewCard from "./ReviewCard";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

function Reviews() {
    const {category} = useParams()
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true)
        useEffect(() => {
            getReviews(category).then((reviews) => {
                setReviews(reviews)
                setReviewsLoading(false)
            })
        }, [category])

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