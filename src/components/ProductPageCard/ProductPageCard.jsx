import React, { useState, useEffect } from "react";
import "./ProductPageCard.css";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import fetchImageUrl from "../../fetchImageUrl";
import Lottie from "lottie-react";
import loading1 from "../../lottie/loading2.json"
import { useNavigate } from "react-router-dom";
import { updateCart } from "../../Slices/CartSlice";
import { TiMinus } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import WishList from "../wishlist/WishList";


const ProductPageCard = ({ data, img }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [isAddedToWishList, setIsAddedToWishList] = useState(false);
  const [item, setItem] = useState()


  useEffect(() => {

    const storedData = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(updateCart(storedData));
    const item = storedData.find((item) => item.id == data.productId)

    if (item) {
      setItem(item)
      setIsProductInCart(true)
    }
    else {

      setIsProductInCart(false)
    }
  }, [])


  // localStorage.removeItem("cart")

  const handleSaveLocalCart = (updatedData) => {
    localStorage.setItem("cart", JSON.stringify(updatedData))

  }



  const addToCartHandler = (id, name, price, imageKey, description) => {

    console.log("in add to cart method ", item)
    const storedData = JSON.parse(localStorage.getItem("cart")) || [];
    const newItem = { id, name, price, imageKey, description, quantity: 1 };
    const updatedCart = [...storedData, newItem];
    handleSaveLocalCart(updatedCart);
    dispatch(updateCart(updatedCart));
    setItem(newItem)
    setIsProductInCart(true)



  };



  return (
    <div className="productcard">
      <div className="wishlist-Each-product"><WishList data={data} size={30}/></div>
      <div className="productcard-left">
        <div className="productcard-img">
          {
            img.length > 0 ? (<img
              className="productcard-main-img"
              src={img}
              alt="product image"
            />) : (<>
              <Lottie animationData={loading1} alt="loading..." className="loading-lottie" />
            </>)
          }
        </div>
        <div className="pictures">
          <div  className="product-img">
            <img  
              src={img}
              alt="product image"
            /></div>
            <div  className="product-img">
            <img  
              src={img}
              alt="product image"
            /></div>
            <div  className="product-img">
            <img  
              src={img}
              alt="product image"
            /></div>
        </div>
      </div>
      <div className="productcard-right">
        <h1>{data.productName}</h1>
        <div className="productcard-right-star">
          <FaStar />
          <p>{3} </p>
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
        {(isProductInCart && item !== undefined) ? (
          <button className="eachprod-quantity-container">
            <p
              onClick={() => {

                const storedData = JSON.parse(localStorage.getItem("cart")) || [];
                const fetchedItem = storedData.find((pre) => pre.id == item.id)
                if (fetchedItem) {
                  const updatedData = storedData.map((pre) => {
                    if (pre.id == fetchedItem.id) {

                      return { ...pre, quantity: fetchedItem.quantity - 1 }
                    }
                    return pre
                  }).filter((data) => {
                    if (data.quantity != 0) {
                      return data
                    }
                  })

                  handleSaveLocalCart(updatedData)
                  dispatch(updateCart(updatedData))
                  const itemToSet = updatedData.find((data) => data.id == fetchedItem.id)
                  setItem(itemToSet)
                }
                else {
                  setItem(fetchedItem)
                }


              }}
              className="quantity-btn"
            >
              <TiMinus size={11} />
            </p>
            <p className="quantity">{item != undefined ? item.quantity : 0}</p>
            <p
              onClick={() => {

                const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
                const fetchedItem = storedCart.find((pre) => pre.id == item.id)
                if(fetchedItem)
                  {
                    const updatedCart = storedCart.map(data =>
                      data.id === item.id ? { ...data, quantity: data.quantity + 1 } : data
                    );
                    handleSaveLocalCart(updatedCart)
                    dispatch(updateCart(updatedCart));
                    const itemToSet = updatedCart.find((data) => data.id == fetchedItem.id)
                    setItem(itemToSet)
                  }
                  else{
                    setItem(fetchedItem)
                  }

              }}
              className="quantity-btn"
            >
              <TiPlus size={11} />
            </p>
          </button>
        ) : (

          <button onClick={() => addToCartHandler(data.productId, data.productName, data.price, img, data.productDescription)}>ADD TO CART</button>
        )}
        <p className="productcard-right-category">
          <span>Category : </span>
          {data.tags}
        </p>
        <p className="productcard-right-category">
          <span>Tags : </span>Modern, Latest, crop Top
        </p>
      </div>
    </div>
  );
};

export default ProductPageCard;
