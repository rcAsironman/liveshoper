import React, { useState, useEffect, useRef, useCallback } from "react";
import "./SearchBar.css";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import fetchImageUrl from "../../fetchImageUrl";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
        setSearchTerm("");
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const fetchSearchResults = async (searchTerm, page) => {
    if (searchTerm) {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `http://65.2.73.20:8080/liveshoper/api/v1/product/search-product`,
          {
            params: {
              search: searchTerm,
              page: page,
              size: 12,
            },
          }
        );

        const res = response.data.data.content; // Assuming the search results are in the 'content' field
        setSearchSuggestions((prev) => (page === 0 ? res : [...prev, ...res]));
        setShowSuggestions(true);
        setHasMore(res.length > 0);
        console.log("result ", res);

        // Fetch image URLs for the search results
        const urls = {};
        for (let suggestion of res) {
          try {
            const url = await fetchImageUrl(suggestion.productImageKey);
            urls[suggestion.productId] = url;
          } catch (err) {
            console.error("Error fetching image URL for product:", suggestion.productId, err);
          }
        }
        setImageUrls((prev) => ({ ...prev, ...urls }));
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false); // Stop loading
      }
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const onSearch = async (searchTerm) => {
    setPage(0);
    await fetchSearchResults(searchTerm, 0);
  };

  const loadMore = useCallback(async () => {
    if (hasMore && !loading) {
      const newPage = page + 1;
      setPage(newPage);
      await fetchSearchResults(searchTerm, newPage);
    }
  }, [hasMore, loading, page, searchTerm]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounce);
  }, [searchTerm]);

  useEffect(() => {
    const handleScroll = () => {
      if (searchRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = searchRef.current;
        if (scrollTop + clientHeight >= scrollHeight - 5) {
          loadMore();
        }
      }
    };

    if (showSuggestions) {
      searchRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (searchRef.current) {
        searchRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loadMore, showSuggestions]);

  const toggleSuggestions = () => {
    setShowSuggestions(false);
    setSearchTerm(""); // Clear search input when suggestions are closed
  };

  const closeSearch = () => {
    setSearchTerm("");
    setSearchSuggestions([]);
    setShowSuggestions(false);
  };

  const handleProductClick = (productData) => {
    toggleSuggestions();
    navigate("/products", { state: { data: productData } });
  };

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
        <FiSearch size={20} />
      </div>

      {showSuggestions && (
        <div className="search-suggestions-container" ref={searchRef}>
          {loading && <p>Loading...</p>}
          <div className="suggestions-wrapper">
            {searchSuggestions.length === 0 && !loading ? (
              <div>
                <button onClick={toggleSuggestions} className="close">
                  <CgClose />
                </button>
                <div className="suggestions-display">
                  <p>No results found</p>
                </div>
              </div>
            ) : (
              <div>
                <button onClick={toggleSuggestions} className="close">
                  <CgClose />
                </button>
                <ul>
                  {searchSuggestions.map((suggestion) => (
                    <div className="suggestions-display" key={suggestion.productId}>
                      <div className="each-product" onClick={() => handleProductClick(suggestion)}>
                        <span className="product-name"> {suggestion.productName} </span>
                        {imageUrls[suggestion.productId] && (
                          <img
                            src={imageUrls[suggestion.productId]}
                            className="product-image"
                            alt={suggestion.productName}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </ul>
                {loading && <p>Loading more...</p>}
                {!hasMore && <p>Sorry, we don't have what you are looking for.</p>}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;