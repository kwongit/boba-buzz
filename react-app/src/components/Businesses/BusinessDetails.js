import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { thunkGetBusinessInfo } from "../../store/businesses";
import { thunkGetBusinessReviews } from "../../store/reviews";
import { FeaturedItems } from "../FeaturedItems";
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
    <div>
      <img
        className="business-details-banner-img"
        src={image_url}
        alt={name}
        title={name}
      ></img>
      <div className="business-details-window">
        <div className="business-details-container">
          <div className="business-details-sub-container">
            <div className="business-details-details">
              <h1>{name}</h1>
              <div>
                {avg_rating ? (
                  <div className="business-details-overall-stars">
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
                  <div className="business-details-overall-no-stars">
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
              <div>
                {price === 3 ? "$$$" : price === 2 ? "$$" : "$"} · {type}
              </div>
              <div>
                Hours: {open_hours} - {close_hours}
              </div>
            </div>
          </div>
          <div className="business-details-additional-details">
            <div className="business-details-featured-items">
              <h3>Featured Items</h3>
              <div className="">
                <FeaturedItems businessId={businessId} />
              </div>
            </div>
            <div className="business-details-location-hours">
              <h3>Location & Hours</h3>
              <div className="additional-details-p">
                {address}, {city}, {state}
              </div>
              <div className="additional-details-p">
                Hours: {open_hours} - {close_hours}
              </div>
            </div>
            <div className="business-details-about-shop">
              <h3>About the Shop</h3>
              <div className="additional-details-p">{description}</div>
            </div>
          </div>
          <BusinessReviews />
        </div>
      </div>
    </div>
  );
};
