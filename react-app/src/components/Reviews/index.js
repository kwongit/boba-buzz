import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBusinessReviews } from "../../store/reviews";
import { thunkGetBusinessInfo } from "../../store/businesses";
import { CreateReviewModal } from "./CreateReviewModal";
import { UpdateReviewModal } from "./UpdateReviewModal";
import { DeleteReviewModal } from "./DeleteReviewModal";
import OpenModalButton from "../OpenModalButton";

// export const BusinessReviews = ({ businessId }) => {
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
      <h1>Recommended Buzzes</h1>
      <div>
        {reviewsList.length ? (
          <div>
            <div className="">
              <div>Overall buzz rating</div>
              <div>
                <i className="fa-solid fa-star"></i>
                {Number(avg_rating).toFixed(1)}
              </div>
              <div>
                {num_reviews} {num_reviews > 1 ? "Buzzes" : "Buzz"}
              </div>
              <div className="">
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
                          modalComponent={
                            <UpdateReviewModal updateReview={review} />
                          }
                        />
                        <OpenModalButton
                          className=""
                          buttonText="Delete"
                          modalComponent={
                            <DeleteReviewModal reviewId={review.id} />
                          }
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
              <div>Overall buzz rating</div>
              <div>
                <i className="fa-solid fa-star"></i>
                No buzzes yet!
              </div>
              <div className="">
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
              <h3 className="be-the-first-text">
                Be the first to post a buzz!
              </h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
