import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/reviews";
import "./DeleteReviewModal.css";

export const DeleteReviewModal = ({ reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();

    return dispatch(thunkDeleteReview(reviewId)).then(closeModal);
  };

  return (
    <div className="delete-review-modal-window">
      <div className="delete-review-modal-container">
        <h2 className="delete-review-modal-title">Confirm Delete</h2>
        <p className="delete-review-modal-confirmation">
          Are you sure you want to delete this buzz?
        </p>
      </div>
      <div className="delete-review-modal-btn-container">
        <button className="delete-review-modal-yes-btn" onClick={handleClick}>
          Yes
        </button>
        <button className="delete-review-modal-no-btn" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};
