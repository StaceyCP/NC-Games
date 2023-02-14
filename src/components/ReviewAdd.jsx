import { useContext, useState, useEffect } from "react"
import { getCategories, postReview } from "../api"
import { LoggedInContext } from "../contexts/LoggedIn"

function ReviewAdd({setShowReviewForm}) {
    const {loggedInUser} = useContext(LoggedInContext)
    const [newTitle, setNewTitle] = useState('')
    const [newReview_body, setNewReview_body] = useState('')
    const [newDesigner, setNewDesigner] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newReview_img_url, setNewReview_img_url] = useState('')
    const [categories, setCategories] = useState([])
    useEffect(() => {
        getCategories().then((categoriesFromApi) => {
            setCategories(categoriesFromApi)
        })
    }, [])
    
    const handleReviewSubmit = (e) => {
        e.preventDefault()
        setShowReviewForm(false)
        postReview(reviewToAdd).then((reviewFromAPI) => {
            console.log(reviewFromAPI);
        })
    }

    const reviewToAdd = {
        owner: loggedInUser.username,
        title: newTitle,
        review_body: newReview_body,
        designer: newDesigner, 
        category: newCategory, 
        review_img_url: newReview_img_url
    }
    return (
        <section className="modal">
            <article>
                <h3>Write a review</h3>
                <form>
                    <label></label>
                    <input id="title" className="title-input" type="text" value={newTitle} onChange={(e) => {
                        setNewTitle(e.target.value)
                    }}></input>
                    <textarea id="body" className="body-input" value={newReview_body} onChange={(e) => {
                        setNewReview_body(e.target.value)
                    }}></textarea>
                    <input id="designer" className="designer-input" type="text" value={newDesigner} onChange={(e) => {
                        setNewDesigner(e.target.value)
                    }}></input>
                    <input id="image-url" className="review-img-input" type="text" value={newReview_img_url} onChange={(e) => {
                        setNewReview_img_url(e.target.value)
                    }}></input>
                    <select id="category" onChange={(e) => {
                        setNewCategory(e.target.value)
                    }}>
                        <option defaultValue>Select category</option>
                        {categories.map(({slug}) => {
                            return <option>{slug}</option>
                        })}
                    </select>
                    <button onClick={handleReviewSubmit}>Add</button>
                    <button type="button" onClick={() => {
                        setShowReviewForm(false)
                    }}>Cancel</button>
                </form>
            </article>
        </section>
    );
}

export default ReviewAdd;