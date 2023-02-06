import { createContext, useEffect, useState } from "react";
import { getReviews } from "../api";

export const ReviewsContext = createContext()

export const ReviewsProvider = ({children}) => {
    const [reviews, setReviews] = useState([]);
        useEffect(() => {
            getReviews().then(reviews => setReviews(reviews))
        }, [])

    return (
        <ReviewsContext.Provider value={{reviews, setReviews}}>
            {children}
        </ReviewsContext.Provider>
    )
}