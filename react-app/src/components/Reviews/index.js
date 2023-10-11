import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBusinessReviews } from "../../store/reviews";
import { thunkGetBusinessInfo } from "../../store/businesses";
import { CreateReviewModal } from "./CreateReviewModal";
import { UpdateReviewModal } from "./UpdateReviewModal";
import { DeleteReviewModal } from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";
import "./BusinessReviews.css";

export const BusinessReviews = () => {
  const dispatch = useDispatch();
  const { businessId } = useParams();

  const reviews = useSelector((state) => state.reviews.allReviews);
  const business = useSelector((state) => state.businesses.singleBusiness);
  let user = useSelector((state) => state.session.user);

  const reviewsList = Object.values(reviews).reverse();

  useEffect(() => {
    dispatch(thunkGetBusinessReviews(businessId));
    dispatch(thunkGetBusinessInfo(businessId));
  }, [dispatch, businessId]);

  if (!reviews) return null;
  if (!user) user = 0;

  const previousReview = reviewsList.find(
    (review) => review.user_id === user.id
  );

  const { avg_rating, num_reviews } = business;

  const createDate = (date) => {
    const newDate = new Date(date);
    const month = newDate.toLocaleString("default", { month: "long" });
    const day = newDate.toLocaleString("default", { day: "numeric" });
    const year = newDate.toLocaleString("default", { year: "numeric" });
    return `${month} ${day}, ${year}`;
  };

  return (
    <div>
      <h2>Recommended Buzzes</h2>
      <div>
        {reviewsList.length ? (
          <div>
            <div className="business-reviews-overall-rating-container">
              <h4>Overall Buzz Rating:</h4>

              <div>
                {avg_rating ? (
                  <div className="business-reviews-overall-stars">
                    <div>
                      {Array(Math.floor(avg_rating))
                        .fill()
                        .map((_, i) => (
                          <i key={i} className="fa-solid fa-star"></i>
                        ))}
                      {avg_rating % 1 !== 0 && (
                        <i className="fa-solid fa-star-half-stroke"></i>
                      )}
                      {Array(5 - Math.ceil(avg_rating))
                        .fill()
                        .map((_, i) => (
                          <i key={i} className="fa-regular fa-star"></i>
                        ))}
                    </div>
                    <div>
                      {Number(avg_rating).toFixed(1)} ({num_reviews}{" "}
                      {num_reviews > 1 ? "Buzzes" : "Buzz"})
                    </div>
                  </div>
                ) : (
                  <div className="business-reviews-overall-no-stars">
                    <div>
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <i key={i} className="fa-regular fa-star"></i>
                        ))}
                    </div>
                    <div>New (0 Buzzes)</div>
                  </div>
                )}
              </div>

              <div className="business-reviews-post-review-btn">
                {!previousReview &&
                  user.id !== business.owner_id &&
                  user.id && (
                    <OpenModalButton
                      buttonText="Post Buzz"
                      modalComponent={<CreateReviewModal business={business} />}
                    />
                  )}
              </div>
            </div>

            {reviewsList.map((review) => (
              <div className="business-reviews-user-reviews" key={review.id}>
                <div className="">
                  <h4 className="business-reviews-username">{review.user}</h4>

                  <div className="business-reviews-stars-date">
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

                  <div className="business-review-p">{review.review}</div>

                  <div className="">
                    {review.user_id === user.id && (
                      <div className="business-reviews-btn-container">
                        <div>
                          <OpenModalButton
                            className="business-reviews-update-btn"
                            buttonText="Update"
                            modalComponent={
                              <UpdateReviewModal updateReview={review} />
                            }
                          />
                        </div>
                        <div>
                          <OpenModalButton
                            className="business-reviews-delete-btn"
                            buttonText="Delete"
                            modalComponent={
                              <DeleteReviewModal reviewId={review.id} />
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="business-reviews-overall-rating-container">
              <h4>Overall Buzz Rating:</h4>

              <div className="business-reviews-overall-no-stars">
                <div>
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <i key={i} className="fa-regular fa-star"></i>
                    ))}
                </div>
                <div>New (0 Buzzes)</div>
              </div>

              <div className="business-reviews-post-review-btn">
                {!previousReview &&
                  user.id !== business.owner_id &&
                  user.id && (
                    <OpenModalButton
                      buttonText="Post Buzz"
                      modalComponent={<CreateReviewModal business={business} />}
                    />
                  )}
              </div>
            </div>

            {!previousReview && user.id !== business.owner_id && user.id && (
              <h4 className="be-the-first-text">
                Be the first to post a buzz!
              </h4>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
