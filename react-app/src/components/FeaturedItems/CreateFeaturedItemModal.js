import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { thunkCreateFeaturedItem } from "../../store/featuredItems";

export const CreateFeaturedItemModal = ({ user, businessId }) => {
  const [name, setName] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!name || name.length < 2)
      errors.name = "Name needs to be 2 or more characters";
    if (!image_url) errors.image_url = "Preview image is required";

    setErrors(errors);
  }, [dispatch, name, image_url]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image_url", image_url);

    if (!Object.values(errors).length) {
      const addFeaturedItem = await dispatch(
        thunkCreateFeaturedItem(formData, businessId)
      );

      const combinedErrors = { ...errors, Errors: addFeaturedItem.errors };

      if (addFeaturedItem.errors) {
        setErrors(combinedErrors);
      } else {
        closeModal();
        // history.push(`/businesses/${businessId}`);
      }
    }
  };

  return (
    <div className="create-featured-item-modal-content">
      <div className="create-featured-item-container">
        <h3>Add a Featured Item</h3>

        <form onSubmit={handleSubmit} id="create-form-container">
          <div className="name-container">
            <div className="name-container create-label-container">
              <label>Item Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Item Name"
                required={true}
              />
              {errors.name && submitted && (
                <p className="on-submit-errors">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="images-container ">
            <p>Upload a photo to feature the item</p>
            <div className="image-url-container">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageUrl(e.target.files[0])}
                required={true}
              />
              {errors.image_url && submitted && (
                <p className="on-submit-errors">{errors.image_url}</p>
              )}
            </div>
          </div>

          <div className="item-button-container">
            <button className="create-menu-item-button" type="submit">
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
