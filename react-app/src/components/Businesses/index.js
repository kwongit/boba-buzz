import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBusinesses } from "../../store/businesses";
import BusinessList from "./BusinessList";
import { SearchBar } from "../SearchBar";
import "./LandingPage.css";

export const Businesses = () => {
  const dispatch = useDispatch();

  const getBusinesses = useSelector((state) => state.businesses.allBusinesses);
  const businesses = Object.values(getBusinesses);

  useEffect(() => {
    dispatch(thunkGetBusinesses());
  }, [dispatch]);

  if (!businesses.length) return null;

  return (
    <div>
      <img
        className="landing-page-banner-img"
        src="https://sanfran.com/get/files/image/galleries/Best_Boba_SF.jpg"
        alt="landing-page-banner-img"
      ></img>
      <div className="landing-page-window">
        <h1>Discover, Manage & Buzz Your Next Boba Shop!</h1>
        <div className="landing-page-searchbar">
          <SearchBar data={businesses} />
        </div>
        <div className="landing-page-business-container">
          <ul className="landing-page-ul">
            {businesses.map((business, index) => (
              <li
                className="landing-page-business-list-container"
                key={business.id}
              >
                <BusinessList business={business} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
