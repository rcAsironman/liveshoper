import React from "react";
import './Modal.css'

const Modal = ({ onLoginClick }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-content">
            <h2>Please login to access</h2>
            <button onClick={() => window.location.replace("/login")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
