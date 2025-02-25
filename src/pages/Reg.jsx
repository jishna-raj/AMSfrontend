import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import "./Login.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reg() {
  return (
   <>
    <div className="login bgd_a">
      <form action="" className="login__form shadow">
        <h3 className="login__title" style={{ color: "#000080" }}>
          <b>Admin!  Worker!</b>
        </h3>
        <p style={{ textAlign: "center" }}>Sign up To Your Account</p>

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
                
              />
              <label htmlFor="login-email" className="login__label">
                Firstname
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
            
          >
            Register
          </button>
          
            <p className="pt-1 text-center">
              Not a{" "}
              
               
              
                Admin?
              
            </p>
        
            <p className="pt-1 text-center">
              Not a{" "}
             
                Worker?
             
            </p>
        
          <p className="pt-3 text-center">
            Already a User? Click here to{" "}

              Login
           
          </p>
        </div>
      </form>
      <ToastContainer autoClose={2000} theme="colored" position="top-center" />
    </div>
   </>
  )
}

export default Reg