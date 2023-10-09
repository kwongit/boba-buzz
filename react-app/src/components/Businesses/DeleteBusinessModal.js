import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteBusiness } from "../../store/businesses";
import "./DeleteBusinessModal.css";

export const DeleteBusinessModal = ({ businessId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();

    return dispatch(thunkDeleteBusiness(businessId)).then(closeModal);
  };

  return (
    <div className="delete-business-modal-window">
      <div className="delete-business-modal-container">
        <h2 className="delete-business-modal-title">Confirm Delete</h2>
        <p className="delete-business-modal-confirmation">
          Are you sure you want to remove this shop?
        </p>
        <div className="delete-business-modal-btn-container">
          <button
            className="delete-business-modal-yes-btn"
            type="button"
            onClick={handleClick}
          >
            Yes
          </button>
          <button
            className="delete-business-modal-no-btn"
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
