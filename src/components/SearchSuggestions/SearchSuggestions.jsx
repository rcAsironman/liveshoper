// SearchSuggestions.js

import React from "react";
import "./SearchSuggestions.css";
import { Link } from "react-router-dom";
import { CgClose } from "react-icons/cg";

const SearchSuggestions = ({ searchSuggestions, toggleSuggestions }) => {
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
      <ul>
        {searchSuggestions?.slice(0).map((suggestion) => (
          <Link to={`/products/${suggestion.id}`} key={suggestion.id}>
            <li className="suggestions-display">
              <span> {suggestion.title} </span>
              <img src={suggestion.images[2]} alt="" width={20} />
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SearchSuggestions;
