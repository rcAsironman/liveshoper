import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import '../OnGoingProducts/OnGoingProducts.css';
import { AiTwotoneDelete } from "react-icons/ai";
import fetchImageUrl from "../../fetchImageUrl";
import img from "../../background-image/woman2.png"
import { ipAddress } from "../../config";




const OrderCompleted = () => {
  const [cartItems, setCartItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();
  let date = 0
  useEffect(() => {
    fetchCartItems(page);
  }, [page]);

  const fetchCartItems = async (page) => {
    try {
      const response = await axios.get(`http://${ipAddress}/liveshoper/api/v1/orders/find-by-status`, {
        params: {
          orderStatus: 'DELIVERED',
          page: page,
          size: 12,
        },
      });

      const fetchedData = response.data.data.content;

      console.log("fetched data in order complete ", fetchedData)
      if (Array.isArray(fetchedData) && fetchedData.length === 0) {
        setHasMore(false);
      } else {
        // Fetch image URLs for each product
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
      <div className="cartitem-format-main">

      </div>
      <hr />
      {cartItems.map((item, index) => (
        <div key={index} ref={index === cartItems.length - 1 ? lastCartItemRef : null}>
          <div className="cartitems-format">


            {
              item.appointmentId != null && (
                <div className="prduct-shopper-name">
                 
                  <div className="product-shopper-img">
                    <img src={img} alt="shopper image" className="product-image" />

                  </div>
                  <div className="shopper-data">
                  <div className='product-title'>
                    {console.log(item.appointmentId)}
                    {item.appointmentId['name']}
                  </div>
                  {/* <div className='product-title'>
                  {
                  Date(item.appointmentId.createdDateInIST)
                    
                  }
                  </div> */}
                  
                  <div className='product-title'>
                  <p>start Time</p>
                  {item.appointmentId.startTime}
                  </div>
                  
                  <div className='product-title'>
                  <p>end Time</p>
                  {item.appointmentId.endTime}
                  </div>
                    </div>
                  x
                  <div className="each-product-price">₹{0}</div>
                
                </div>
              )
            }
            <div className="product-name">
              {item.orderDetails.map((detail, idx) => (
                <div className="prduct-price-name" key={idx}>

                  <div className="product-img">
                    <img src={detail.imageUrl} alt="" className="product-image" />

                  </div>
                  <div className='product-title'>{detail.productId.productName}</div>
                  x
                  <div className="each-product-price">₹{detail.productId.price}</div>
                </div>
              ))}
            </div>
          </div>
          <div className='product-price'>Total : ₹{item.totalAmount}</div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OrderCompleted;
