import ReviewCard from "./ReviewCard";
import Loading from "./Loading";
import { useEffect, useState } from "react";
import { getReviews } from "../api";
import { useParams } from "react-router-dom";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true)
    const [sort_by, setSort_by] = useState()
    const [order, setOrder] = useState()
    const {category} = useParams()

    const handleSort = (e) => {
        setSort_by(e.target.value)
    }

    useEffect(() => {
        getReviews(category, sort_by, order).then((reviews) => {
            setReviews(reviews)
            setReviewsLoading(false)
        })
    }, [category, sort_by, order])

    if (!reviewsLoading) {
        return (
            <section className="reviews-container">
                <h2>Reviews</h2>
                {category && <h3>Showing all reviews for {category}</h3>}
                <label htmlFor="sort_by">Sort By: </label>
                <select id="sort_by" onChange={handleSort}>
                    <option defaultValue value="created_at">date</option>
                    <option value="comment_count">comments</option>
                    <option value="votes">likes</option>
                </select>
                <div className="sort-btn_container">
                    <button className="sort-btn asc" type="button" onClick={() => {
                        setOrder("asc")
                        document.querySelector(".asc").classList.add("active")
                        document.querySelector(".desc").classList.remove("active")
                    }}>Ascending</button>
                    <button className="sort-btn desc" type="button" onClick={() => {
                        setOrder("desc")
                        document.querySelector(".desc").classList.add("active")
                        document.querySelector(".asc").classList.remove("active")
                    }}>Descending</button>
                </div>
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