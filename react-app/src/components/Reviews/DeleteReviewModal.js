import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkDeleteReview } from "../../store/reviews";

export const DeleteReviewModal = ({ reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleClick = (e) => {
    e.preventDefault();

    return dispatch(thunkDeleteReview(reviewId)).then(closeModal);
  };

  return (
    <div className="">
      <div className="">
        <h2 className="">Confirm Delete</h2>
        <p className="">Are you sure you want to delete this buzz?</p>
      </div>
      <div className="">
        <button className="" onClick={handleClick}>
          Yes
        </button>
        <button className="" onClick={closeModal}>
          No
        </button>
      </div>
    </div>
  );
};
