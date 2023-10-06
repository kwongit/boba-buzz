import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateReview } from "../../store/reviews";

export const CreateReviewModal = ({ business }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();

  const [stars, setStars] = useState();
  const [review, setReview] = useState("");
  const [activeRating, setActiveRating] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const errors = {};

    if (!stars) errors.stars = "Star rating is required!";
    if (!review) errors.review = "Review is required!";

    setErrors(errors);
  }, [dispatch, review, stars]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      await dispatch(thunkCreateReview({ stars, review }, business.id));
      closeModal();
      setSubmitted(true);
      history.push(`/businesses/${business.id}`);
    } catch (errors) {
      if (errors) {
        setErrors(errors);
        setSubmitted(true);
      }
    }
  };

  return (
    <div className="">
      <h2>Post Your Review</h2>
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
          {!stars && submitted && <div className="">Select your rating</div>}

          <div className="">
            <textarea
              className=""
              type="text"
              placeholder={`Leave a review for ${business.name}`}
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
          <button className="">Post Review</button>
        </div>
      </form>
    </div>
  );
};
