import React, { useEffect, useState } from 'react';
import "./wishListProducts.css";
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ScrollToTop from '../../components/ScrollToTop';
import fetchImageUrl from '../../fetchImageUrl';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { updateWishList } from "../../Slices/WishListSlice";
import Lottie from 'lottie-react';
import Empty from "../../lottie/wishlistEmpty.json"
function WishListProducts() {
  const [data, setData] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddedToWishList, setIsAddedToWishList] = useState(true);
  const [isAllWishListProductsFalse, setISAllWishListProductsFalse] = useState(true)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(data)
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("wishlist")) || [];
    setData(storedData);
  }, [setIsAddedToWishList]);

  useEffect(()=>{
    const check = data.find((item, index)=> item.isWishlistSelected == true )
    console.log("This id check value ",check)
    if(check == undefined)
      {
        setISAllWishListProductsFalse(true)
      }
      else{
        setISAllWishListProductsFalse(false)
      }
  },[data])
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const imagesData = await Promise.all(data.map(async (item) => {
          const url = await fetchImageUrl(item.data.productImageKey);
          return { productId: item.data.productId, url };
        }));
        const imagesObject = imagesData.reduce((acc, item) => {
          acc[item.productId] = item.url;
          return acc;
        }, {});
        setImages(imagesObject);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(err);
      }
    };

    if (data.length) {
      fetchImages();
    }
  }, [data]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleProductClick = (product) => {
    navigate("/products", { state: { data: product.data } });
  };

  const handleAddItemToWishList = (flag, data) => {
    const storedData = JSON.parse(localStorage.getItem('wishlist')) || [];

    console.log("method is called ", data.data.productId)
    if (flag == false) {
      const updatedData = storedData.map((item) => {
        if(item.data.productId == data.data.productId)
          {
            return { ...item, isWishlistSelected: flag}
          }
          return item;
      } );
      dispatch(updateWishList(updatedData));
      localStorage.setItem("wishlist", JSON.stringify(updatedData));
      setData(updatedData)
    }
  };


  return (
    <div className='wishList-body' style={{ height: data.length === 0 || isAllWishListProductsFalse ? "100vh" : "auto" }}>
      <ScrollToTop />
      <div className='wishlist-name'>
        <div className="back-btn" onClick={handleBack}>
          <FaArrowLeft />
        </div>
        <div className='heading'>Wishlist</div>
      </div>
      <div className='products-data' >
        {data.map((product, index) => (
          <>
          {
            product.isWishlistSelected && (<div className='wishlist-product-card' key={product.data.productId}>

            <div className="card-container" >
              
              <div className="wish-product" style={{display: "flex", justifyContent: "end"}}>
                <div className='wishlst-body'>
                  {

                    product.isWishlistSelected && (
                      <FaHeart
                        onClick={() => handleAddItemToWishList(false, product)}
                        size={20}
                        color='red'
                      />
                    )
                  }
                </div>
              </div>
              <div onClick={() => handleProductClick(product)}>
                <div className="product-image-container">
                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p>Error loading image</p>
                  ) : (
                    <img src={images[product.data.productId]} alt="product" className="product-image" />
                  )}
                </div>
                <div className="product-info">
                  {product.data.productName.length < 20 ? (
                    <p className="product-details">{product.data.productName}</p>
                  ) : (
                    <p className="product-details">{product.data.productName.slice(0, 20) + "..."}</p>
                  )}
                  <div className="prices">
                    <p className="product-discounted-price" style={{ color: 'green', fontWeight: '400' }}>₹{product.data.price}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>)
          }
          </>
        ))}
        {
          isAllWishListProductsFalse && (
            <div className='empty-wishlist' style={{height: "400px", width: "350px", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: " 0px"}}>
            <Lottie animationData={Empty}/>
          </div>
          )
        }
      </div>
    </div>
  );
}

export default WishListProducts;
