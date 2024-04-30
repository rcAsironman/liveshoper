import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import "./Navbar.css";
import { CgMenu } from "react-icons/cg";
import { useSelector } from "react-redux";
import SearchBar from "../SearchBar/SearchBar";
import { CgSearch } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";
import {useDispatch} from "react-redux"
import { toggleState } from "../../Slices/AuthSlice";
import Cookies from "js-cookie";

const Navbar = () => {

  const [openMenu, setOpenMenu] = useState(false);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [isSearchOpen, setisSearchOpen] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeLink, setactiveLink] = useState("home");
  console.log(isAuthenticated);
  let cartCount = useSelector((state) => state.cart.length);
  console.log(cartCount);


  const toggleMenu = () => {
    setisSearchOpen(false);
    setOpenMenu((prev) => !prev);
    if (!openMenu) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  };

  const toggleSearch = () => {
    setOpenMenu(false);
    setisSearchOpen((prev) => !prev);
  };

const logout = () => {
  if (isAuthenticated) {
    dispatch(toggleState(false)); // Set isAuthenticated to false
  }
  Cookies.remove('token')
  navigate("/login"); // Navigate to the login route
};


  return (
    <div className="header">
      <div className="wrapper">
        <div className=" navbar ">
          <div className="logo">
            <Link to="/">LiveShoper</Link>
          </div>
          <div className="links-container">
            <ul className="nav-links">
              {isAuthenticated && (
                <>
                  <li>
                    <SearchBar />
                  </li>
                  
                  <li className="nav-link">
                    <Link
                      onClick={() => setactiveLink("home")}
                      className={`${activeLink === "home" ? "active" : ""}`}
                      id="link"
                      to="/"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      onClick={() => setactiveLink("cart")}
                      id="link"
                      to="/cart"
                      className={`${activeLink === "cart" ? "active" : ""}`}
                    >
                      <div className="cart-link">
                        <span className="cart"> Cart</span>
                        <span className="cart-icon">
                          <span className="cart-count">{cartCount}</span>
                          <FaCartPlus fontSize={20} />
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      onClick={() => setactiveLink("orders")}
                      className={`${activeLink === "orders" ? "active" : ""}`}
                      id="link"
                      to="/orders"
                    >
                      Orders
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      onClick={() => setactiveLink("profile")}
                      className={`${activeLink === "profile" ? "active" : ""}`}
                      id="link"
                      to="/profile"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="nav-link">
                    <Link
                      onClick={() => setactiveLink("contact")}
                      className={`${activeLink === "contact" ? "active" : ""}`}
                      id="link"
                      to="/contact"
                    >
                      Contact
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-link">
                <Link
                  onClick={() => setactiveLink("call")}
                  className={`${activeLink === "call" ? "active" : ""}`}
                  id="link"
                  to="/"
                >
                  Call
                </Link>
              </li>
              <li className="nav-link">
                <Link
                  className={`${activeLink === "login" ? "active" : ""}`}
                  onClick={() => {
                    if(isAuthenticated)
                    {
                      setactiveLink("login")
                    }
                    else{
                    setactiveLink("home");
                    }
                    logout();
                  }}
                  id="link"
                  to="/login"
                >
                  {isAuthenticated ? "Logout" : "Login"}
                </Link>
              </li>
              
            </ul>
          </div>
          <div className="mobile-nav">
            {isAuthenticated && cartCount > 0 && (
              <li className="nav-link">
                <Link id="link" to="/cart">
                  <p className="cart-link">
                    <span className="cart-icon">
                      <span className="cart-count">{cartCount}</span>
                      <FaCartPlus color="white" fontSize={20} />
                    </span>
                  </p>
                </Link>
              </li>
            )}
            {isAuthenticated && isSearchOpen ? (
              <CgClose onClick={toggleSearch} />
            ) : (
              isAuthenticated && (
                <CgSearch
                  fontWeight={900}
                  fontSize={20}
                  onClick={toggleSearch}
                />
              )
            )}
            <CgMenu fontSize={20} onClick={toggleMenu} />
          </div>

          {openMenu && (
            <div className="mobile-nav-links">
              <ul onClick={toggleMenu} className="ul">
                {isAuthenticated && (
                  <>
                    <li className="nav-link">
                      <Link id="link" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-link">
                      <Link id="link" to="/orders">
                        Orders
                      </Link>
                    </li>
                    <li className="nav-link">
                      <Link id="link" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-link">
                      <Link id="link" to="/contact">
                        Contact
                      </Link>
                    </li>
                    <li className="nav-link">
                      <Link id="link" to="/cart">
                        Cart
                      </Link>
                    </li>
                  </>
                )}
                <li className="nav-link">
                  <Link id="link" to="/">
                    Call
                  </Link>
                </li>
                <li className="nav-link">
                  <Link onClick={() => logout()} id="link" to="/Login">
                    {isAuthenticated ? "Logout" : "Login"}
                  </Link>
                </li>
                
              </ul>
            </div>
          )}
        </div>
        {}
        {isSearchOpen && (
          <div className="mobile-searchbar">
            <SearchBar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
