import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import './OnGoingProducts.css';
import fetchImageUrl from "../../fetchImageUrl";
import img from "../../background-image/woman2.png";
import { ipAddress } from "../../config";

const OnGoingProducts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  useEffect(() => {
    fetchCartItems(page);
  }, [page]);

  const fetchCartItems = async (page) => {
    try {
      const response = await axios.get(`http://${ipAddress}/liveshoper/api/v1/orders/find-by-status`, {
        params: {
          orderStatus: 'PENDING',
          page: page,
          size: 12,
        },
      });

      const fetchedData = response.data.data.content;

      if (Array.isArray(fetchedData) && fetchedData.length === 0) {
        setHasMore(false);
      } else {
        const itemsWithImages = await Promise.all(fetchedData.map(async (item) => {
          const itemsWithImageUrls = await Promise.all(item.orderDetails.map(async (detail) => {
            const imageUrl = await fetchImageUrl(detail.productId.productImageKey);
            return {
              ...detail,
              imageUrl: imageUrl,
            };
          }));
          return {
            ...item,
            orderDetails: itemsWithImageUrls,
          };
        }));

        setCartItems((prevItems) => [...prevItems, ...itemsWithImages]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const lastCartItemRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prevPage) => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [hasMore]);

  return (
    <div className="cartitems">
      {cartItems.map((item, index) => (
        <div key={index} ref={index === cartItems.length - 1 ? lastCartItemRef : null}>
          <div className="cartitems-format">
            
            
           <div className="product-name">
           {item.appointmentId && (
              <div className="each-product-details">
                <div className="product-detail">
                <div className="product-img">
                  <img src={img} alt="shopper" />
                  <div className='product-title'>{item.appointmentId.name}</div>

                </div>
                <div className="product-details">
                  <div className='product-title'>
                    <p>Start Time</p>
                    {item.appointmentId.startTime}
                  </div>
                  <div className='product-title'>
                    <p>End Time</p>
                    {item.appointmentId.endTime}
                  </div>
                </div>
                <div className="each-product-price">₹{0}</div>
                </div>
              </div>
            )}
           </div>

            <div className="product-name">
              {item.orderDetails.map((detail, idx) => (
               <div className="each-product-detailss">
                 <div className="product-detail" key={idx}>
                  <div className="product-img">
                    <img src={detail.imageUrl} alt={detail.productId.productName} />
                </div>
                <div className="product-details">
                <div className='product-title'>{detail.productId.productName}</div>
                  <div className="each-product-price">₹{detail.productId.price}</div>
                </div>
                </div>
               </div>
              ))}
            </div>
          </div>
          <div className='product-price'>Total: ₹{item.totalAmount}</div>
        </div>
      ))}
    </div>
  );
};

export default OnGoingProducts;
