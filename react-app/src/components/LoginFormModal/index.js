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
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        {errors}
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Password"
          />
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
    </>
  );
}

export default LoginFormModal;
