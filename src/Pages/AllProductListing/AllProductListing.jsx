import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../utils/ProductCard/ProductCard";
import { FaArrowLeft } from 'react-icons/fa';
import "./AllProductListing.css";
import ScrollToTop from "../../components/ScrollToTop";
import axios from "axios";
import Lottie from "lottie-react";
import loading from "../../lottie/loading1.json";
import { ipAddress } from "../../config";

const AllProductListing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryData, page, category, catgId } = location.state || {}; // Retrieve the passed state

  const [subCategoryId] = useState(catgId);
  const [categoryId] = useState(categoryData?.categoryId);
  const [categoryName] = useState(categoryData?.categoryName);
  const [products, setProducts] = useState(categoryData?.content || []);
  const [currentPage, setCurrentPage] = useState(page + 1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleBack = () => {
    navigate(-1);
  };

  const fetchProducts = async () => {
    console.log("fetch products is called ", "hasMore ", hasMore, " isLoading ", isLoading)
    if (!hasMore){ 
      setIsLoading(false)
      return};
      
    console.log("in fetch products ", categoryId, " sub catg ", subCategoryId, " current page ", currentPage)
    try {
      const response = await axios.get(
        `http://${ipAddress}/liveshoper/api/v1/product/find-by-category-and-sub-category?categoryId=${categoryId}&subCategoryId=${subCategoryId}&page=${currentPage}&size=12`
      );
      const fetchedData = response.data.data.content;
      console.log("fetchProducts is called and data is ", response.data.data.content)
      setProducts(prev => [...prev, ...fetchedData]);
      
      if (fetchedData.length < 12) {
        setHasMore(false)
        setIsLoading(false)
      };
    } catch (error) {
      setIsLoading(false)
      console.error("Error fetching products:", error.message);
    }
  };

useEffect(()=>{
 fetchProducts()
},[currentPage])

  const handleScroll = useCallback(() => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if ( scrollTop + clientHeight + 1 >= scrollHeight-100 && !isLoading) {
          setIsLoading(true);
          console.log(" hasMore value is ", hasMore)
          setCurrentPage(prev => prev + 1);
        }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="view-more">
      <ScrollToTop />
      <div className="meta-data-of-viewMore">
        <div className="allShop-back-btn" onClick={handleBack}>
          <FaArrowLeft />
        </div>
        <div className="category-name">
          <h3>{categoryName} ({category})</h3>
        </div>
      </div>
      <div className="products-container" style={{height: products.length > 0 ? "auto" : "100vh"}}>
        {products.length > 0 ? (
          products.map((product, index) => (
            
              <ProductCard key={index} data={product}/>
            
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
      {isLoading && hasMore && (
        <div className="load-more-products">
          <Lottie animationData={loading} alt="loading..." className="loading-lottie" />
        </div>
      )}
      {!hasMore && (
        <div className="end-of-page">
          <p>End of the page</p>
        </div>
      )}
    </div>
  );
};

export default AllProductListing;
