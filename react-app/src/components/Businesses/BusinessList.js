import { useHistory } from "react-router";
import "./BusinessList.css";

const BusinessList = ({ business, index }) => {
  const history = useHistory();

  const {
    id,
    city,
    name,
    avg_rating,
    num_reviews,
    type,
    price,
    open_hours,
    close_hours,
    image_url,
  } = business;

  const handleClick = () => {
    history.push(`/businesses/${business.id}`);
  };

  return (
    <div className="business-list-container" key={id} onClick={handleClick}>
      <div className="business-list-sub-container">
        <div className="business-list-main-img">
          <img
            className="preview-img"
            src={image_url}
            alt={name}
            title={name}
            style={{ width: "220px", height: "220px" }}
          ></img>
        </div>

        <div className="business-list-details">
          <h2>
            {index + 1}. {name}
          </h2>

          <div>
            {avg_rating ? (
              <div className="business-list-overall-stars">
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
              <div className="business-list-overall-no-stars">
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

          <div className="business-list-type-price-city-container">
            <span className="business-list-span-type">{type}</span> ·{" "}
            {price === 3 ? "$$$" : price === 2 ? "$$" : "$"} · {city}
          </div>

          <div>
            Hours: {open_hours} - {close_hours}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessList;
