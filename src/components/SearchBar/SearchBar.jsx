// SearchBar.js

import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import Data from "../../utils/Data";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSearchTerm("")
      }
    };

    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);



  const onSearch = async (searchTerm) => {
    if (searchTerm) {
      const res = Data.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      res.length > 0 ? setSearchSuggestions(res) : setSearchSuggestions([]);
      setShowSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const toggleSuggestions = () => {
    setShowSuggestions(false);
    setSearchTerm(""); // Clear search input when suggestions are closed
  };

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  const closeSearch = () => {
    setSearchTerm("");
    setSearchSuggestions(false)
  }

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button onClick={() => onSearch(searchTerm)} className="search-btn">
        Search
      </button>
     
        {showSuggestions && (
           <div className="search-suggestions-container" ref={searchRef}>
          <SearchSuggestions  
            closeSearch={closeSearch}
            searchSuggestions={searchSuggestions}
            toggleSuggestions={toggleSuggestions}
          />
          </div>
        )}
      
    </div>
  );
};

export default SearchBar;
