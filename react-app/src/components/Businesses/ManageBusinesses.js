import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetUserBusinesses } from "../../store/businesses";
import BusinessList from "./BusinessList";
import { DeleteBusinessModal } from "./DeleteBusinessModal";
import OpenModalButton from "../OpenModalButton";
import "./ManageBusinesses.css";

export const ManageBusinesses = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const user = useSelector((state) => state.session.user);
  const businesses = useSelector((state) => state.businesses.allBusinesses);

  const businessesList = Object.values(businesses);

  useEffect(() => {
    dispatch(thunkGetUserBusinesses());
  }, [dispatch]);

  if (!user) return null;

  const handleClick = () => {
    history.push("/businesses/new");
  };

  const handleUpdateClick = (businessId) => {
    history.push(`/businesses/${businessId}/edit`);
  };

  return (
    <div>
      <img
        className="manage-business-banner-img"
        src="https://images.squarespace-cdn.com/content/v1/50ce46ece4b01020c34fd52b/1635443661260-5Y9P00ALIETP439JZ9CX/Boba+Guys+Los+Altos+storefront"
        alt="manage-business-banner-img"
      ></img>
      <div className="manage-businesses-container">
        <h1>Manage Your Shops</h1>
        <button className="manage-businesses-create-btn" onClick={handleClick}>
          Add a New Shop
        </button>
      </div>
      <div className="manage-businesses-list-container">
        <ul className="manage-business-page-ul">
          {businessesList.map((business, index) => (
            <li
              className="manage-business-business-list-container"
              key={business.id}
            >
              <BusinessList manage={true} business={business} index={index} />
              <div className="manage-businesses-btn-container">
                <button
                  className="manage-businesses-update-btn"
                  onClick={() => handleUpdateClick(business.id)}
                >
                  Update
                </button>
                <OpenModalButton
                  className="manage-businesses-delete-btn"
                  buttonText="Delete"
                  modalComponent={
                    <DeleteBusinessModal businessId={business.id} />
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
