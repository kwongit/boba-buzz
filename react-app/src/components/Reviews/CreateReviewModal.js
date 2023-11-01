import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/reviews";
import "./CreateReviewModal.css";

export const CreateReviewModal = ({ business }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [stars, setStars] = useState();
  const [review, setReview] = useState("");
  const [activeRating, setActiveRating] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errors = {};

    if (!stars) errors.stars = "Star rating is required!";
    if (!review || review.length < 2)
      errors.review = "Please provide a buzz of at least 2 characters!";

    setErrors(errors);
  }, [dispatch, review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitted(true);

    if (!Object.values(errors).length) {
      const addReview = await dispatch(
        thunkCreateReview({ stars, review }, business.id)
      );

      const combinedErrors = { ...errors, Errors: addReview.errors };

      if (addReview.errors) {
        setErrors(combinedErrors);
      } else {
        closeModal();
        history.push(`/businesses/${business.id}`);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="create-review-modal-window">
      <h2 className="create-review-modal-title">Post Your Buzz</h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="create-review-rating-container">
            <div className="">Select your rating:</div>
            <div className="create-review-stars-container">
              <div
                onClick={() => setStars(1)}
                className={
                  (stars >= 1 ? "fa-solid fa-star" : "fa-regular fa-star") &&
                  (activeRating >= 1
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star")
                }
                onMouseEnter={() => setActiveRating(1)}
                onMouseLeave={() => setActiveRating(stars)}
              ></div>
              <div
                onClick={() => setStars(2)}
                className={
                  (stars >= 2 ? "fa-solid fa-star" : "fa-regular fa-star") &&
                  (activeRating >= 2
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star")
                }
                onMouseEnter={() => setActiveRating(2)}
                onMouseLeave={() => setActiveRating(stars)}
              ></div>
              <div
                onClick={() => setStars(3)}
                className={
                  (stars >= 3 ? "fa-solid fa-star" : "fa-regular fa-star") &&
                  (activeRating >= 3
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star")
                }
                onMouseEnter={() => setActiveRating(3)}
                onMouseLeave={() => setActiveRating(stars)}
              ></div>
              <div
                onClick={() => setStars(4)}
                className={
                  (stars >= 4 ? "fa-solid fa-star" : "fa-regular fa-star") &&
                  (activeRating >= 4
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star")
                }
                onMouseEnter={() => setActiveRating(4)}
                onMouseLeave={() => setActiveRating(stars)}
              ></div>
              <div
                onClick={() => setStars(5)}
                className={
                  (stars >= 5 ? "fa-solid fa-star" : "fa-regular fa-star") &&
                  (activeRating >= 5
                    ? "fa-solid fa-star"
                    : "fa-regular fa-star")
                }
                onMouseEnter={() => setActiveRating(5)}
                onMouseLeave={() => setActiveRating(stars)}
              ></div>
            </div>
          </div>
          {errors.stars && submitted && (
            <div className="on-submit-errors">{errors.stars}</div>
          )}

          <div className="create-review-review-container">
            <textarea
              className="create-review-textarea"
              type="text"
              placeholder={`Leave a buzz for ${business.name}`}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required={true}
            ></textarea>
          </div>
          {errors.review && submitted && (
            <div className="on-submit-errors">{errors.review}</div>
          )}
        </div>

        <div className="create-review-create-btn-container">
          <button className="create-review-create-btn">Post Buzz</button>
        </div>
      </form>
    </div>
  );
};
