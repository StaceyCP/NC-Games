import axios from "axios";

const ncGamesApi = axios.create({
    baseURL: 'https://nc-games-api-53j2.onrender.com/api'
});


// Server GET requests 

export const getReviews = (category, sort_by, order) => {

    return ncGamesApi.get('/reviews', {
        params: {
            category,
            sort_by,
            order
        }
    }).then(({ data }) => {
        return data.reviews
    })
}

export const getCategories = () => {
    return ncGamesApi.get('/categories').then(({data}) => {
        return data;
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

export const getUsers = () => {
    return ncGamesApi.get('/users').then(({data}) => {
        return data.users
    })
}

export const getUserByUsername = (username) => {
    return ncGamesApi.get(`/users/${username}`).then(({data}) => {
        return data.user
    })
}

// Server PATCH requests

export const updateReviewById = (review_id, review_update) => {
    return ncGamesApi.patch(`/reviews/${review_id}`, review_update).then(({data}) => {
        return data.updatedReview;
    })
}

export const updateCommentById = (comment_id, comment_update) => {
    return ncGamesApi.patch(`/comments/${comment_id}`, comment_update).then(({data}) => {
        return data.updatedComment;
    })
}

// Server POST requests

export const postComment = (review_id, newComment) => {
    return ncGamesApi.post(`/reviews/${review_id}/comments`, newComment).then(({data}) => {
        return data.newComment;
    })
}

export const postUser = (newUser) => {
    return ncGamesApi.post('/users', newUser).then(({data}) => {
        return data.newUser;
    })
}

// Server DELETE requests

export const deleteCommentById = (comment_id) => {
    return ncGamesApi.delete(`/comments/${comment_id}`).then(() => {
        return 
    }) 
}