import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import './Contact.css'

const Contact = () => {
  return (
    <div className="wrapper">
      <div className="contact-container">
        <FaWhatsapp fontSize={150} />
        <FiMail fontSize={150} />
        <IoCallOutline fontSize={150} />
      </div>
    </div>
  );
};

export default Contact;
