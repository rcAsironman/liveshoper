import React from 'react';
import "./EachProductPage.css";
import ProductPageCard from '../../components/ProductPageCard/ProductPageCard';
import DescriptionBox from '../../components/DescriptionBox/DescriptionBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ScrollToTop from '../../components/ScrollToTop';

const EachProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { item } = state || {}; // Access item data from location state with fallback to an empty object

  const handleGoBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  return (
    <div className="product-wrapper">
      <ScrollToTop/>
      <div className="back-btn" onClick={handleGoBack}><FaArrowLeft /></div>
      {item ? (
        <>
          <ProductPageCard data={item} /> {/* Pass item as prop to ProductPageCard component */}
          <DescriptionBox />
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default EachProductPage;
