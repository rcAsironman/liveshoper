import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="outer-wrapper">
      <div className="wrapper">
        <div class="footer-container">
          <div class="contact-details details">
            <h3>Contact Us</h3>
            <p>Email: info@liveshoper.com</p>
            <p>Phone: +91 9347606437</p>
          </div>
          <div class="social-media details">
            <h3>Follow Us</h3>
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
          <div class="useful-links details">
            <h3>Useful Links</h3>
            <a href="#">Terms of Service</a>
            <a href="#">Privacy Policy</a>
            <a href="#">FAQs</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
