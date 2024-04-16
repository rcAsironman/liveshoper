
import React, { useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { toggleState } from "../../Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState("Login");
  const [formData, setformData] = useState({
    username: "",
    password: "",
    number: "",
    email: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  const formDataHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };


   useEffect(() => {
     if (isAuthenticated) {
       navigate("/"); // Redirect to home page after authentication
     }
   }, [isAuthenticated, navigate]);

  const login =async () => {
    console.log("login");
    console.log(formData);
     dispatch(toggleState(true));
    // let responseData;
    // await fetch("", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/form-data",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => (responseData = data));

    // if (responseData.success) {
    //   localStorage.setItem("auth-token", responseData.token);
    //   window.location.replace("/");
    // } else {
    //   alert(responseData.error);
    // }
  };

  const signUp = async () => {
    console.log("signup");
    console.log(formData);
      navigate("/login")
      setState("Login")
    let responseData;
    // await fetch("", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/form-data",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((res) => res.json())
    //   .then((data) => (responseData = data));

    // if (responseData.success) {
    //   localStorage.setItem("auth-token", responseData.token);
    //   window.location.replace("/");
    // } else {
    //   alert(responseData.error);
    // }
  };
  return (
    <div>
      <div className="loginsignup">
        <div className="left">
                <h1>Branding</h1>
        </div>
        <div className="right">

        <div className="loginsignup-container">
          <h1>{state}</h1>
          <div className="loginsignup-fields">
            {state === "Register" ? (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  name="username"
                  onChange={formDataHandler}
                  value={formData.username}
                />
                <input
                  type="tel"
                  placeholder="Number"
                  name="number"
                  value={formData.number}
                  onChange={formDataHandler}
                />
              </>
            ) : (
              <></>
            )}
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={formDataHandler}
            />

            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={formDataHandler}
            />
          </div>
          <button
            onClick={() => {
              state === "Login" ? login() : signUp();
            }}
          >
            Continue
          </button>
          {state === "Register" ? (
            <p className="loginsignup-login">
              Already have an account?{" "}
              <span onClick={() => setState("Login")}>Login here</span>
            </p>
          ) : (
            <p className="loginsignup-login">
              Create an account?{" "}
              <span onClick={() => setState("Register")}>Register here</span>
            </p>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
