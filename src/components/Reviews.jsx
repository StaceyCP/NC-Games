import ReviewCard from "./ReviewCard";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { getReviews } from "../api";


function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true)
    const [sort_by, setSort_by] = useState()
    const [order, setOrder] = useState()
    const handleSort = (e) => {
        setSort_by(e.target.value)
    }

        useEffect(() => {
            getReviews(sort_by, order).then((reviews) => {
                setReviews(reviews)
                setReviewsLoading(false)
            })
        }, [sort_by, order])
    if (!reviewsLoading) {
        return (
            <section className="reviews-container">
                <h2>Reviews</h2>
                <label htmlFor="sort_by"></label>
                <select id="sort_by" onChange={handleSort}>
                    <option defaultValue value="created_at">date</option>
                    <option value="comment_count">comments</option>
                    <option value="votes">likes</option>
                </select>
                <button type="button" onClick={() => {
                    setOrder("asc")
                }}>Ascending</button>
                <button type="button" onClick={() => {
                    setOrder("desc")
                }}>Descending</button>
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