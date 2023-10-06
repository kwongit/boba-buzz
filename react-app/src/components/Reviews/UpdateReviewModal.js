import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkGetReviewInfo, thunkUpdateReview } from "../../store/reviews";

export const UpdateReviewModal = ({ updateReview }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const [stars, setStars] = useState(updateReview.stars);
  const [review, setReview] = useState(updateReview.review);
  const [activeRating, setActiveRating] = useState(updateReview.stars);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(thunkGetReviewInfo(updateReview.id));
  }, [dispatch, review, stars, updateReview.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      dispatch(thunkUpdateReview({ stars, review }, updateReview.id));
      closeModal();
      setSubmitted(true);
    } catch (errors) {
      if (errors) {
        setErrors(errors);
        setSubmitted(true);
      }
    }
  };

  return (
    <div className="">
      <h2>Update Your Review</h2>
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

          <div className="">
            <textarea
              className=""
              type="text"
              placeholder={`${updateReview.review}`}
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
          </div>
          {!review && submitted && (
            <div className="">
              Your review needs at least 2 characters. Add a few thoughts to
              post review.
            </div>
          )}
        </div>

        <div className="">
          <button className="">Update Review</button>
        </div>
      </form>
    </div>
  );
};
