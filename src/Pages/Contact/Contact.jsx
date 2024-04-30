import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { FaArrowLeft} from 'react-icons/fa'
import './Contact.css'
import { useNavigate } from "react-router-dom";
const Contact = () => {

  const navigation = useNavigate()
  const handleBack = () => {
    navigation(-1);
  }

  return (
    <div className="contact">
      <div className="back-btn" onClick={()=> handleBack()}><FaArrowLeft/></div>
      <h1 className="contact-info">Hello there, we are here to serve you. Feel free to contact us.</h1>
      <div className="contact-container">

        <div className="contact-div">
        <div className="contact-box">
          <div className="mail">
          <FaWhatsapp fontSize={50} style={{color: 'green', marginLeft: '55px'}}/>
            <div className="mail-txt">whatsApp</div>
          </div>
        </div>
        <div className="contact-box">
          <div className="mail">
          <FiMail fontSize={50} style={{color: 'red'}}/>
          <div className="mail-txt">Mail</div>
          </div>
        </div>
        <div className="contact-box">
          <div className="mail">
          <IoCallOutline fontSize={50} />
          <div className="mail-txt">Call</div>
          </div>
        </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
