// @ts-nocheck
import {
  forgotPassword,
  logIn,
  loginOutsideUser,
  resetPassword,
  signUp,
  verifySender,
} from "actions/AuthAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import facebookIcon from "../../assets/img/facebook.png";
import githubIcon from "../../assets/img/github.png";
import googleIcon from "../../assets/img/google.png";
import Logo from "../../assets/img/Logo_Education.png";
import "./Auth.css";

const Auth = ({ isReset }) => {
  const serverURL = process.env.REACT_APP_URL_SERVER_LOCAL;
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const params = useParams();
  const [resetPassWord, setResetPassWord] = useState("");
  const [verifyCode, setVerifyCode] = useState(null);
  const [outsideUser, setOutsideUser] = useState(null);
  const [formState, setFormState] = useState(
    isReset ? "resetPassword" : "Login"
  );
  const loading = useSelector((state) => state.AuthReducer.loading);
  const dispatch = useDispatch();
  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const verifyChange = (e) => {
    setVerifyCode(e.target.value);
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      ...data,
      firstname: "",
      lastname: "",
      password: "",
      confirmpassword: "",
    });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState === "SignUp") {
      if (data.password === data.confirmpassword) {
        dispatch(signUp(data, resetForm(), setFormState));
      } else {
        setConfirmPass(false);
      }
    } else {
      if (formState === "Login") {
        try {
          dispatch(logIn(data));
        } catch (error) {
          console.log(error);
        }
      } else {
        if (formState === "Verify") {
          try {
            dispatch(verifySender(data.username, verifyCode));
          } catch (error) {
            console.log(error);
          }
        } else {
          if (formState === "forgotPassword") {
            try {
              dispatch(forgotPassword(data.username));
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              dispatch(
                resetPassword(
                  resetPassWord,
                  params.userEmail,
                  params.id,
                  params.token,
                  setFormState
                )
              );
            } catch (error) {
              console.log(error);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    try {
      // const data = new FormData();
      // data.append("name", Date.now() + outsideUser.photos[0].value);
      // console.log(Date.now() + outsideUser.photos[0].value);
      // data.append("file", outsideUser.photos[0].value);
      // dispatch(uploadImage(data));
      // eslint-disable-next-line no-undef
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

  const handleChangePasswordReset = (e) => {
    setResetPassWord(e.target.value);
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
        <img src={Logo} alt="" />
        <h4>
          {formState === "SignUp"
            ? "SIGN UP"
            : formState === "Verify"
            ? "ACTIVE USER"
            : formState === "forgotPassword"
            ? "FORGOT PASSWORD"
            : formState === "resetPassword"
            ? "RESET PASSWORD"
            : "LOG IN"}
        </h4>
        <form className="infoFrom" onSubmit={handleSubmit}>
          {formState === "SignUp" && (
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
          {formState !== "forgotPassword" && formState !== "resetPassword" && (
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
          )}

          {formState === "Verify" ? (
            <div>
              <input
                className="infoInput"
                type="text"
                onChange={verifyChange}
                placeholder="Code in your email"
              />
            </div>
          ) : (
            formState !== "forgotPassword" &&
            formState !== "resetPassword" && (
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
            )
          )}
          {formState === "SignUp" && (
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

          {formState === "forgotPassword" && (
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
          )}

          {formState === "resetPassword" && (
            <div>
              <input
                type="password"
                placeholder="New password"
                className="infoInput"
                onChange={handleChangePasswordReset}
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
            {formState === "SignUp" ? (
              <button
                type="submit"
                className="btn SignUp-btn"
                disabled={loading}
              >
                SIGN UP
              </button>
            ) : formState === "Login" ? (
              <button
                type="submit"
                className="btn SignUp-btn"
                disabled={loading}
              >
                LOG IN
              </button>
            ) : formState === "resetPassword" ? (
              <button disabled={loading} className="btn SignUp-btn">
                RESET
              </button>
            ) : formState === "Verify" ? (
              <button disabled={loading} className="btn SignUp-btn">
                SEND
              </button>
            ) : (
              <button disabled={loading} className="btn SignUp-btn">
                SEND MAIL
              </button>
            )}
          </div>
        </form>
        <span style={{ cursor: "pointer" }}>
          {formState !== "Login" ? (
            <div
              onClick={() => {
                setFormState("Login");
                resetForm();
              }}
            >
              Already have an account. Login
            </div>
          ) : (
            <div
              onClick={() => {
                setFormState("SignUp");
                resetForm();
              }}
            >
              No Account. Sign Up
            </div>
          )}
        </span>
        <span style={{ cursor: "pointer" }}>
          {formState !== "Verify" && (
            <div
              onClick={() => {
                setFormState("Verify");
                resetForm();
              }}
            >
              Unverified account. Active User
            </div>
          )}
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
        <span
          style={{ cursor: "pointer" }}
          onClick={() => {
            setFormState("forgotPassword");
            resetForm();
          }}
        >
          Forgot password
        </span>
      </div>
    </div>
  );
};

export default Auth;
