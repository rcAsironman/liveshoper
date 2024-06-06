import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useDispatch } from 'react-redux';
import { updateWishList } from "../../Slices/WishListSlice";



function WishList({ data, size}) {
  const [isAddedToWishList, setIsAddedToWishList] = useState(false);
  const dispatch = useDispatch();

  // localStorage.removeItem("wishlist")

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('wishlist')) || [];
    const item = storedData.find((item) => item.data.productId === data.productId);

    if (item) {
      if(item.isWishlistSelected == true)
        {
      setIsAddedToWishList(true);
        }
        else{
          setIsAddedToWishList(false);

        }

    } 
  }, [data.productId]);

  const handleAddItemToWishList = (flag) => {
    const storedData = JSON.parse(localStorage.getItem('wishlist')) || [];

    if (flag) {
      const newData = { data, isWishlistSelected: true };
      const oldData = storedData.filter((item)=>{
        if(item.data.productId != data.productId)
          {
            return item;
          }
      })
      const updatedData = [...oldData, newData];
      setIsAddedToWishList(true);
      dispatch(updateWishList(updatedData));
      localStorage.setItem("wishlist", JSON.stringify(updatedData));
      console.log(updatedData)
    } else {
      const updatedData = storedData.map((item) => {
        console.log(data.productId)
        if(item.data.productId == data.productId)
          {
            console.log("inside if block ")
            return { ...item, isWishlistSelected: false}
          }
          console.log("outside if block ")
          return item;
      } );
      console.log("updated data ",updatedData)

      dispatch(updateWishList(updatedData));
      setIsAddedToWishList(false)
      localStorage.setItem("wishlist", JSON.stringify(updatedData));
    }
  };

  return (
    <div className='wishlist-body'>
      {/* {
        console.log("hellp ", data)
      } */}
      {
        !isAddedToWishList ? (
          <FaRegHeart 
            onClick={() => handleAddItemToWishList(true)} 
            size={size} 
            color='gray' 
          />
        ) : (
          <FaHeart 
            onClick={() => handleAddItemToWishList(false)} 
            size={size} 
            color='red' 
          />
        )
      }
    </div>
  );
}

export default WishList;
