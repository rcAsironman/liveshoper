import React, { useEffect, useState } from "react";
import "./Footer.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Footer = () => {

  const [contact, setContact] = useState([])
  useEffect(()=>{
    axios.get(`http://65.2.73.20:8080/liveshoper/api/v1/contact-us/find-all?page=0&size=10`)
    .then((response)=>{
      setContact(response.data.data['content'])
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])
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
            <Link  to="/termsAndServices">Terms of Service</Link>
            <Link  to="/privacyPolicy">Privacy Policy</Link>
            <Link  to="/faqs">FAQs</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
