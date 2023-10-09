import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import { UpdateReviewModal } from "./UpdateReviewModal";
import { DeleteReviewModal } from "./DeleteReviewModal";
import "./ManageReviews.css";

export const ManageReviews = () => {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.allReviews);
  const user = useSelector((state) => state.session.user);

  const reviewsList = Object.values(reviews).reverse();

  useEffect(() => {
    dispatch(thunkGetUserReviews());
  }, [dispatch, reviewsList.length]);

  if (!reviews) return null;
  if (!user) return null;

  const createDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.toLocaleString("default", { day: "numeric" });
    const year = newDate.toLocaleString("default", { year: "numeric" });
    return `${month} ${day}, ${year}`;
  };

  return (
    <div>
      <div className="manage-reviews-container">
        <h1>Manage Your Buzzes</h1>
      </div>

      <div className="manage-reviews-list-container">
        {reviewsList.map((review) => (
          <div className="manage-reviews-user-reviews" key={review.id}>
            <div className="">
              <div className="manage-reviews-business-name">
                {review.business_name}
              </div>
              <div className="">
                {review.stars ? (
                  <div className="manage-reviews-stars-date">
                    <div>
                      {Array(review.stars)
                        .fill()
                        .map((_, i) => (
                          <i key={i} className="fa-solid fa-star"></i>
                        ))}
                      {Array(5 - review.stars)
                        .fill()
                        .map((_, i) => (
                          <i key={i} className="fa-regular fa-star"></i>
                        ))}
                    </div>
                    <div>{createDate(review.created_at)}</div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="">{review.review}</div>
              <div className="manage-reviews-btn-container">
                <div>
                  <OpenModalButton
                    className="manage-reviews-update-btn"
                    buttonText="Update"
                    modalComponent={<UpdateReviewModal updateReview={review} />}
                  />
                </div>
                <div>
                  <OpenModalButton
                    className="manage-reviews-delete-btn"
                    buttonText="Delete"
                    modalComponent={<DeleteReviewModal reviewId={review.id} />}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
