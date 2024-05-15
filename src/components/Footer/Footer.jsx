import React, { useEffect, useState } from "react";
import "./Footer.css";
import axios from "axios";

const Footer = () => {

  const [contact, setContact] = useState([])
  useEffect(()=>{
    axios.get(`http://65.2.73.20:8080/liveshoper/api/v1/contact-us/find-all?page=0&size=10`)
    .then((response)=>{
      console.log(response.data.data['content'])
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
