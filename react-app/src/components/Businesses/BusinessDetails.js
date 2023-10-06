import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetBusinessInfo } from "../../store/businesses";
import { thunkGetBusinessReviews } from "../../store/reviews";
import { BusinessReviews } from "../Reviews";

export const BusinessDetails = () => {
  const dispatch = useDispatch();

  const { businessId } = useParams();

  const reviews = useSelector((state) => state.reviews.allReviews);
  const reviewsList = Object.values(reviews);

  const oneBusiness = useSelector((state) => state.businesses.singleBusiness);

  useEffect(() => {
    dispatch(thunkGetBusinessInfo(businessId));
    dispatch(thunkGetBusinessReviews(businessId));
  }, [dispatch, businessId, reviewsList.length]);

  if (!oneBusiness.id) return null;

  const {
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
        style={{ width: "220px", height: "220px" }}
      ></img>
      <div>{name}</div>
      {/* <div>
        {reviewsList.length ? (
          <span>
            <i className="fa-solid fa-star"></i>
            {Number(avg_rating).toFixed(1)} ({num_reviews}{" "}
            {num_reviews > 1 ? "Buzzes" : "Buzz"})
          </span>
        ) : (
          <span>
            <i className="fa-solid fa-star"></i>
            New
          </span>
        )}
      </div> */}
      <div>
        {avg_rating ? (
          <>
            {[...Array(Math.floor(avg_rating))].map((_, index) => (
              <i key={index} className="fa-solid fa-star"></i>
            ))}
            {avg_rating % 1 !== 0 && (
              <i className="fa-solid fa-star-half-stroke"></i>
            )}
            {[...Array(5 - Math.ceil(avg_rating))].map((_, index) => (
              <i key={index} className="fa-regular fa-star"></i>
            ))}
            {Number(avg_rating).toFixed(1)} ({num_reviews}{" "}
            {num_reviews > 1 ? "Buzzes" : "Buzz"})
          </>
        ) : (
          <>
            {[...Array(5)].map((_, index) => (
              <i key={index} className="fa-regular fa-star"></i>
            ))}
            New
          </>
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
      <div>About the Shop</div>
      <div>{description}</div>

      <BusinessReviews />
    </div>
  );
};
