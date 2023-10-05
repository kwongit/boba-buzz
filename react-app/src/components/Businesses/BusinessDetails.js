import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { thunkGetBusinessInfo } from "../../store/businesses";
import { thunkGetBusinessReviews } from "../../store/reviews";
import { BusinessReviews } from "../Reviews";

export const BusinessDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { businessId } = useParams();

  const currentUser = useSelector((state) => state.session.user);

  const reviews = useSelector((state) => state.reviews.allReviews);
  const reviewsList = Object.values(reviews);

  const oneBusiness = useSelector((state) => state.businesses.singleBusiness);

  useEffect(() => {
    dispatch(thunkGetBusinessInfo(businessId));
    dispatch(thunkGetBusinessReviews(businessId));
  }, [dispatch, businessId]);

  if (!oneBusiness.id) return null;

  const {
    Owner,
    address,
    city,
    state,
    name,
    avg_rating,
    num_reviews,
    type,
    price,
    open_hours,
    close_hours,
    image_url,
    description,
  } = oneBusiness;

  return (
    <div className="business-details-container">
      <img
        className="business-details-main-image"
        src={image_url}
        alt={name}
        title={name}
      ></img>
      <div>{name}</div>
      <div>
        {reviewsList.length ? (
          <span>
            <i className="fa-solid fa-star"></i>
            {Number(avg_rating).toFixed(1)} ({num_reviews}{" "}
            {num_reviews > 1 ? "Reviews" : "Review"})
          </span>
        ) : (
          <span>
            <i className="fa-solid fa-star"></i>
            New
          </span>
        )}
      </div>
      <div>
        {price === 3 ? "$$$" : price === 2 ? "$$" : "$"} · {type}
      </div>
      <div>
        Hours: {open_hours} - {close_hours}
      </div>
      <div>Featured Items</div>
      <div>Location & Hours</div>
      <div>
        {address}, {city}, {state}
      </div>
      <div>
        Hours: {open_hours} - {close_hours}
      </div>
      <div>About the Business</div>
      <div>{description}</div>

      <BusinessReviews />
    </div>
  );
};
