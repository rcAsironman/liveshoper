import React from 'react'
import './HomePage.css'
import Hero from '../../components/Hero/Hero';
import ShoppersContainer from '../../components/ShoppersContainer/ShoppersContainer';
import ProductsContainer from '../../components/ProductsContainer/ProductsContainer'

const HomePage = () => {
  return (
    <div>
      <Hero />
      <ShoppersContainer />
      <ProductsContainer/>
    </div>
  );
}

export default HomePage