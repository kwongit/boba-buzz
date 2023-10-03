import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkGetBusinesses } from "../../store/businesses";
import BusinessList from "./BusinessList";

export const Businesses = () => {
  const dispatch = useDispatch();

  const getBusinesses = useSelector((state) => state.business.allBusinesses);

  const businesses = Object.values(getBusinesses);

  useEffect(() => {
    dispatch(thunkGetBusinesses());
  }, [dispatch]);

  if (!businesses.length) return null;

  return (
    <>
      <div className="business-details-container">
        {businesses.map((business) => (
          <BusinessList key={business.id} business={business} />
        ))}
      </div>
    </>
  );
};
