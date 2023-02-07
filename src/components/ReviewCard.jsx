import { Link } from 'react-router-dom';

const commentIcon = require('../assets/chat.png');
const likeIcon = require('../assets/heart.png');
function ReviewCard({ review }) {
    const text = review.review_body
    const flavourText = text.substring(0, 100);
    const date = new Date(review.created_at)
    const configuredDate = date.toLocaleDateString()
    return (
        <>
            <article className="review-card">
                <img src={review.review_img_url} className="review-card_img" alt={`The game relating to the review ${review.title}`}></img>
                <div className="review-card_details">
                    <h3 className="review-card_title"><Link to={`/reviews/${review.review_id}`}>{review.title}</Link></h3>
                    <p className="review-card_flavour-text">{flavourText}... <span><Link to={`/reviews/${review.review_id}`}>Read More</Link></span></p>
                    <p className="review-card_date-posted">{configuredDate} by <span>{review.owner}</span></p>
                </div>
                <div className="review-card_statistics">
                    <p>{review.votes}</p>
                    <img src={likeIcon} alt="heart icon"></img>
                    <p>{review.comment_count}</p>
                    <img src={commentIcon} alt="speach bubble icon"></img>
                </div>
            </article>
            <hr></hr>
        </>
    );
}

export default ReviewCard;