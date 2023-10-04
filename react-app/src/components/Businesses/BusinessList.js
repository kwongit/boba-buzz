import { useHistory } from "react-router";

const BusinessList = ({ business }) => {
  const {
    id,
    owner_id,
    address,
    city,
    state,
    name,
    type,
    price,
    open_hours,
    close_hours,
    image_url,
    description,
  } = business;

  const history = useHistory();

  const handleClick = () => {
    history.push(`/businesss/${business.id}`);
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
          <div>Price: {price}</div>
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
