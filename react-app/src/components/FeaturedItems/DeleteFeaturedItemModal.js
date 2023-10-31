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
    <div className="delete-modal-content">
      <div className="delete-menu_item-container">
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to remove this featured item?</p>
        <div className="yes-no-container">
          <button className="yes-button" type="button" onClick={handleClick}>
            Yes
          </button>
          <button className="no-button" type="button" onClick={closeModal}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};
