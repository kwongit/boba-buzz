import { useHistory } from "react-router";

const BusinessList = ({ business }) => {
  const { id, city, name, type, price, open_hours, close_hours, image_url } =
    business;

  const history = useHistory();

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
          <div>{type}</div>
          <div>{price === 3 ? "$$$" : price === 2 ? "$$" : "$"}</div>
          <div>{city}</div>
          <div>
            Hours: {open_hours} - {close_hours}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessList;
