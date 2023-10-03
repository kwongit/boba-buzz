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
          ></img>
        </div>
        <div className="business-list-details">
          {name}
          {type}
          {price}
          {city}
          {open_hours}
          {close_hours}
        </div>
      </div>
    </div>
  );
};

export default BusinessList;
