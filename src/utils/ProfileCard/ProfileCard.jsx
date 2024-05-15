import React from "react";
import "./ProfileCard.css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ProfileCard = ({ id, name, images, location, rating = 3.5 }) => {
  // Calculate the number of full stars
  const fullStars = Math.floor(rating);
  // Check if there is a half star
  const hasHalfStar = rating % 1 !== 0;
  // Calculate the number of empty stars
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="card-wrapper">
      <div className="profile-container">
        <div className="card-rating">
          {/* Display full stars */}
          {Array(fullStars).fill(<FaStar fontSize={10} color="gold" />)}
          {/* Display half star if applicable */}
          {hasHalfStar && <FaStarHalfAlt fontSize={10} color="gold" />}
          {/* Display empty stars */}
          {Array(emptyStars).fill(<FaRegStar fontSize={10} color="gold" />)}
        </div>
        <div className="image-container">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/220px-Outdoors-man-portrait_%28cropped%29.jpg" alt="fake" className="image" />
        </div>
        <div className="info">
        <p className="info-details">Name: {name}</p>
          <p className="info-details">Location : {location}</p>
          <p className="info-details">Languages : Telugu/English/English</p>
        </div>
        <button className="card-btn">Book Now</button>
      </div>
    </div>
  );
};

export default ProfileCard;
