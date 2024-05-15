import React from "react";
import "./ProductCard.css";

const ProductCard = (data) => {
  return (
    <div className="card-wrapper">
      <div className="card-container">
        <div className="product-image-container">
          <img src="https://img.etimg.com/photo/msid-99147770,imgsize-41944/TwoMoustaches-BrassTraditionalUrliBowlDecorShowpiece.jpg" alt="fake" className="product-image" />
        </div>
        <div className="product-info">
          {
            data['data'].productName.length < 25 ? (<p className="product-details">{data['data'].productName}</p>):
            (<p className="product-details">{data['data'].productName.slice(0,22)+ "..."}</p>)
          }
          <div className="prices">
            <p className="product-discounted-price" style={{color: 'green', fontWeight: '400'}}>₹{data['data'].price}</p>
          </div>
        </div>
        <button className="card-btn">Book Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
