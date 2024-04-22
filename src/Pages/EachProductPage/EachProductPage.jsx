import React from 'react'

import "./EachProductPage.css";
import ProductPageCard from '../../components/ProductPageCard/ProductPageCard';
import DescriptionBox from '../../components/DescriptionBox/DescriptionBox';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';






const EachProductPage = (props) => {
 const {id} = useParams()
 const navigate = useNavigate();
 const handleGoBack = () => {
  navigate(-1); // This will navigate back to the previous page
};
 return (
   <div className="product-wrapper" onClick={window.scrollTo(0, 0)}>
        <div className="back-btn-in-each-product" onClick={()=>{handleGoBack()}}>back</div>
     <ProductPageCard productid={id} />
     <DescriptionBox />
   </div>
 );
};

export default EachProductPage;