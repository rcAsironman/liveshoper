import React from "react";
import "./AllProductListing.css";
import Data from "../../utils/Data";
import { Link } from "react-router-dom";
import ProductCard from "../../utils/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";

const AllProductListing = () => {

  const navigation = useNavigate()
  const handleBack = () => {
    navigation(-1);
  }
  return (
    <div className="wrapper">
      <div className="back-btn" onClick={()=> handleBack()}>back</div>
      <div className="products-container">
        {Data.map((item) => (
          <Link onClick={window.scrollTo(0,0)} key={item.id} to={`/products/${item.id}`}>
            <ProductCard  />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProductListing;
