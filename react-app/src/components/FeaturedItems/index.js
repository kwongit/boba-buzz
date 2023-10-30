import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetFeaturedItems } from "../../store/featuredItems";
import FeaturedItemsTile from "./FeaturedItemsTile";
import "./FeaturedItems.css";

export const FeaturedItems = ({ businessId }) => {
  const dispatch = useDispatch();

  const getFeaturedItems = useSelector(
    (state) => state.featuredItems.allFeaturedItems
  );
  const featuredItems = Object.values(getFeaturedItems);

  useEffect(() => {
    dispatch(thunkGetFeaturedItems(businessId));
  }, [dispatch, businessId]);

  if (!featuredItems.length) return null;

  return (
    <>
      <div className="featured-items-tile-container">
        {featuredItems.map((featuredItem) => (
          <FeaturedItemsTile
            key={featuredItem.id}
            featuredItem={featuredItem}
          />
        ))}
      </div>
    </>
  );
};
