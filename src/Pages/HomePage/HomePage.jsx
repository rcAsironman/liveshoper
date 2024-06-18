import React, { useEffect, useState } from 'react'
import './HomePage.css'
import Hero from '../../components/Hero/Hero';
import ShoppersContainer from '../../components/ShoppersContainer/ShoppersContainer';
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer'
import { useDispatch } from 'react-redux';
import { updateShoper } from '../../Slices/ShoperSlice';
const HomePage = () => {


  const dispatch = useDispatch()

  useEffect(()=>{
    const localDa = JSON.parse(localStorage.getItem('shoperCart'))
    dispatch(updateShoper(null))
    if(localDa)
      {
        dispatch(updateShoper(localDa))
      }
      else{
        dispatch(updateShoper(null))
      }
  },[])

  // const userData = JSON.parse(localStorage.getItem("userData"))
  // console.log("user Data is here live ",userData)
  const handleClick = () => {
    const element = document.getElementById("shopperContainer"); // Replace "elementId" with the ID of the element you want to scroll to
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "nearest" }); // Scroll to the top of the element smoothly
    }
  };


  return (
    <div>
      <div>
      <Hero  handleClick={handleClick}/>
      </div>
      <div id="shopperContainer">
      <ShoppersContainer/>
      </div>
      <div>
      <ProductsContainer/>
      </div>
    </div>
  );
}

export default HomePage