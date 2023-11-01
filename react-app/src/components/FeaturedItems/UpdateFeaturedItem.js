import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkUpdateFeaturedItem } from "../../store/featuredItems";

export const UpdateFeaturedItem = ({ featuredItem }) => {
  const [name, setName] = useState(featuredItem?.name);
  const [image_url, setImageUrl] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  const oneBusiness = useSelector((state) => state.businesses.singleBusiness);

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

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImageUrl(selectedImage);
  };

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
      <img
        className="create-business-banner-img"
        src="https://spotthefood.files.wordpress.com/2015/08/03012-img_7638.jpg"
        alt="create-business-banner-img"
      ></img>
      <div className="create-business-container">
        <h1 className="create-business-title">{oneBusiness.name}</h1>
        <h3 className="create-business-title">Update Featured Item</h3>
        <form
          className="create-business-form-window"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="create-business-form-container">
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">Item Name</h4>
                {errors.name && submitted && (
                  <p className="on-submit-errors-create-business">
                    {errors.name}
                  </p>
                )}
              </div>
              <input
                className="create-business-form-input-field"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Item Name"
                required={true}
              />
            </div>
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">Item Image</h4>
                {errors.image_url && submitted && (
                  <p className="on-submit-errors-create-business">
                    {errors.image_url}
                  </p>
                )}
              </div>
              <input
                className="create-business-form-input-field"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required={true}
              />
            </div>
          </div>
          <div className="create-business-btn-container">
            <button className="create-business-add-shop-btn" type="submit">
              Update Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
