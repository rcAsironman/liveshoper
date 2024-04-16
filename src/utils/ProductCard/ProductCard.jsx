import React from "react";
import "./ProductCard.css";

const ProductCard = ({ id, title, images, rating, price, discountedPrice }) => {
  return (
    <div className="card-wrapper">
      <div className="card-container">
        <div className="product-image-container">
          <img src="https://img.etimg.com/photo/msid-99147770,imgsize-41944/TwoMoustaches-BrassTraditionalUrliBowlDecorShowpiece.jpg" alt="fake" className="product-image" />
        </div>
        <div className="product-info">
          <p className="product-details">House cermony utensil</p>
          <div className="prices">
            <p className="product-original-price"> 800$</p>
            <p className="product-discounted-price"> 600$</p>
          </div>
        </div>
        <button className="card-btn">Book Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
