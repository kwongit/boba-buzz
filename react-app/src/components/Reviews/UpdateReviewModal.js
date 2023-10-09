import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkUpdateReview } from "../../store/reviews";

export const UpdateReviewModal = ({ updateReview }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [stars, setStars] = useState(updateReview.stars);
  const [review, setReview] = useState(updateReview.review);
  const [activeRating, setActiveRating] = useState(updateReview.stars);
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
    setSubmitted(true);

    if (!Object.values(errors).length) {
      const updatedReview = await dispatch(
        thunkUpdateReview({ stars, review }, updateReview.id)
      );

      const combinedErrors = { ...errors, Errors: updatedReview.errors };

      if (updatedReview.errors) {
        setErrors(combinedErrors);
      } else {
        closeModal();
      }
    }
  };

  return (
    <div className="">
      <h2>Update Your Buzz</h2>
      <form onSubmit={handleSubmit}>
        <div className="">
          <div className="">
            <div className="">Stars</div>
            <div
              onClick={() => setStars(1)}
              className={
                (stars >= 1 ? "fa-solid fa-star" : "fa-regular fa-star") &&
                (activeRating >= 1 ? "fa-solid fa-star" : "fa-regular fa-star")
              }
              onMouseEnter={() => setActiveRating(1)}
              onMouseLeave={() => setActiveRating(stars)}
            ></div>
            <div
              onClick={() => setStars(2)}
              className={
                (stars >= 2 ? "fa-solid fa-star" : "fa-regular fa-star") &&
                (activeRating >= 2 ? "fa-solid fa-star" : "fa-regular fa-star")
              }
              onMouseEnter={() => setActiveRating(2)}
              onMouseLeave={() => setActiveRating(stars)}
            ></div>
            <div
              onClick={() => setStars(3)}
              className={
                (stars >= 3 ? "fa-solid fa-star" : "fa-regular fa-star") &&
                (activeRating >= 3 ? "fa-solid fa-star" : "fa-regular fa-star")
              }
              onMouseEnter={() => setActiveRating(3)}
              onMouseLeave={() => setActiveRating(stars)}
            ></div>
            <div
              onClick={() => setStars(4)}
              className={
                (stars >= 4 ? "fa-solid fa-star" : "fa-regular fa-star") &&
                (activeRating >= 4 ? "fa-solid fa-star" : "fa-regular fa-star")
              }
              onMouseEnter={() => setActiveRating(4)}
              onMouseLeave={() => setActiveRating(stars)}
            ></div>
            <div
              onClick={() => setStars(5)}
              className={
                (stars >= 5 ? "fa-solid fa-star" : "fa-regular fa-star") &&
                (activeRating >= 5 ? "fa-solid fa-star" : "fa-regular fa-star")
              }
              onMouseEnter={() => setActiveRating(5)}
              onMouseLeave={() => setActiveRating(stars)}
            ></div>
          </div>
          {errors.stars && submitted && <div className="">{errors.stars}</div>}

          <div className="">
            <textarea
              className=""
              type="text"
              placeholder={`${updateReview.review}`}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          {errors.review && submitted && (
            <div className="">{errors.review}</div>
          )}
        </div>

        <div className="">
          <button className="">Update Buzz</button>
        </div>
      </form>
    </div>
  );
};
