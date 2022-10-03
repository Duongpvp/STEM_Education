// @ts-nocheck
import { logIn, signUp } from "actions/AuthAction";
import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../../assets/img/Logo_Education.png";
import "./Auth.css";

const Auth = () => {
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const { user } = useSelector((state) => state.AuthReducer);
  const loading = useSelector((state) => state.AuthReducer.loading);
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpassword
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      try {
        dispatch(logIn(data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      confirmpassword: "",
    });
  };

  return (
    <div className="Auth">
      <ToastContainer />
      <div className="Left-Info">
        <img src={Logo} alt="" />
      </div>
      <div className="area">
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <div className="From">
        <h4>{isSignUp ? "SIGN UP" : "LOGIN"}</h4>
        <form className="infoFrom" onSubmit={handleSubmit}>
          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <input
              type="email"
              placeholder="User Name (Ex:user@gmail.com)"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              className="infoInput"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          {isSignUp && (
            <div>
              <input
                type="password"
                placeholder="Confirm password"
                className="infoInput"
                name="confirmpassword"
                value={data.confirmpassword}
                onChange={handleChange}
              />
            </div>
          )}
          <span
            style={{
              display: confirmPass ? "none" : "block",
              letterSpacing: "0",
              color: "red",
              textTransform: "none",
              fontSize: "0.8rem",
            }}
          >
            * Confirm Password is not same *
          </span>
          <div>
            <button type="submit" className="btn SignUp-btn" disabled={loading}>
              {loading ? "Loading..." : isSignUp ? "SIGN UP" : "LOGIN"}
            </button>
          </div>
        </form>
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            setIsSignUp((prev) => !prev);
            resetForm();
          }}
        >
          {isSignUp ? "ALready have an account. Login" : "No Account . Sign Up"}
        </span>
        <hr />
        <span>Or login with</span>
        <div className="SocialIcons">
          <div className="FacebookIcon">
            <FaFacebookF />
          </div>
          <div className="InstagramIcon">
            <FaInstagram />
          </div>
          <div className="TwitterIcon">
            <FaTwitter />
          </div>
        </div>
        <span>Forgot password</span>
      </div>
    </div>
  );
};

export default Auth;
