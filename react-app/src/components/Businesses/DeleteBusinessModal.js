import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteBusiness } from "../../store/businesses";

export const DeleteBusinessModal = ({ businessId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();

    return dispatch(thunkDeleteBusiness(businessId)).then(closeModal);
  };

  return (
    <div className="delete-business-modal-container">
      <div className="delete-business-modal-content">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to remove this shop?</p>
        <div className="delete-business-modal-btn-container">
          <button
            className="delete-business-yes-btn"
            type="button"
            onClick={handleClick}
          >
            Yes
          </button>
          <button
            className="delete-business-no-btn"
            type="button"
            onClick={closeModal}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
