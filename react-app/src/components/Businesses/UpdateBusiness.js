import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { thunkUpdateBusiness } from "../../store/businesses";

export const UpdateBusiness = ({ business }) => {
  const [address, setAddress] = useState(business?.address);
  const [city, setCity] = useState(business?.city);
  const [state, setState] = useState(business?.state);
  const [name, setName] = useState(business?.name);
  const [type, setType] = useState(business?.type);
  const [price, setPrice] = useState(business?.price);
  const [open_hours, setOpenHours] = useState(business?.open_hours);
  const [close_hours, setCloseHours] = useState(business?.close_hours);
  const [image_url, setImageUrl] = useState(business?.image_url);
  const [description, setDescription] = useState(business?.description);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const dispatch = useDispatch();

  if (!business) {
    history.push("/");
  }

  useEffect(() => {
    setAddress(business.address);
    setCity(business.city);
    setState(business.state);
    setName(business.name);
    setType(business.type);
    setPrice(business.price);
    setOpenHours(business.open_hours);
    setCloseHours(business.close_hours);
    setImageUrl(business.image_url);
    setDescription(business.description);
  }, [dispatch, business]);

  useEffect(() => {
    const errors = {};

    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!state) errors.state = "State is required";
    if (!name) errors.name = "Name is required";
    if (name.length < 2) errors.name = "Name must be more than 1 character";
    if (!type) errors.type = "Type is required";
    if (!price || price < 1) errors.price = "Price is required";
    if (!open_hours) errors.open_hours = "Open hours is required";
    if (!close_hours) errors.close_hours = "Close hours is required";
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

    const updatedBusiness = {
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
      const updateBusiness = await dispatch(
        thunkUpdateBusiness(updatedBusiness, business.id)
      );

      const combinedErrors = { ...errors, Errors: updateBusiness.errors };

      if (updateBusiness.errors) {
        setErrors(combinedErrors);
      } else {
        // history.push(`/businesses/${business.id}`);
        history.push(`/businesses/current`);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <h1>Update Your Shop</h1>

        <div className="">
          <label>Shop Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Shop Name"
          />
          {errors.name && submitted && (
            <p className="on-submit-errors">{errors.name}</p>
          )}
        </div>

        <div className="">
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
          />
          {errors.address && submitted && (
            <p className="on-submit-errors">{errors.address}</p>
          )}
        </div>

        <div className="">
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
          {errors.city && submitted && (
            <p className="on-submit-errors">{errors.city}</p>
          )}
        </div>

        <div className="">
          <label>State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="State"
          />
          {errors.state && submitted && (
            <p className="on-submit-errors">{errors.state}</p>
          )}
        </div>

        <div className="">
          <label>Shop Type</label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            placeholder="Shop Type"
          />
          {errors.type && submitted && (
            <p className="on-submit-errors">{errors.type}</p>
          )}
        </div>

        <div className="">
          <label>Shop Price Range</label>
          <select onChange={(e) => setPrice(e.target.value)}>
            <option value="0">Select Price Range</option>
            <option value="1">$</option>
            <option value="2">$$</option>
            <option value="3">$$$</option>
          </select>
          {errors.price && submitted && (
            <p className="on-submit-errors">{errors.price}</p>
          )}
        </div>

        <div className="">
          <label>Shop Open Hours</label>
          <select onChange={(e) => setOpenHours(e.target.value)}>
            <option value="0">Select Open Hours</option>
            <option value="10:00 AM">10:00 AM</option>
            <option value="10:30 AM">10:30 AM</option>
            <option value="11:00 AM">11:00 AM</option>
            <option value="11:30 AM">11:30 AM</option>
            <option value="12:00 PM">12:00 PM</option>
            <option value="12:30 PM">12:30 PM</option>
          </select>
          {errors.open_hours && submitted && (
            <p className="on-submit-errors">{errors.open_hours}</p>
          )}
        </div>

        <div className="">
          <label>Shop Close Hours</label>
          <select onChange={(e) => setCloseHours(e.target.value)}>
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
          {errors.close_hours && submitted && (
            <p className="on-submit-errors">{errors.close_hours}</p>
          )}
        </div>

        <div className="">
          <label>Shop Main Image</label>
          <input
            type="url"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Main Image URL"
          />
          {errors.image_url && submitted && (
            <p className="on-submit-errors">{errors.image_url}</p>
          )}
        </div>

        <div className="">
          <label>Shop Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Shop Description"
          />
          {errors.description && submitted && (
            <p className="on-submit-errors">{errors.description}</p>
          )}
        </div>

        <div className="">
          <button
            className=""
            type="submit"
            // disabled={
            //   !(
            //     address ||
            //     city ||
            //     state ||
            //     name ||
            //     type ||
            //     price ||
            //     open_hours ||
            //     close_hours ||
            //     image_url ||
            //     description
            //   )
            // }
          >
            Update Shop
          </button>
        </div>
      </form>
    </div>
  );
};
