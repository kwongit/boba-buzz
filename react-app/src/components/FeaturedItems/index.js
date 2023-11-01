import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetFeaturedItems } from "../../store/featuredItems";
import FeaturedItemsTile from "./FeaturedItemsTile";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeaturedItems.css";

// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";

export const FeaturedItems = ({ businessId }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

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
    <Slider className="featured-items-tile-container" {...settings}>
      {featuredItems.map((featuredItem) => (
        <FeaturedItemsTile key={featuredItem.id} featuredItem={featuredItem} />
      ))}
    </Slider>

    // <Carousel className="featured-items-tile-container">
    //   {featuredItems.map((featuredItem) => (
    //     <FeaturedItemsTile key={featuredItem.id} featuredItem={featuredItem} />
    //   ))}
    // </Carousel>
  );
};
