import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminloginApi, WorkerloginApi } from '../services/allapi'; // Changed to login APIs

function LoginPage({ admin }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginData;

    if (!email || !password) {
      toast.info("Please fill all required fields");
      return;
    }

    try {
      let response;
      if (admin) {
        response = await AdminloginApi({ email, password });
      } else {
        response = await WorkerloginApi({ email, password });
      }

      if (response.status === 200) {
        toast.success("Login Successful");
        // Store token in localStorage
        localStorage.setItem("token", response.data.token);
        // Redirect to appropriate dashboard
        admin ? navigate("/admin-dashboard") : navigate("/worker-dashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    }
  };

  return (
    <div className="login bgd_a">
      <form onSubmit={handleLogin} className="login__form shadow">
        <h3 className="login__title" style={{ color: "#000080" }}>
          <b>{admin ? "Admin Login" : "Worker Login"}</b>
        </h3>
        <p style={{ textAlign: "center", marginBottom: '5px' }}>Sign in To Your Account</p>

        <div className="login__content">
          <div className="login__box">
            <FontAwesomeIcon icon={faEnvelope} className="login__icon" />
            <div className="login__box-input">
              <input
                type="email"
                required
                className="login__input"
                id="login-email"
                placeholder=" "
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              />
              <label htmlFor="login-email" className="login__label">
                Email
              </label>
            </div>
          </div>

          <div className="login__box">
            <FontAwesomeIcon icon={faLock} className="login__icon" />
            <div className="login__box-input">
              <input
                type="password"
                required
                className="login__input"
                id="login-pass"
                placeholder=" "
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              />
              <label htmlFor="login-pass" className="login__label">
                Password
              </label>
            </div>
          </div>
        </div>

        <div>
          <button className="login__button" type="submit">
            Login
          </button>
          
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <Link
              to={admin ? "/admin-reg" : "/reg-worker"}
              className="text-danger"
              style={{ textDecoration: "none" }}
            >
              Register here
            </Link>
          </p>

          <p className="text-center mt-2">
            <Link
              to="/forgot-password"
              className="text-danger"
              style={{ textDecoration: "none" }}
            >
              Forgot Password?
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </div>
  );
}

export default LoginPage;