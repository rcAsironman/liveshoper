import React, { useState } from "react";
import "./Profile.css";
import { FaEdit } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

const Profile = () => {
  const [userDetails, setuserDetails] = useState({
    firstName: "Sai",
    lastName: "Manikanta",
    password: "12345678",
    email: "sai@gmail.com",
  });
  const [isEditable, setisEditable] = useState(false);

  console.log(userDetails);

  const handleEditClick = () => {
    setisEditable((prev) => !prev); // Toggle isEditable state
  };

  const handleFormData = (e) => {
    e.preventDefault();
    setuserDetails((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="wrapper">
      <div className="profilepage-container">
        <div className="profile-left">
          <img src="speaker.jpg" alt="" className="profile-image" />
        </div>
        <div className="profile-right">
      
            <div className="input-fields-container">
              <div>
                <label htmlFor="firstName">First Name</label>
                <input
                  disabled={!isEditable}
                  onChange={handleFormData}
                  value={userDetails.firstName}
                  className="input-field"
                  type="text"
                  name="firstName"
                  placeholder="First name"
                />
              </div>
              <div>
                <label htmlFor="lastName">Last Name</label>
                <input
                  disabled={!isEditable}
                  name="lastName"
                  onChange={handleFormData}
                  value={userDetails.lastName}
                  className="input-field"
                  type="text"
                  placeholder="Last name"
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  disabled={!isEditable}
                  name="email"
                  onChange={handleFormData}
                  className="input-field"
                  type="email"
                  placeholder="Email"
                  value={userDetails.email}
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  disabled={!isEditable}
                  name="password"
                  onChange={handleFormData}
                  value={userDetails.password}
                  className="input-field"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
          
            <div>
              <button onClick={handleEditClick} className="profilepage-card-btn">
                {isEditable ? <FaRegSave fontSize={20}/> : <FaEdit fontSize={20}/>}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
