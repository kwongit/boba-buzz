import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { thunkGetBusinesses } from "../../store/businesses";
import BusinessList from "./BusinessList";
import { SearchBar } from "../SearchBar";
import "./LandingPage.css";

export const Businesses = () => {
  const [results, setResults] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  const getBusinesses = useSelector((state) => state.businesses.allBusinesses);

  const businesses = Object.values(getBusinesses);

  useEffect(() => {
    dispatch(thunkGetBusinesses());
  }, [dispatch]);

  if (!businesses.length) return null;

  const searchShop = (query) => {
    fetch(`/api/businesses/search?query=${query}`)
      .then((response) => response.json())
      .then((data) => {
        setResults(data);
      })
      .catch((error) => console.error(error));
  };

  const handleClick = (id) => {
    history.push(`/businesses/${id}`);
  };

  return (
    <div>
      <img
        className="landing-page-banner-img"
        src="https://sanfran.com/get/files/image/galleries/Best_Boba_SF.jpg"
        alt="landing-page-banner-img"
      ></img>
      <div className="landing-page-window">
        <h1>Discover, Manage & Buzz Your Next Boba Shop!</h1>
        <div>
          <SearchBar onSearch={searchShop} />
          <div className="results">
            {results.map((business) => (
              <div key={business.id}>
                <div onClick={() => handleClick(business.id)}>
                  {business.name} · {business.city}
                </div>
              </div>
            ))}
          </div>
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
