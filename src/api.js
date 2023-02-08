import axios from "axios";

const ncGamesApi = axios.create({
    baseURL: 'https://nc-games-api-53j2.onrender.com/api'
});


// Server GET requests 

export const getReviews = () => {
    return ncGamesApi.get('/reviews').then(({ data }) => {
        return data.reviews
    })
}

export const getReviewById = (review_id) => {
    return ncGamesApi.get(`/reviews/${review_id}`).then(({data}) => {
        return data.review;
    })
}

export const getReviewComments = (review_id) => {
    return ncGamesApi.get(`/reviews/${review_id}/comments`).then(({data}) => {
        return data.comments
    })
}



// Server POST requests

export const postComment = (review_id, newComment) => {
    return ncGamesApi.post(`/reviews/${review_id}/comments`, newComment).then(({data}) => {
        return data.newComment;
    })
}