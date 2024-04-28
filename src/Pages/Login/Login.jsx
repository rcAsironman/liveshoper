
import React, { useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { toggleState } from "../../Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';


const Login = () => {


   // Calculate expiration time
   const expirationDate = new Date();
   expirationDate.setDate(expirationDate.getDate() + 7);

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
    console.log("Hello first entered into this one")
    if(Cookies.get('token') !== undefined)
    {
      console.log("Token is already generated ", Cookies.get('token'))
      dispatch(toggleState(true))
      navigate("/")

    }
   }, []);

  const login =async () => {

    
    axios.post(`http://65.2.73.20:8080/liveshoper/api/v1/user/login?user=${formData.email}&password=${formData.password}`)
    .then((response)=>{
      console.log(response.data)
      const token = response.data.data['token']
      if(response.status === 200)
      {
        Cookies.set('token', token, { expires: expirationDate })
        dispatch(toggleState(true))
        navigate("/")
      }
    })
    .catch((error)=>{
      console.log(error)
      alert(error)
    })
  };

  const postData = {
    userName: formData.username,
    email: formData.email,
    mblNum: formData.number,
    password: formData.password,
    reEnterPassword: formData.password,
    rolesId: 1
  };

  const signUp = async () => {


    axios.post(`http://65.2.73.20:8080/liveshoper/api/v1/user/save-user`,postData)
    .then((response)=>{
      if(response.status === 200)
      {
        login()
      }
    })
    .catch((error)=>{
      alert(error)
    })
    console.log("signup");
    console.log(formData);
      navigate("/login")
      setState("Login")
    let responseData;
  
  };
  return (
    <div>
      <div className="loginsignup">

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
  );
};

export default Login;
