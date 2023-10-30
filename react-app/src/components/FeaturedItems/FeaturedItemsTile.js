import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import "./FeaturedItems.css";

const FeaturedItemsTile = ({ featuredItem, businessId }) => {
  const { id, name, image_url } = featuredItem;

  const businesses = useSelector((state) => state.businesses.singleBusiness);
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="">
      <div className="" key={id}>
        <img className="featured-item-image" src={image_url} alt={name}></img>
        <div className="featured-item-name">{name}</div>
      </div>
      {/* <div className="">
        {currentUser && businesses.owner_id === currentUser.id && (
          <OpenModalButton
            buttonText="Delete"
            // modalComponent={
            //   <DeleteFeaturedItemModal featuredItemId={featuredItem.id} />
            // }
          />
        )}
      </div> */}
    </div>
  );
};

export default FeaturedItemsTile;
