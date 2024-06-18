import React,{useEffect} from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { IoCallOutline } from "react-icons/io5";
import { FaArrowLeft} from 'react-icons/fa'
import './Contact.css'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateCart } from "../../Slices/CartSlice";



const Contact = () => {

  const navigation = useNavigate()
  const dispatch = useDispatch()
  const handleBack = () => {
    navigation(-1);
  }

  useEffect(() => {
    // Load cart items from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(updateCart(storedCart));
  }, []);


  return (
    <div className="contact">
      <div className='wishlist-name'>
        <div className="back-btn" onClick={handleBack}>
          <FaArrowLeft />
        </div>
        <div className='heading'>Contact</div>
        </div>
      <div>
      <h1 className="contact-info">Hello there, we are here to serve you. Feel free to contact us.</h1>

      </div>
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
