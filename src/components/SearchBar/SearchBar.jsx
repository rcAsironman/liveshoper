// SearchBar.js

import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import Data from "../../utils/Data";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";
import { FiSearch } from "react-icons/fi";
import axios from "axios";


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
      try {
        const response = await axios.get(`http://65.2.73.20:8080/liveshoper/api/v1/product/search-product`, {
          params: {
            search: searchTerm,
            page: 0,
            size: 10
          }
        });
  
        const res = response.data.data.content; // Assuming the search results are in the 'content' field
        res.length > 0 ? setSearchSuggestions(res) : setSearchSuggestions([]);
        setShowSuggestions(true);
        console.log("result ", res)
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchSuggestions([]);
        setShowSuggestions(false);
      }
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
      <div onClick={() => onSearch(searchTerm)} className="search-btn">
      <FiSearch size={20}/>
      </div>
     
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
