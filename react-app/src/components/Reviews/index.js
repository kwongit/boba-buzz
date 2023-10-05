import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBusinessReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import { thunkGetBusinessInfo } from "../../store/businesses";

export const BusinessReviews = ({ businessId }) => {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.allReviews);
  const business = useSelector((state) => state.businesses.singleBusiness);
  const user = useSelector((state) => state.session.user);

  const reviewsList = Object.values(reviews).reverse();

  useEffect(() => {
    dispatch(thunkGetBusinessReviews(businessId));
    dispatch(thunkGetBusinessInfo(businessId));
  }, [dispatch, businessId]);

  if (!reviews) return null;

  const previousReview =
    user && reviewsList.find((review) => review.userId === user.id);

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
      <h1>RENDER REVIEWS COMPONENT HERE</h1>
      <div>
        {reviewsList.length ? (
          <div>
            <div className="">
              <div>Overall rating</div>
              <i className="fa-solid fa-star"></i>{" "}
              {Number(avg_rating).toFixed(1)}
              <div>
                {num_reviews} {num_reviews > 1 ? "Reviews" : "Review"}
              </div>
              <div className="">
                {user && !previousReview && business.ownerId !== user?.id && (
                  <OpenModalButton
                    buttonText="Post Your Review"
                    // modalComponent={
                    //   <CreateReviewModal business={business} user={user} />
                    // }
                  />
                )}
              </div>
            </div>

            {reviewsList.map((review) => (
              <div key={review.id}>
                <div className="review-user-date-description-container">
                  {/* <h3 className="user-name">{review}</h3> */}
                  <h4 className="review-date">
                    {createDate(review.created_at)}
                  </h4>
                  <p className="review-description">{review.review}</p>

                  <div className="delete-review-button">
                    {review.userId === user?.id && (
                      <OpenModalButton
                        buttonText="Delete"
                        // modalComponent={
                        //   <DeleteReviewModal
                        //     reviewId={review.id}
                        //     businessId={business.id}
                        //   />
                        // }
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="new-star-container">
              <i className="fa-solid fa-star"></i>
              New
              <div className="post-review-button">
                {user && !previousReview && business.ownerId !== user?.id && (
                  <OpenModalButton
                    buttonText="Post Your Review"
                    // modalComponent={
                    //   <CreateReviewModal business={business} user={user} />
                    // }
                  />
                )}
              </div>
            </div>

            {user && !previousReview && business.ownerId !== user?.id && (
              <h3 className="be-the-first-text">
                Be the first to post a review!
              </h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
