import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBusinessReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import { thunkGetBusinessInfo } from "../../store/businesses";

export const BusinessReviews = ({ businessId }) => {
  const dispatch = useDispatch();

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
      <h1>Recommended Reviews</h1>
      <div>
        {reviewsList.length ? (
          <div>
            <div className="">
              <div>Overall rating</div>
              <div>
                <i className="fa-solid fa-star"></i>
                {Number(avg_rating).toFixed(1)}
              </div>
              <div>
                {num_reviews} {num_reviews > 1 ? "Reviews" : "Review"}
              </div>
              <div className="">
                {!previousReview &&
                  user.id !== business.owner_id &&
                  user.id && (
                    <OpenModalButton
                      buttonText="Post Review"
                      // modalComponent={
                      //   <CreateReviewModal business={business} user={user} />
                      // }
                    />
                  )}
              </div>
            </div>

            {reviewsList.map((review) => (
              <div className="" key={review.id}>
                <div className="">
                  <div className="">{review.user}</div>
                  <div className="">
                    <i className="fa-solid fa-star"></i>
                    {review.stars}
                    <div className="">{createDate(review.created_at)}</div>
                  </div>
                  <div className="">{review.review}</div>
                  <div className="">
                    {review.user_id === user.id && (
                      <div>
                        <OpenModalButton
                          className=""
                          buttonText="Update"
                          // modalComponent={
                          //   <UpdateReviewModal updateReview={review} />
                          // }
                        />
                        <OpenModalButton
                          className=""
                          buttonText="Delete"
                          // modalComponent={<DeleteReviewModal review={review} />}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="">
              <div>Overall rating</div>
              <div>
                <i className="fa-solid fa-star"></i>
                New
              </div>
              <div className="">
                {!previousReview &&
                  user.id !== business.owner_id &&
                  user.id && (
                    <OpenModalButton
                      buttonText="Post Review"
                      // modalComponent={
                      //   <CreateReviewModal business={business} user={user} />
                      // }
                    />
                  )}
              </div>
            </div>

            {!previousReview && user.id !== business.owner_id && user.id && (
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
