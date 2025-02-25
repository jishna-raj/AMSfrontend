import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { registerApi } from '../services/allapi';





function LoginPage({admin}) {

  const navigate = useNavigate();
  const [adminRegister, setAdminRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  console.log(adminRegister);

  const handleRegister = async (e) => {
    e.preventDefault();
    const { firstname, email, password } = adminRegister;
    if (!firstname || !email || !password) {
      toast.info("please fill the details completely");
    } else {
      const result = await registerApi(adminRegister);
      console.log(result);
      if (result.status === 200) {
        toast.success("Registration Successful");
        admin ? navigate("admin-log") : navigate("login-worker");
        setAdminRegister({
          username: "",
          email: "",
          password: "",
        });
      } else {
        toast.error("something went wrong");
        setAdminRegister({
          username: "",
          email: "",
          password: "",
        });
      }
    }
  };

  return (
    <>
        <div className="login bgd_a" style={{backgroundImage:"url(https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvdjk2MC1uaW5nLTMwLmpwZw.jpg",backgroundPosition:'center top'}}>
      <form action="" className="login__form shadow">
        <h3 className="login__title" style={{ color: "#000080" }}>
        <b>{admin ? "Admin!" : "Worker!"}</b>
        </h3>
        <p style={{ textAlign: "center" }}>Sign in To Your Account</p>

        <div className="login__content">
          <div className="login__box">
            <FontAwesomeIcon icon={faUser} className="login__icon" />

            <div className="login__box-input">
              <input
                type="text"
                required
                className="login__input"
                id="login-name"
                placeholder=" "
                value={adminRegister.username}
                onChange={(e) =>
                  setAdminRegister({ ...adminRegister, username: e.target.value })
                }
              />
              <label htmlFor="login-email" className="login__label">
                username
              </label>
            </div>
          </div>
          <div className="login__box">
            <FontAwesomeIcon icon={faEnvelope} className="login__icon" />

            <div className="login__box-input">
              <input
                type="email"
                required
                className="login__input"
                id="login-email"
                placeholder=" "
                value={adminRegister.email}
                onChange={(e) =>
                  setAdminRegister({ ...adminRegister, email: e.target.value })
                }
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
                value={adminRegister.password}
                onChange={(e) =>
                  setAdminRegister({ ...adminRegister, password: e.target.value })
                }
              />
              <label htmlFor="login-pass" className="login__label">
                Password
              </label>
            </div>
          </div>
        </div>
        <div>
          <button
            className="login__button"
            type="button"
            onClick={handleRegister}
          >
            Register
          </button>
          {admin ? (
            <p className="pt-1 text-center">
              Not a{" "}
              <Link
                to={"/reg-worker"}
                className="text-danger"
                style={{ textDecoration: "none" }}
              >
                Admin?
              </Link>
            </p>
          ) : (
            <p className="pt-1 text-center">
              Not a{" "}
              <Link
                to={"/admin-reg"}
                className="text-danger"
                style={{ textDecoration: "none" }}
              >
                Worker?
              </Link>
            </p>
          )}
          <p className="pt-3 text-center">
            Already a User? Click here to{" "}
            <Link
              to={"/user-login"}
              className="text-danger"
              style={{ textDecoration: "none" }}
            >
              Login
            </Link>
          </p>
        </div>
      </form>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </div>
    
    
    </>
  )
}

export default LoginPage

