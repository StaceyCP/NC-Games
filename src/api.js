import axios from "axios";

const ncGamesApi = axios.create({
    baseURL: 'https://nc-games-api-53j2.onrender.com/api'
});


// Server GET requests 

export const getReviews = () => {
    return ncGamesApi.get('/reviews').then(({ data }) => {
        console.log(data.reviews)
    })
}

