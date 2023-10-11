import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkCreateBusiness } from "../../store/businesses";
import "./CreateBusiness.css";

export const CreateBusiness = ({ user }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [open_hours, setOpenHours] = useState("");
  const [close_hours, setCloseHours] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const errors = {};

    if (!name) errors.name = "Name is required";
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!type) errors.type = "Type is required";
    if (!price || price < 1) errors.price = "Price is required";
    if (!open_hours || open_hours < 1)
      errors.open_hours = "Open hours is required";
    if (!close_hours || close_hours < 1)
      errors.close_hours = "Close hours is required";
    if (!image_url) errors.image_url = "Preview image is required";
    if (
      image_url &&
      !image_url.endsWith("jpg") &&
      !image_url.endsWith("jpeg") &&
      !image_url.endsWith("png")
    )
      errors.image_url = "Image URL must end in .png, .jpg, or .jpeg";
    if (!description) errors.description = "Description is required";

    setErrors(errors);
  }, [
    address,
    city,
    state,
    name,
    type,
    price,
    open_hours,
    close_hours,
    image_url,
    description,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setSubmitted(true);

    const newBusiness = {
      address,
      city,
      state,
      name,
      type,
      price,
      open_hours,
      close_hours,
      image_url,
      description,
    };

    if (!Object.values(errors).length) {
      const addBusiness = await dispatch(
        thunkCreateBusiness(newBusiness, user)
      );

      const combinedErrors = { ...errors, Errors: addBusiness.errors };

      if (addBusiness.errors) {
        setErrors(combinedErrors);
      } else {
        history.push(`/businesses/${addBusiness.id}`);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <img
        className="create-business-banner-img"
        src="https://images.squarespace-cdn.com/content/v1/50ce46ece4b01020c34fd52b/12b658bb-b357-41bd-be32-8d486005bdb9/IMG_4587+Edited.jpeg"
        alt="create-business-banner-img"
      ></img>
      <div className="create-business-container">
        <h1 className="create-business-title">Add Your Shop</h1>
        <form className="create-business-form-window" onSubmit={handleSubmit}>
          <div className="create-business-form-container">
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">Shop Name</h4>
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
                placeholder="Shop Name"
              />
            </div>
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">Address</h4>
                {errors.address && submitted && (
                  <p className="on-submit-errors-create-business">
                    {errors.address}
                  </p>
                )}
              </div>
              <input
                className="create-business-form-input-field"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
              />
            </div>
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">City</h4>
                {errors.city && submitted && (
                  <p className="on-submit-errors-create-business">
                    {errors.city}
                  </p>
                )}
              </div>
              <input
                className="create-business-form-input-field"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">State</h4>
                {errors.state && submitted && (
                  <p className="on-submit-errors-create-business">
                    {errors.state}
                  </p>
                )}
              </div>
              <input
                className="create-business-form-input-field"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="State"
              />
            </div>
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">Type</h4>
                {errors.type && submitted && (
                  <p className="on-submit-errors-create-business">
                    {errors.type}
                  </p>
                )}
              </div>
              <input
                className="create-business-form-input-field"
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="Type"
              />
            </div>
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">Price Range</h4>
                {errors.price && submitted && (
                  <p className="on-submit-errors-create-business">
                    {errors.price}
                  </p>
                )}
              </div>
              <select
                className="create-business-form-input-field"
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="0">Select Price Range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
              </select>
            </div>
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">Open Hours</h4>
                {errors.open_hours && submitted && (
                  <p className="on-submit-errors-create-business">
                    {errors.open_hours}
                  </p>
                )}
              </div>
              <select
                className="create-business-form-input-field"
                onChange={(e) => setOpenHours(e.target.value)}
              >
                <option value="0">Select Open Hours</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="10:30 AM">10:30 AM</option>
                <option value="11:00 AM">11:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="12:00 PM">12:00 PM</option>
                <option value="12:30 PM">12:30 PM</option>
              </select>
            </div>
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">Close Hours</h4>
                {errors.close_hours && submitted && (
                  <p className="on-submit-errors-create-business">
                    {errors.close_hours}
                  </p>
                )}
              </div>
              <select
                className="create-business-form-input-field"
                onChange={(e) => setCloseHours(e.target.value)}
              >
                <option value="0">Select Close Hours</option>
                <option value="1:00 PM">1:00 PM</option>
                <option value="1:30 PM">1:30 PM</option>
                <option value="2:00 PM">2:00 PM</option>
                <option value="2:30 PM">2:30 PM</option>
                <option value="3:00 PM">3:00 PM</option>
                <option value="3:30 PM">3:30 PM</option>
                <option value="4:00 PM">4:00 PM</option>
                <option value="4:30 PM">4:30 PM</option>
                <option value="5:00 PM">5:00 PM</option>
                <option value="5:30 PM">5:30 PM</option>
                <option value="6:00 PM">6:00 PM</option>
                <option value="6:30 PM">6:30 PM</option>
                <option value="7:00 PM">7:00 PM</option>
                <option value="7:30 PM">7:30 PM</option>
                <option value="8:00 PM">8:00 PM</option>
                <option value="8:30 PM">8:30 PM</option>
                <option value="9:00 PM">9:00 PM</option>
                <option value="9:30 PM">9:30 PM</option>
                <option value="10:00 PM">10:00 PM</option>
                <option value="10:30 PM">10:30 PM</option>
                <option value="11:00 PM">11:00 PM</option>
                <option value="11:30 PM">11:30 PM</option>
                <option value="12:00 AM">12:00 AM</option>
              </select>
            </div>
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">Main Image</h4>
                {errors.image_url && submitted && (
                  <p className="on-submit-errors-create-business">
                    {errors.image_url}
                  </p>
                )}
              </div>
              <input
                className="create-business-form-input-field"
                type="url"
                value={image_url}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Main Image URL"
              />
            </div>
            <div className="create-business-form-input-container">
              <div className="create-business-form-label-container">
                <h4 className="create-business-form-label">Description</h4>
                {errors.description && submitted && (
                  <p className="on-submit-errors-create-business">
                    {errors.description}
                  </p>
                )}
              </div>
              <textarea
                className="create-business-form-textarea-field"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              ></textarea>
            </div>
          </div>
          <div className="create-business-btn-container">
            <button className="create-business-add-shop-btn" type="submit">
              Add Shop
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
