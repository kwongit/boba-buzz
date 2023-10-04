import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBusinesses } from "../../store/businesses";
import BusinessList from "./BusinessList";

export const Businesses = () => {
  const dispatch = useDispatch();

  const getBusinesses = useSelector((state) => state.businesses.allBusinesses);

  const businesses = Object.values(getBusinesses);

  useEffect(() => {
    dispatch(thunkGetBusinesses());
  }, [dispatch]);

  if (!businesses.length) return null;

  return (
    <>
      <h1>BobaBuzz</h1>
      <div className="business-details-container">
        <ol>
          {businesses.map((business) => (
            <li key={business.id}>
              <BusinessList business={business} />
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};
