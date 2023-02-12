import { useContext, useState } from "react"
import { LoggedInContext } from "../contexts/LoggedIn"

function ReviewAdd() {
    const {loggedInUser} = useContext(LoggedInContext)
    const [newTitle, setNewTitle] = useState('')
    const [newReview_body, setNewReview_body] = useState('')
    const [newDesigner, setNewDesigner] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newReview_img_url, setNewReview_img_url] = useState('')
    const handleReviewSubmit = (e) => {
        e.preventDefault()
        setShowModal(false)
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
                    <input className="title-input" type="text" value={newTitle} onChange={(e) => {
                        setNewTitle(e.target.value)
                    }}></input>
                    <textarea className="body-input" value={newReview_body} onChange={(e) => {
                        setNewReview_body(e.target.value)
                    }}></textarea>
                    <input className="designer-input" type="text" value={newDesigner} onChange={(e) => {
                        setNewDesigner(e.target.value)
                    }}></input>
                    <input className="review-img-input" type="text" value={newReview_img_url} onChange={(e) => {
                        setNewReview_img_url(e.target.value)
                    }}></input>
                    <select onChange={(e) => {
                        setNewCategory(e.target.value)
                    }}></select>
                    <button onClick={handleReviewSubmit}>Add</button>
                </form>
            </article>
        </section>
    );
}


// "owner": "mallionaire",
// "title": "Super awesome board game review",
// "review_body": "Super awesome is a super awesome board game",
// "designer": "Stacey",
// "category": "children's games",
// "review_img_url": "https://www.superawesome.com/wp-content/uploads/2020/09/SA_Epic_Logo.jpg"

export default ReviewAdd;