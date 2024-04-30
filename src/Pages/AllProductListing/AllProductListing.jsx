import React from "react";
import "./AllProductListing.css";
import Data from "../../utils/Data";
import { Link } from "react-router-dom";
import ProductCard from "../../utils/ProductCard/ProductCard";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft} from 'react-icons/fa'

const AllProductListing = () => {

  const navigation = useNavigate()
  const handleBack = () => {
    navigation(-1);
  }
  return (
    <div className="wrapper">   
      <div style={{width: '40px', height: '40px', backgroundColor: 'rgb(212, 212, 212)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', marginBottom: '20px'}} className="allShop-back-btn" onClick={()=> handleBack()}><FaArrowLeft/></div>
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
