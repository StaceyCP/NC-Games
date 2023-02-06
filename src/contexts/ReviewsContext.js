import { createContext, useEffect, useState } from "react";
import { getReviews } from "../api";

export const ReviewsContext = createContext()

export const ReviewsProvider = ({children}) => {
    const [reviews, setReviews] = useState([]);
    const [reviewsLoading, setReviewsLoading] = useState(true)
        useEffect(() => {
            getReviews().then((reviews) => {
                setReviews(reviews)
                setReviewsLoading(false)
            })
        }, [])

    return (
        <ReviewsContext.Provider value={{reviews, setReviews, reviewsLoading, setReviewsLoading}}>
            {children}
        </ReviewsContext.Provider>
    )
}