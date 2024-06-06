
import React, { useEffect } from "react";
import "./signUp.css"
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
import bg1 from "../../background-image/woman1.png"
import bg2 from "../../background-image/woman1.png"
import { ipAddress } from "../../config";
const SignUp = () => {


  // Calculate expiration time
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);

  const [isValidUsername, setIsValidUsername] = useState(null);
  const [isValidEmail, setIsValidEmail] = useState(null);
  const [isValidPassword, setIsValidPassword] = useState(null);
  const [isLoadingActive, setIsLoadingActive] = useState(false);
  const [isPasswordMatched, setPasswordMatched] = useState(null);
  const [isValidNumber, setValidNumber] = useState(null)

  const [formData, setformData] = useState({
    username: "",
    password: "",
    reEnterPassword: "",
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
    const value  = formData.email;
    const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    setIsValidEmail(regex.test(value));
  };

  const handlePasswordChange = () => {
    const value  = formData.password;
    const regex =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
    setIsValidPassword(regex.test(value));
  };
 
  const handleSignUpFailure = (error) => {
    toast.error(error,{
      className: 'toast-error'
    });
  }

  const handlePasswordMatched = () => {
         if(formData.password !== formData.reEnterPassword)
         {
            setPasswordMatched(false);
         }
         else{
          setPasswordMatched(true)
         }
  }


  // call this login function after signup 
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
          navigate("/");
        }

      })
      .catch((error) => {
        setIsLoadingActive(false);
        handleSignUpFailure(error);
        
      })
  };

  // signUp function
  const signUp = async () => {


    setIsLoadingActive(true)
    axios.post(`http://65.2.73.20:8080/liveshoper/api/v1/user/save-user`,postData)
      .then((response) => {
        if (response.status === 200) {
          login()
        }

      })
      .catch((error) => {
        alert(error)
        setIsLoadingActive(false);
        handleSignUpFailure(error);
        
      })
  };

  const postData = {
    userName: formData.username,
    email: formData.email,
    mblNum: formData.number,
    password: formData.password,
    reEnterPassword: formData.reEnterPassword,
    rolesId: 1
  };

  return (
    <div>
      <div className="signup">
      {/* <div>
            <img src={bg1} width={60}/>
      </div> */}
     
        <div className="signup-container">
          
          <div className="loginsignup-fields">

            <div className="login-heading" style={{ fontSize: 'xx-large', fontWeight: '500' }}>SignUp</div>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={formDataHandler}
              style={{
                border : isValidUsername === false ? '1px solid red' : ''
              }}
            />
            {isValidUsername == false && <div className="error">please enter username</div> }

            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={formDataHandler}
              style={{
                border : isValidEmail === false ? '1px solid red' : ''
              }}
            />
            {isValidEmail == false && <div className="error">enter a valid email</div> }

            <input
              type="text"
              placeholder="Mobile"
              name="number"
              value={formData.number}
              onChange={formDataHandler}
              style={{
                border : isValidNumber === false ? '1px solid red' : ''
              }}
            />
            {isValidNumber == false && <div className="error">enter a valid Mobile number</div> }

          
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={formDataHandler}
              style={{
                border : isValidPassword === false ? '1px solid red' : ''
              }}
            />
             {isValidPassword == false && <div className="error">enter a valid password</div> }
            
             <input
              type="password"
              placeholder="ReEnter Password"
              name="reEnterPassword"
              value={formData.reEnterPassword}
              onChange={formDataHandler}
              style={{
                border : isPasswordMatched === false ? '1px solid red' : ''
              }}
            />
             {isPasswordMatched == false && <div className="error">password doesn't matched</div> }
          </div>
          <button className="signUp-btn"
            onClick={() => {
              if(formData.username === '' )
              {
                setIsValidUsername(false)
              }
              else if(formData.email === '')
              {
                setIsValidEmail(false)
              }
              else if(formData.number === '')
              {
                console.log("heyyy")
                  setValidNumber(false)
              }
              else if(formData.password === '')
              {
                setIsValidPassword(false)
              }
              else if(formData.reEnterPassword === '')
              {
                setPasswordMatched(false)
              }
              else{
              handleEmailChange()
              handlePasswordChange()
              handlePasswordMatched()
              signUp();
             
            }

            }}
          >
           {
             isLoadingActive === false?  "Continue" : <Lottie className="loading2" animationData={loading2}/>
           }
          </button>

          <p className="loginsignup-login">
            Already have an account?
            <Link to="/login"><p style={{ color: 'blue' }}>Login</p></Link>
          </p>

          
        </div>
        {/* <div>
            <img src={bg1} width={60}/>
      </div> */}
        <ToastContainer />
      </div>
      
    </div>
  );
};

export default SignUp;
