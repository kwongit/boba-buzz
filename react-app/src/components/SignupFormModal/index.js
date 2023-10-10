import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6 || confirmPassword.length < 6) {
      setErrors(["Password must be at least 6 characters in length."]);
    }
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        const formattedErrors = data.map((error) =>
          error.replace(/(username|email)\s*:\s*/, "")
        );
        setErrors(formattedErrors);
      } else {
        closeModal();
      }
    } else {
      setErrors(["Password and Confirm Password fields do not match."]);
    }
  };

  return (
    <div className="signup-modal-window">
      <h2 className="signup-modal-title">Sign Up for BobaBuzz</h2>
      <form onSubmit={handleSubmit}>
        <ul className="signup-modal-errors">
          {errors.map((error, idx) => (
            <li className="on-submit-errors-signup" key={idx}>
              {error}
            </li>
          ))}
        </ul>
        <div className="signup-modal-form-fields-container">
          <div className="signup-modal-email-container">
            <input
              className="signup-modal-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="signup-modal-username-container">
            <input
              className="signup-modal-username-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Username"
            />
          </div>
          <div className="signup-modal-password-container">
            <input
              className="signup-modal-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
          <div className="signup-modal-confirm-password-container">
            <input
              className="signup-modal-confirm-password-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className="signup-modal-btn-container">
          <button className="signup-modal-signup-btn" type="submit">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignupFormModal;
