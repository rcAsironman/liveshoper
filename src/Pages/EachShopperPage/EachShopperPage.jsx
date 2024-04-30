import React from "react";
import "./EachShopperPage.css"; // Styling for the component
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft} from 'react-icons/fa'
const EachShopperPage = () => {

  const navigate = useNavigate();
  const { id } = useSearchParams();
  const handleGoBack = () => {
    navigate(-1)
  }
  
  return (
    <div className="wrapper">
      <div className="back-btn" onClick={()=> handleGoBack()}><FaArrowLeft/></div>
      <div className="profile-form-container">
        <div className="profile-details">
          <div className="profile-picture">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/220px-Outdoors-man-portrait_%28cropped%29.jpg" alt="" />
          </div>
          <div className="profile-details ">
            <div className="name shopper-detail">
              <p>Name:</p>
              <p>Bond</p>
            </div>
            <div className="experience shopper-detail">
              <p>Exp:</p>
              <p>2+</p>
            </div>
            <div className="language shopper-detail">
              <p>Languages:</p>
              <p>Telugu,English,Hindi</p>
            </div>
          </div>
        </div>
        <div className="form-fields">
          <div className="date-time-input">
            <div className="field">
              <label htmlFor="date">Date</label>
              <input
                className="shopper-input"
                type="date"
                id="date"
                name="date"
              />
            </div>
            <div className="field">
              <label htmlFor="time">Time</label>
              <input
                className="shopper-input"
                type="time"
                id="time"
                name="time"
              />
            </div>
          </div>
          <div>
            <label>preferred language</label>
            <br/>
              <input type="text" placeholder="enter language" className="preferred-language"></input>
          </div>
          <div className="message-textarea">
            <label htmlFor="message">List Of Items:</label>
            <textarea id="message" name="message" rows="8" cols="50" placeholder="Enter Items Eg: 1) item1,2) item 2"/>
          </div>
        <button className="card-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default EachShopperPage;
