import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faIdCard } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminloginApi, WokerloginApi } from '../services/allapi';

function LoginPage({ admin }) {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    ...(!admin && { workerId: "" }) // Conditionally add workerId
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password, workerId } = loginData;

   /*  console.log(loginData); */
    

    // Validate required fields
    if (!email || !password || (!admin && !workerId)) {
      toast.info("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      const response = admin
        ? await AdminloginApi({ email, password })
        : await WokerloginApi(loginData); // Send all loginData including workerId

        console.log(response);

      if (response.status == 200) {
        toast.success("Login Successful");

        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userRole", admin ? response.data.adminUser.role : response.data.workerUser.role);



        const userData = {
          id: admin ? response.data.adminUser._id : response.data.workerUser._id,
          email: admin ? response.data.adminUser.email : response.data.workerUser.email,
          username: admin ? response.data.adminUser.username : response.data.workerUser.username,
          ...(admin ? {} : { workerId: response.data.workerUser.workerId })
        };
        sessionStorage.setItem("userData", JSON.stringify(userData));

        setLoginData({
          email: "",
          password: "",
          ...(!admin && { workerId: "" })
        })


        navigate(admin ? "/admin" : "/worker");

      }
    } catch (error) {
      const errorMessage = error.response?.data?.message
      toast.error(errorMessage);
    } finally {
      setLoading(false);
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

          {!admin && (
            <div className="login__box">
              <FontAwesomeIcon icon={faIdCard} className="login__icon" />
              <div className="login__box-input">
                <input
                  type="text"

                  className="login__input"
                  id="login-workerId"
                  placeholder=" "
                  value={loginData.workerId}
                  onChange={(e) => setLoginData({ ...loginData, workerId: e.target.value })}
                  autoComplete="off"
                />
                <label htmlFor="login-workerId" className="login__label">
                  Worker ID
                </label>
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="login__box">
            <FontAwesomeIcon icon={faEnvelope} className="login__icon" />
            <div className="login__box-input">
              <input
                type="email"

                className="login__input"
                id="login-email"
                placeholder=" "
                value={loginData.email}
                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                autoComplete="username"
              />
              <label htmlFor="login-email" className="login__label">
                Email
              </label>
            </div>
          </div>

          {/* Password Input */}
          <div className="login__box">
            <FontAwesomeIcon icon={faLock} className="login__icon" />
            <div className="login__box-input">
              <input
                type="password"

                className="login__input"
                id="login-pass"
                placeholder=" "
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                autoComplete="current-password"
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
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className='text-center'>Not a <Link style={{textDecoration:"none",color:'red'}} to={'/login-worker'}>admin</Link></p>

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

        
        </div>
      </form>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </div>
  );
}

export default LoginPage;