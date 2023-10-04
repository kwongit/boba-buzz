import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkGetUserBusinesses } from "../../store/businesses";
import BusinessList from "./BusinessList";
import { DeleteBusinessModal } from "./DeleteBusinessModal";
import OpenModalButton from "../OpenModalButton";

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
      <div className="manage-businesses-container">
        <h1>Manage Businesses</h1>
        {businessesList && businessesList.length <= 0 ? (
          <button
            className="manage-businesses-create-btn"
            onClick={handleClick}
          >
            Create a New Business
          </button>
        ) : (
          ""
        )}
      </div>
      <div className="manage-businesses-list-container">
        {businessesList.map((business) => (
          <div key={business.id}>
            <BusinessList manage={true} business={business} />
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
          </div>
        ))}
      </div>
    </div>
  );
};
