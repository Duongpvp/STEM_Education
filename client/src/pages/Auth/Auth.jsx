// @ts-nocheck
import { logIn, loginOutsideUser, signUp } from "actions/AuthAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import facebookIcon from "../../assets/img/facebook.png";
import githubIcon from "../../assets/img/github.png";
import googleIcon from "../../assets/img/google.png";
import Logo from "../../assets/img/Logo_Education.png";
import "./Auth.css";

const Auth = () => {
  const serverURL = process.env.REACT_APP_URL_SERVER_LOCAL;
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const [outsideUser, setOutsideUser] = useState(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpassword
        ? dispatch(signUp(data, resetForm()))
        : setConfirmPass(false);
    } else {
      try {
        dispatch(logIn(data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const [fetchAgain, setFetchAgain] = useState(false);

  const google = () => {
    window.open(serverURL + "auth/google", "_self");
  };

  const github = () => {
    window.open(serverURL + "auth/github", "_self");
  };

  const facebook = () => {
    window.open(serverURL + "auth/facebook", "_self");
  };

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setOutsideUser(resObject.user);
          setFetchAgain(!fetchAgain);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  useEffect(() => {
    try {
      // const data = new FormData();
      // data.append("name", Date.now() + outsideUser.photos[0].value);
      // console.log(Date.now() + outsideUser.photos[0].value);
      // data.append("file", outsideUser.photos[0].value);
      // dispatch(uploadImage(data));
      // eslint-disable-next-line no-undef
      console.log(outsideUser);
      if (outsideUser) {
        if (outsideUser.provider === "google") {
          dispatch(
            loginOutsideUser(
              outsideUser.id,
              "",
              outsideUser.name.givenName,
              outsideUser.photos[0].value
            )
          );
        } else {
          if (outsideUser.provider === "github") {
            dispatch(
              loginOutsideUser(
                outsideUser.id,
                "",
                outsideUser.displayName,
                outsideUser.photos[0].value
              )
            );
          } else {
            // Facebook
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [fetchAgain]);

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
        <img src={Logo} alt="" />
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
          <div className="TwitterIcon" onClick={google}>
            <img src={googleIcon} alt="" />
          </div>
          <div className="FacebookIcon" onClick={facebook}>
            <img src={facebookIcon} alt="" />
          </div>
          <div className="InstagramIcon" onClick={github}>
            <img src={githubIcon} alt="" />
          </div>
        </div>
        <span>Forgot password</span>
      </div>
    </div>
  );
};

export default Auth;
