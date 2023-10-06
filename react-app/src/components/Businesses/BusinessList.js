import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

const BusinessList = ({ business }) => {
  // const dispatch = useDispatch();
  const history = useHistory();

  const {
    id,
    city,
    name,
    avg_rating,
    num_reviews,
    type,
    price,
    close_hours,
    image_url,
  } = business;

  // const reviews = useSelector((state) => state.reviews.allReviews);
  // const reviewsList = Object.values(reviews);

  const handleClick = () => {
    history.push(`/businesses/${business.id}`);
  };

  return (
    <div
      className="business-list-main-container"
      key={id}
      onClick={handleClick}
    >
      <div className="business-list-sub-container">
        <div className="business-list-image">
          <img
            className="preview-image"
            src={image_url}
            alt={name}
            title={name}
            style={{ width: "220px", height: "220px" }}
          ></img>
        </div>
        <div className="business-list-details">
          <div>{name}</div>
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
            {type} · {price === 3 ? "$$$" : price === 2 ? "$$" : "$"} · {city}
          </div>
          <div>
            <strong style={{ fontWeight: "bold" }}>Open</strong> until{" "}
            {close_hours}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessList;
