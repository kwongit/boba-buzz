import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkUpdateFeaturedItem } from "../../store/featuredItems";

export const UpdateFeaturedItem = ({ featuredItem }) => {
  const [name, setName] = useState(featuredItem?.name);
  const [image_url, setImageUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  if (!featuredItem) {
    history.push("/");
  }

  useEffect(() => {
    setName(featuredItem.name);
  }, [dispatch, featuredItem]);

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
      const updateFeaturedItem = await dispatch(
        thunkUpdateFeaturedItem(formData, featuredItem.id)
      );

      const combinedErrors = { ...errors, Errors: updateFeaturedItem.errors };

      if (updateFeaturedItem.errors) {
        setErrors(combinedErrors);
      } else {
        history.goBack();
      }
    }
  };

  return (
    <div className="create-featured-item-modal-content">
      <div className="create-featured-item-container">
        <h3>Update Featured Item</h3>

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
            <p>Item Photo</p>
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
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
