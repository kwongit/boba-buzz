import React, { useState } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors([data[0].split(": ")[1]]);
    } else {
      closeModal();
    }
  };

  const handleDemoLogin = async (e) => {
    e.preventDefault();
    const demo_email = "demo@aa.io";
    const demo_password = "password";

    const data = await dispatch(login(demo_email, demo_password));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login-modal-window">
      <h2 className="login-modal-title">Log in to BobaBuzz</h2>
      <form onSubmit={handleSubmit}>
        <div className="on-submit-errors">{errors}</div>
        <div className="login-modal-email-password-container">
          <div className="login-modal-email-container">
            <input
              className="login-modal-email-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email"
            />
          </div>
          <div className="login-modal-password-container">
            <input
              className="login-modal-password-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Password"
            />
          </div>
        </div>
        <div className="login-modal-btn-container">
          <button className="login-modal-login-btn" type="submit">
            Log In
          </button>
          <button
            className="login-modal-demo-user-btn"
            onClick={handleDemoLogin}
          >
            Demo User
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginFormModal;
