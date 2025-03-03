import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faUser, faIdBadge } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from 'react-router-dom';
import { AdminregisterApi, WorkerregisterApi } from '../services/allapi';


function Reg({ admin }) {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    workerId: "", 
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const { username, email, password, workerId } = formData;
    console.log(formData);
    

    if (admin && (email !== 'admin@gmail.com' || password !== 'admin123')) {
      toast.error('Admin registration requires email: admin@gmail.com and password: admin123');
      return;
    }

    if (!username || !email || !password || (!admin && !workerId)) {
      toast.info("Please fill the details completely");
      return;
    }

    try {
      let response;
      const baseData = { username, email, password };

      if (admin) {
        response = await AdminregisterApi(baseData);
      } else {
        response = await WorkerregisterApi({ ...baseData, workerId });
      }

      if (response?.status === 200) {
        toast.success("Registration Successful");
        
        // Corrected navigation paths
        admin ? navigate("/admin-log") : navigate("/login-worker");
        
        // Reset form after successful registration
        setFormData({
          username: "",
          email: "",
          password: "",
          workerId: "",
        });
      } 
      
      else {
        toast.error(response?.data?.message || "User already exist");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="login bgd_a">
        <form action="" onSubmit={handleRegister} className="login__form shadow">
          <h3 className="login__title" style={{ color: "#000080" }}>
            <b>{admin ? "Admin!" : "Worker!"}</b>
          </h3>
          <p style={{ textAlign: "center" }}>Sign up To Your Account</p>

          <div className="login__content">
            <div className="login__box">
              <FontAwesomeIcon icon={faUser} className="login__icon" />
              <div className="login__box-input">
                <input
                  type="text"
                  
                  className="login__input"
                  id="login-name"
                  placeholder=" "
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
                <label htmlFor="login-name" className="login__label">
                  Username
                </label>
              </div>
            </div>

            <div className="login__box">
              <FontAwesomeIcon icon={faEnvelope} className="login__icon" />
              <div className="login__box-input">
                <input
                  type="email"
                  
                  className="login__input"
                  id="login-email"
                  placeholder=" "
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
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
                  
                  className="login__input"
                  id="login-pass"
                  placeholder=" "
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <label htmlFor="login-pass" className="login__label">
                  Password
                </label>
              </div>
            </div>

            {/* Conditionally render Worker ID input if not admin */}
            {!admin && (
              <div className="login__box">
                <FontAwesomeIcon icon={faIdBadge} className="login__icon" />
                <div className="login__box-input">
                  <input
                    type="text"
                    
                    className="login__input"
                    id="login-workerId"
                    placeholder=" "
                    value={formData.workerId}
                    onChange={(e) =>
                      setFormData({ ...formData, workerId: e.target.value })
                    }
                  />
                  <label htmlFor="login-workerId" className="login__label">
                    Worker ID
                  </label>
                </div>
              </div>
            )}
          </div>

          <div>
            <button
              className="login__button"
              type="submit"
              
            >
              Register
            </button>
            <p className="pt-1 text-center">
              Not a{" "}
              <Link
                to={admin ? "/reg-worker" : "/admin-reg"}
                className="text-danger"
                style={{ textDecoration: "none" }}
              >
                {admin ? "Admin?" : "Worker?"}
              </Link>
            </p>
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
  );
}

export default Reg;