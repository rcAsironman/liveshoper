import React, { useState,useEffect } from "react";
import "./ProductPageCard.css";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,increaseQuantity,decreaseQuantity,removeFromCart } from "../../Slices/CartSlice";

const ProductPageCard = ({data}) => {

  const cart = useSelector((state) => state.cart);
  const item = cart.cartItems.find((product) => product.id === data.productId)
  const dispatch = useDispatch();
  console.log("In product page ", cart.cartItems)
  useEffect(()=>{
    if(item)
      {
        
        setIsProductInCart(true)
      }
      else{
        setIsProductInCart(false)
      }
  },[])
  const [isProductInCart, setIsProductInCart] = useState(false);
  const product = {
    productName: "Sample Product",
    rating: 4.5,
    price: 50.99,
    productDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    category: "Sample Category",
    images: ["https://m.media-amazon.com/images/I/713LiwcYtxL.jpg"],
  };
  const handleGoBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };



 
  

  const addToCartHandler = (id, name, price, imageKey, description) => {

    dispatch(addToCart({id, name, price, imageKey, description}));
    setIsProductInCart(true); // Update state when adding to cart
  };
  

  return (
    <div className="productcard">
      <div className="productcard-left">
        <div className="productcard-img">
          <img
            className="productcard-main-img"
            src={product.images[0]}
            alt="s"
          />
        </div>
      </div>
      <div className="productcard-right">
        <h1>{data.productName} </h1>
        <div className="productcard-right-star">
          <FaStar />
          <p>{product.rating} </p>
        </div>
        <div className="productcard-right-prices">
          <div className="productcard-right-price-old">₹{data.price}</div>
          <div className="productcard-right-price-new">
          ₹{data.price}
          </div>
        </div>
        <div className="productcard-right-description">
          {data.productDescription}
        </div>
        { (isProductInCart && item !== undefined)  ? (
          <button className="eachprod-quantity-container">
            <p
              onClick={() => {
                
                
                dispatch(decreaseQuantity(item.id));
                  
              }}
              className="quantity-btn"
            >
              -
            </p>
            <p className="quantity">{item != undefined? item.quantity : 0}</p>
            <p
              onClick={() => {
             
                dispatch(increaseQuantity(item.id));
                 
              }}
              className="quantity-btn"
            >
              +
            </p>
          </button>
        ) : (
          
       <button onClick={()=> addToCartHandler(data.productId, data.productName, data.price, data.productImageKey, data.productDescription)}>ADD TO CART</button>
        )}
        <p className="productcard-right-category">
          <span>Category :</span>
          {product.category}
        </p>
        <p className="productcard-right-category">
          <span>Tags :</span>Modern, Latest, crop Top
        </p>
      </div>
    </div>
  );
};

export default ProductPageCard;
