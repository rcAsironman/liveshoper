import React, { useState,useEffect } from "react";
import "./ProductPageCard.css";
import { FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart,increaseQuantity,decreaseQuantity,removeFromCart } from "../../Slices/CartSlice";

const ProductPageCard = ({data}) => {

  const cart = useSelector((state) => state.cart);
  const item = cart.find((product) => product.id === 11);
 
  const dispatch = useDispatch();
  const [isProductInCart, setIsProductInCart] = useState(false);

  const handleGoBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  useEffect(() => {
    if (item) {
      setIsProductInCart(true);
    }
  }, [item]);


  const product = {
    id: 11,
    title: "perfume Oil",
    description:
      "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
    price: 13,
    discountPercentage: 8.4,
    rating: 4.26,
    stock: 65,
    brand: "Impression of Acqua Di Gio",
    category: "fragrances",
    thumbnail: "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg",
    images: [
      "https://cdn.dummyjson.com/product-images/11/1.jpg",
      "https://cdn.dummyjson.com/product-images/11/2.jpg",
      "https://cdn.dummyjson.com/product-images/11/3.jpg",
      "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg",
    ],
  };
  

  const addToCartHandler = () => {
    dispatch(addToCart(product));
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
          <div className="productcard-right-price-old">${data.price}</div>
          <div className="productcard-right-price-new">
            ${data.price}
          </div>
        </div>
        <div className="productcard-right-description">
          {data.productDescription}
        </div>
        {item && isProductInCart ? (
          <button className="eachprod-quantity-container">
            <p
              onClick={() => {
                dispatch(decreaseQuantity(item?.id));
              }}
              className="quantity-btn"
            >
              -
            </p>
            <p className="quantity">{item?.quantity}</p>
            <p
              onClick={() => {
                dispatch(increaseQuantity(item?.id));
              }}
              className="quantity-btn"
            >
              +
            </p>
          </button>
        ) : (
          <button onClick={addToCartHandler}>ADD TO CART</button>
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
