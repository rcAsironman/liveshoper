import React from 'react'

import "./EachProductPage.css";
import ProductPageCard from '../../components/ProductPageCard/ProductPageCard';
import DescriptionBox from '../../components/DescriptionBox/DescriptionBox';
import { useParams } from 'react-router-dom';






const EachProductPage = (props) => {
 const {id} = useParams()
 
 return (
   <div className="product-wrapper" onClick={window.scrollTo(0, 0)}>
     <ProductPageCard productid={id} />
     <DescriptionBox />
   </div>
 );
};

export default EachProductPage;