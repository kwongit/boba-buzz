import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteFeaturedItem } from "../../store/featuredItems";

export const DeleteFeaturedItemModal = ({ featuredItemId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();

    return dispatch(thunkDeleteFeaturedItem(featuredItemId)).then(closeModal);
  };

  return (
    <div className="delete-featured-item-modal-window">
      <div className="delete-featured-item-modal-container">
        <h2 className="delete-featured-item-modal-title">Confirm Delete</h2>
        <p className="delete-featured-item-modal-confirmation">
          Are you sure you want to remove this item?
        </p>
        <div className="delete-featured-item-modal-btn-container">
          <button
            className="delete-featured-item-modal-yes-btn"
            type="button"
            onClick={handleClick}
          >
            Yes
          </button>
          <button
            className="delete-featured-item-modal-no-btn"
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
