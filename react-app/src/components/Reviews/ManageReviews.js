import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetUserReviews } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";

export const ManageReviews = () => {
  const dispatch = useDispatch();

  const reviews = useSelector((state) => state.reviews.allReviews);
  const user = useSelector((state) => state.session.user);

  const reviewsList = Object.values(reviews).reverse();

  useEffect(() => {
    dispatch(thunkGetUserReviews());
  }, [dispatch]);

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
      <h1>Manage Your Reviews</h1>

      {reviewsList.map((review) => (
        <div className="" key={review.id}>
          <div className="">
            <div className="">{review.business_name}</div>
            <div className="">
              <i className="fa-solid fa-star"></i>
              {review.stars}
              <div className="">{createDate(review.created_at)}</div>
            </div>
            <div className="">{review.review}</div>
            <div className="">
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
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
