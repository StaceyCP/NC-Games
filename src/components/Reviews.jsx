import ReviewCard from "./ReviewCard";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getReviews } from "../api";
import { ErrorContext } from "../contexts/Error";
import CategoryNav from "./CategoryNav";

function Reviews() {
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true)
    const [sort_by, setSort_by] = useState()
    const [order, setOrder] = useState()
    const [isCategoryRequestError, setIsCategoryRequestError] = useState(false)
    const {error, setError} = useContext(ErrorContext);
    const {category} = useParams()

    const handleSort = (e) => {
        setSort_by(e.target.value)
    }

    useEffect(() => {
        getReviews(category, sort_by, order).then((reviews) => {
            setError('')
            setReviews(reviews)
            setReviewsLoading(false)
        }).catch(err => {
            setReviewsLoading(false)
            setIsCategoryRequestError(true)
            setError("Oh no! Something went wrong!")
        })
    }, [category, sort_by, order, setError])

    if (!reviewsLoading) {
        return (
            <section className="reviews-container">
                <h2 className="reviews-heading">Reviews</h2>
                <CategoryNav/>
                {category && <h3>Showing all reviews for {category}</h3>}
                <div className="sort-btn_container">
                    <label htmlFor="sort_by">Sort By: </label>
                    <select id="sort_by" onChange={handleSort}>
                        <option defaultValue value="created_at">date</option>
                        <option value="comment_count">comments</option>
                        <option value="votes">likes</option>
                    </select>
                    <button className="sort-btn asc" type="button" onClick={() => {
                        setOrder("asc")
                        document.querySelector(".asc").classList.add("active")
                        document.querySelector(".desc").classList.remove("active")
                    }}>Ascending</button>
                    <button className="sort-btn desc active" type="button" onClick={() => {
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
    } else if (reviewsLoading) {
        return <Loading component={"Reviews"}/>
    } else if (isCategoryRequestError) {
        return <h2>{error}</h2>
    }
}

export default Reviews;