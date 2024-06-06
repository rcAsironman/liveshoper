import React, { useState, useEffect } from "react";
import "./SearchSuggestions.css";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";
import fetchImageUrl from "../../fetchImageUrl";
import { useNavigate } from "react-router-dom";

const SearchSuggestions = ({ searchSuggestions, toggleSuggestions }) => {
  const [imageUrls, setImageUrls] = useState({});
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUrls = async () => {
      const urls = {};
      for (let suggestion of searchSuggestions) {
        try {
          const url = await fetchImageUrl(suggestion.productImageKey);
          urls[suggestion.productId] = url;
        } catch (err) {
          console.error("Error fetching image URL for product:", suggestion.productId, err);
        }
      }
      setImageUrls(urls);
    };

    if (searchSuggestions.length > 0) {
      fetchUrls();
    }
  }, [searchSuggestions]);

  const handleProductClick = (productData) => {

    toggleSuggestions()
    navigate("/products", { state: { data:  productData} });
  };

  return searchSuggestions.length === 0 ? (
    <div className="suggestions-wrapper">
      <ul>
        <button onClick={toggleSuggestions} className="close">
          <CgClose />
        </button>
        <li className="suggestions-display">
          <p>No results found</p>
        </li>
      </ul>
    </div>
  ) : (
    <div className="suggestions-wrapper">
      <button onClick={toggleSuggestions} className="close">
        <CgClose />
      </button>
      {/* onClick={()=>handleProductClick(suggestion)} */}
      <ul>
        {searchSuggestions.map((suggestion) => (
            <div className="suggestions-display">
              <div className="each-product" onClick={()=>handleProductClick(suggestion)}>
              <span className="product-name"> {suggestion.productName} </span>
              {imageUrls[suggestion.productId] && (
                <img
                  src={imageUrls[suggestion.productId]}
                  className="product-image"
                  alt={suggestion.productName}
                  width={20}
                />
              )}
              </div>
            </div>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
