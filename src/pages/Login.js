import { React, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import "./Login.scss";
const Login = () => {
  const { user, setUser } = useAuthContext();
  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState("login");

  const emailRegisterRef = useRef(null);
  const usernameRegisterRef = useRef(null);
  const passwordRegisterRef = useRef(null);
  const passwordConfirmRegisterRef = useRef(null);

  const emailLoginRef = useRef(null);
  const passwordLoginRef = useRef(null);

  const loginSubmit = async (e) => {
    e.preventDefault();
    const email = emailLoginRef.current.value;
    const password = passwordLoginRef.current.value;
    const responce = await fetch("http://localhost:5555/users/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: email,
        user_password: password,
      }),
    });
    if (responce.status === 404) {
      alert("User not found");
    } else {
      const json_responce = await responce.json();
      setUser(json_responce);
      localStorage.setItem("user", JSON.stringify(json_responce));
      navigate("/");
    }
  };

  const signupSubmit = async (e) => {
    e.preventDefault();
    const email = emailRegisterRef.current.value;
    const username = usernameRegisterRef.current.value;
    const password = passwordRegisterRef.current.value;
    const passwordConfirm = passwordConfirmRegisterRef.current.value;
    const err = validateForm(email, password, passwordConfirm);
    if (err !== "true") {
      alert(err);
    } else {
      const responce = await fetch("http://localhost:5555/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_email: email,
          username: username,
          user_password: password,
          admin: "false",
        }),
      });
      if (responce.status === 201) {
        alert("Register success");
        navigate("/login");
      } else if (responce.status === 404) {
        const json_responce_message = await responce.json();
        alert(json_responce_message.message);
      } else {
        alert("Register fail");
      }
    }
  };

  const validateForm = (email, password, passwordConfirm) => {
    // if (email === "") {
    //   return "Email is required";
    // }
    // if (password === "") {
    //   return "Password is required";
    // }
    // if (passwordConfirm === "") {
    //   return "Password confirm is required";
    // }
    // if (password.length < 6) {
    //   return "Password must be at least 6 characters";
    // }
    // if (email.contains("@") === false) {
    //   return "Email must be valid";
    // }
    // if (password !== passwordConfirm) {
    //   return "Password not match";
    // }
    return "true";
  };

  if (user !== null) {
    navigate("/");
  }

  return (
    <div className="login-signup-container">
      <div className="form-wrap">
        <div className="tabs">
          <h3 className="signup-tab">
            <a
              className={currentTab === "signup" ? "active" : ""}
              onClick={() => {
                setCurrentTab("signup");
              }}
            >
              Sign Up
            </a>
          </h3>
          <h3 className="login-tab">
            <a
              className={currentTab === "login" ? "active" : ""}
              onClick={() => {
                setCurrentTab("login");
              }}
            >
              Login
            </a>
          </h3>
        </div>
        <div className="tabs-content">
          {currentTab === "signup" && (
            <div>
              <form
                className="signup-form"
                onSubmit={(e) => {
                  signupSubmit(e);
                }}
              >
                <input
                  type="email"
                  className="input"
                  autocomplete="off"
                  placeholder="Email"
                  ref={emailRegisterRef}
                />
                <input
                  type="text"
                  className="input"
                  autocomplete="off"
                  placeholder="Username"
                  ref={usernameRegisterRef}
                />
                <input
                  type="password"
                  className="input"
                  autocomplete="off"
                  placeholder="Password"
                  ref={passwordRegisterRef}
                />
                <input
                  type="password"
                  className="input"
                  autocomplete="off"
                  placeholder="Confirm Password"
                  ref={passwordConfirmRegisterRef}
                />
                <input type="submit" className="button" value="Sign Up" />
              </form>
              <div className="help-text">
                <p>By signing up, you agree to our</p>
                <p>
                  <a href="#">Terms of service</a>
                </p>
              </div>
            </div>
          )}
          {currentTab === "login" && (
            <div>
              <form
                className="login-form"
                onSubmit={(e) => {
                  loginSubmit(e);
                }}
              >
                <input
                  type="text"
                  className="input"
                  autocomplete="off"
                  placeholder="Email"
                  ref={emailLoginRef}
                />
                <input
                  type="password"
                  className="input"
                  autocomplete="off"
                  placeholder="Password"
                  ref={passwordLoginRef}
                />
                <input type="checkbox" className="checkbox" />
                <label for="remember_me">Remember me</label>

                <input type="submit" className="button" value="Login" />
              </form>
              <div className="help-text">
                <p>
                  <a href="#">Forget your password?</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
