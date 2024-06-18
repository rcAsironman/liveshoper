import React, { useState, useEffect } from "react";
import "./ProductPageCard.css";
import { FaArrowLeft, FaStar, FaArrowRight } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loading1 from "../../lottie/loading2.json";
import { updateCart } from "../../Slices/CartSlice";
import { TiMinus, TiPlus } from "react-icons/ti";
import WishList from "../wishlist/WishList";
import fetchImageUrl from "../../fetchImageUrl";

const ProductPageCard = ({ data, img }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [item, setItem] = useState(null);
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [images, setImages] = useState([]);
  const imagesPerPage = 3;

  const fetchUrl = async (imgKey) => {
    try {
      const url = await fetchImageUrl(imgKey);
      setImages((prevImages) => [...prevImages, url]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(()=>{

  },[images])
  useEffect(() => {
    // Set the main image only once
    setImages([img]);
    data.images.forEach((im) => {
      fetchUrl(im.imageKey);
    });
  }, [data.images, img]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("cart")) || [];
    dispatch(updateCart(storedData));
    const foundItem = storedData.find((item) => item.id === data.productId);
    if (foundItem) {
      setItem(foundItem);
      setIsProductInCart(true);
    } else {
      setIsProductInCart(false);
    }
    setMainImgIndex(0);
  }, [data, dispatch]);

  const handleSaveLocalCart = (updatedData) => {
    localStorage.setItem("cart", JSON.stringify(updatedData));
  };

  const addToCartHandler = (id, name, price, imageKey, description) => {
    const storedData = JSON.parse(localStorage.getItem("cart")) || [];
    const newItem = { id, name, price, imageKey, description, quantity: 1 };
    const updatedCart = [...storedData, newItem];
    handleSaveLocalCart(updatedCart);
    dispatch(updateCart(updatedCart));
    setItem(newItem);
    setIsProductInCart(true);
  };

  const handlePrevPage = () => {
    setPageIndex((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const handleNextPage = () => {
    setPageIndex((prevPage) =>
      prevPage < Math.ceil(images.length / imagesPerPage) - 1 ? prevPage + 1 : prevPage
    );
  };

  const displayedImages = images.slice(
    pageIndex * imagesPerPage,
    (pageIndex + 1) * imagesPerPage
  );

  const handleImageClick = (index) => {
    setMainImgIndex(pageIndex * imagesPerPage + index);
    setSelectedImageIndex(pageIndex * imagesPerPage + index);
  };

  const updateCartQuantity = (id, change) => {
    const storedData = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = storedData
      .map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + change };
        }
        return item;
      })
      .filter((item) => item.quantity > 0);

    handleSaveLocalCart(updatedCart);
    dispatch(updateCart(updatedCart));
    const updatedItem = updatedCart.find((item) => item.id === id);
    setItem(updatedItem || null);
    setIsProductInCart(updatedCart.some((item) => item.id === id));
  };

  return (
    <div className="productcard">
      <div className="wishlist-Each-product">
        <WishList data={data} size={30} />
      </div>
      <div className="productcard-left">
       
        <div className="productcard-img">
          {images[mainImgIndex] ? (
            <img
              className="productcard-main-img"  
              src={images[mainImgIndex]}
              alt="product image"
            />
          ) : (
            <Lottie animationData={loading1} alt="loading..." className="loading-lottie" />
          )}
        </div>
        <div className="pictures">
          <div onClick={handlePrevPage} className="prev-btn">
            <FaArrowLeft size={20} />
          </div>
          <div className="image-slide">
            {displayedImages.map((image, index) => (
              <div
                key={index}
                className={`product-img ${selectedImageIndex === pageIndex * imagesPerPage + index ? "active" : ""}`}
                onClick={() => handleImageClick(index)}
              >
                <img className="view-img" src={image} alt="product image" />
              </div>
            ))}
          </div>
          <div onClick={handleNextPage} className="next-btn">
            <FaArrowRight size={20} />
          </div>
        </div>
        </div>

      <div className="productcard-right">
        <h1>{data.productName}</h1>
        <div className="productcard-right-star">
          <FaStar />
          <p>{3}</p>
        </div>
        <div className="productcard-right-prices">
          <div className="productcard-right-price-old">₹{data.price}</div>
          <div className="productcard-right-price-new">₹{data.price}</div>
        </div>
        <div className="productcard-right-description">
          {data.productDescription}
        </div>
        {isProductInCart && item ? (
          <div className="eachprod-quantity">
            <p
              onClick={() => updateCartQuantity(item.id, -1)}
              className="quantity-btn"
            >
              <TiMinus size={11} color="white" />
            </p>
            <p className="quantity" style={{ color: "white" }}>
              {item.quantity}
            </p>
            <p
              onClick={() => updateCartQuantity(item.id, 1)}
              className="quantity-btn"
            >
              <TiPlus size={11} color="white" />
            </p>
          </div>
        ) : (
          <div className="addToCart" onClick={() => addToCartHandler(data.productId, data.productName, data.price, images[mainImgIndex], data.productDescription)}>
            ADD TO CART
          </div>
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
