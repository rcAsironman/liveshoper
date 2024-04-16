// SearchBar.js

import React, { useState, useEffect } from "react";
import "./SearchBar.css";
import Data from "../../utils/Data";
import SearchSuggestions from "../SearchSuggestions/SearchSuggestions";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
      <div className="search-suggestions-container">
        {showSuggestions && (
          <SearchSuggestions
            searchSuggestions={searchSuggestions}
            toggleSuggestions={toggleSuggestions}
          />
        )}
      </div>
    </div>
  );
};

export default SearchBar;
