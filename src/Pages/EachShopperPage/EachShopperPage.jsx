import React from "react";
import "./EachShopperPage.css"; // Styling for the component
import { useSearchParams } from "react-router-dom";

const EachShopperPage = () => {
  const { id } = useSearchParams();
  return (
    <div className="wrapper">
      <div className="profile-form-container">
        <div className="profile-details">
          <div className="profile-picture">
            <img src="../../speaker.jpg" alt="" />
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
          <div className="message-textarea">
            <label htmlFor="message">List Of Items:</label>
            <textarea id="message" name="message" rows="8" cols="50" />
          </div>
        <button className="card-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default EachShopperPage;
