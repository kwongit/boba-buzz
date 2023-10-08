import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBusinesses } from "../../store/businesses";
import BusinessList from "./BusinessList";
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
    <div className="landing-page-window">
      <h1>BobaBuzz</h1>
      <div className="landing-page-business-container">
        <ul className="landing-page-ul">
          {businesses.map((business, index) => (
            <li key={business.id}>
              <BusinessList business={business} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
