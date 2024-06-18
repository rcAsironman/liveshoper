
import React, { useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { toggleState } from "../../Slices/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loading2 from "../../lottie/loading2.json"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imageBg1 from "../../background-image/login-bg2.png"
import imageBg2 from "../../background-image/login-bg.png"
import { ipAddress } from "../../config";

const Login = () => {


  // Calculate expiration time
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isLoadingActive, setIsLoadingActive] = useState(false);


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
    if (Cookies.get('token') !== undefined) {
      console.log("Token is already generated ", Cookies.get('token'))
      dispatch(toggleState(true))
      navigate("/")

    }
  }, []);


  const handleEmailChange = () => {
    const value = formData.email;
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    setIsValidEmail(regex.test(value));
  };

  const handlePasswordChange = () => {
    const value = formData.password;
    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    setIsValidPassword(regex.test(value));
  };

  const handleLoginFailure = () => {
    toast.error("Incorrect emial or password", {
      className: 'toast-error'
    });
  }

  const login = async () => {


    setIsLoadingActive(true)
    axios.post(`http://${ipAddress}/liveshoper/api/v1/user/login?user=${formData.email}&password=${formData.password}`)
      .then((response) => {
        console.log(response.data)
        const token = response.data.data['token']
        if (response.status === 200) {
          Cookies.set('token', token, { expires: expirationDate })
          dispatch(toggleState(true));
          setIsLoadingActive(false);
          console.log(response.data)
          axios.get(`http://${ipAddress}/liveshoper/api/v1/user/get-user-by-email?email=${formData.email}`)
            .then((response) => {
              const userDa = {
                "email": formData.email,
                "token": token,
                "userId": response.data.data.userId
              }

              localStorage.setItem("userData", JSON.stringify(userDa))
              const userDat = JSON.parse(localStorage.getItem("userData"))
              console.log("user Data is here live ",userDat)
              console.log("user id ", response.data.data.userId)

            })
            .catch((error) => {
              console.log(error)
            })
          navigate("/");
        }

      })
      .catch((error) => {
        setIsLoadingActive(false);
        handleLoginFailure();

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

  return (
    <div className="loginsignup">
      <div className="login-form">

        {/* <div className="bg2">
      <img src={imageBg1} width={'200px'} height={'200px'}/>
      </div> */}
        {/* <div className="bg1">
      <img src={imageBg2} width={'200px'} height={'400px'}/>
      </div> */}
        <div className="loginsignup-container">
          <div className="loginsignup-fields">

            <div className='login-heading' style={{ fontSize: 'xx-large', fontWeight: '500' }}>Login</div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="login-input-field"
              value={formData.email}
              onChange={formDataHandler}
              style={{
                border: isValidEmail === false ? '1px solid red' : ''
              }}
            />
            {isValidEmail == false && <div className="error">enter a valid email</div>}
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="login-input-field"
              value={formData.password}
              onChange={formDataHandler}
              style={{
                border: isValidPassword === false ? '1px solid red' : ''
              }}
            />
            {isValidPassword == false && <div className="error">enter a valid password</div>}
          </div>
          <div

            className="login-btn"
            onClick={() => {
              handleEmailChange()
              handlePasswordChange()
              if (isValidEmail === true && isValidPassword === true) {
                login();
              }
            }}
          >
            {
              isLoadingActive === false ? "Continue" : <Lottie className="loading2" animationData={loading2} />
            }
          </div>



        </div>

        <ToastContainer />
        <div className="login-links">

          <div> Create an account?
            <Link to="/signUp"><p style={{ color: 'blue' }}>Register here</p></Link></div>


          <div>
            forgot password?
            <Link to="/signUp"><p style={{ color: 'blue' }}>Recover here</p></Link>

          </div>

        </div>
      </div>


    </div>
  );
};

export default Login;
