import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetBusinessInfo } from "../../store/businesses";
import { thunkGetBusinessReviews } from "../../store/reviews";
import { BusinessReviews } from "../Reviews";
import "./BusinessDetails.css";

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
    <div className="business-details-window">
      <div className="business-details-container">
        <div className="business-details-sub-container">
          <div className="business-details-main-img">
            <img
              className="preview-img"
              src={image_url}
              alt={name}
              title={name}
              // style={{ width: "220px", height: "220px" }}
            ></img>
          </div>
          <div className="business-details-details">
            <h3>{name}</h3>
            <div>
              {avg_rating ? (
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
                  {Number(avg_rating).toFixed(1)} ({num_reviews}{" "}
                  {num_reviews > 1 ? "Buzzes" : "Buzz"})
                </div>
              ) : (
                <div>
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <i key={i} className="fa-regular fa-star"></i>
                    ))}
                  New (0 Buzzes)
                </div>
              )}
            </div>
            <div>
              {price === 3 ? "$$$" : price === 2 ? "$$" : "$"} · {type}
            </div>
            <div>
              Hours: {open_hours} - {close_hours}
            </div>
          </div>
        </div>
        <div className="business-details-additional-details">
          <h3>Featured Items</h3>
          <div>Coming Soon...</div>
          <h3>Location & Hours</h3>
          <div>
            {address}, {city}, {state}
          </div>
          <div>
            Hours: {open_hours} - {close_hours}
          </div>
          <h3>About the Shop</h3>
          <div>{description}</div>
        </div>
        <BusinessReviews />
      </div>
    </div>
  );
};
