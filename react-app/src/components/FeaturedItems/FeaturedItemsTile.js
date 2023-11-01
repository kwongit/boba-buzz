import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import OpenModalButton from "../OpenModalButton";
import { DeleteFeaturedItemModal } from "./DeleteFeaturedItemModal";
import "./FeaturedItems.css";

const FeaturedItemsTile = ({ featuredItem }) => {
  const { id, name, image_url } = featuredItem;

  const history = useHistory();

  const businesses = useSelector((state) => state.businesses.singleBusiness);
  const currentUser = useSelector((state) => state.session.user);

  const handleClick = () => {
    history.push(`/featuredItems/${featuredItem.id}/edit`);
  };

  return (
    <div className="">
      <div className="" key={id}>
        <img className="featured-item-image" src={image_url} alt={name}></img>
        <div className="featured-item-name">{name}</div>
      </div>
      <div className="">
        {currentUser && businesses.owner_id === currentUser.id && (
          <div className="featured-items-btn-container">
            <button
              className="update-featured-item-button"
              onClick={handleClick}
            >
              Update
            </button>
            <OpenModalButton
              buttonText="Delete"
              modalComponent={
                <DeleteFeaturedItemModal featuredItemId={featuredItem.id} />
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedItemsTile;
