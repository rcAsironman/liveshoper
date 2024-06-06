import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Orders from "./Pages/Orders/Orders";
import Contact from "./Pages/Contact/Contact";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import AllShopperListing from './Pages/AllShopperListing/AllShopperListing'
import AllProductListing from './Pages/AllProductListing/AllProductListing'
import EachProductPage from "./Pages/EachProductPage/EachProductPage";
import EachShopperPage from "./Pages/EachShopperPage/EachShopperPage";
import CartPage from "./Pages/CartPage/CartPage";
import OnGoingProducts from "./components/OnGoingProducts/OnGoingProducts";
import Ordercompleted from "./components/Ordercompleted/Ordercompleted";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./components/Modal/Modal"; // Import Modal component
import { toggleState } from "./Slices/AuthSlice";
import Cookies from "js-cookie";
import SignUp from "./Pages/SignUp/SignUp";
import WishListProducts from "./Pages/wishList/WishListProducts";


const App = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [showModal, setShowModal] = useState(false);
  const [showNavbarAndFooter, setShowNavbarAndFooter] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if the URL contains "/login"
    if (Cookies.get('token')) {
      dispatch(toggleState(true))
    }
    setShowNavbarAndFooter(!location.pathname.includes("/Login"));
  }, [location]);


  const handleLoginClick = () => {
    setShowModal(true);
  };


  return (
    <div>
      {<Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            isAuthenticated ? (
              <Profile />
            ) : (
              <Modal onLoginClick={handleLoginClick} /> // Show modal if not authenticated
            )
          }
        />
        <Route
          path="/contact"
          element={
            isAuthenticated ? (
              <Contact />
            ) : (
              <Modal onLoginClick={handleLoginClick} /> // Show modal if not authenticated
            )
          }
        />
        <Route
          path="/cart"
          element={
            isAuthenticated ? (
              <CartPage />
            ) : (
              <Modal onLoginClick={handleLoginClick} /> // Show modal if not authenticated
            )
          }
        />
        <Route
          path="/orders"
          element={
            isAuthenticated ? (
              <Orders />
            ) : (
              <Modal onLoginClick={handleLoginClick} /> // Show modal if not authenticated
            )
          }
        >
          <Route path="/orders" element={<Navigate replace to="ongoing" />} />
          <Route path="ongoing" element={<OnGoingProducts />} />
          <Route path="ordercompleted" element={<Ordercompleted />} />
        </Route>
        <Route
          path="/popular"
          element={
            isAuthenticated ? (
              <AllProductListing route={"products"} />
            ) : (
              <Modal onLoginClick={handleLoginClick} /> // Show modal if not authenticated
            )
          }
        />
        <Route
          path="/toprated"
          element={
            isAuthenticated ? (
              <AllProductListing route={"products"} />
            ) : (
              <Modal onLoginClick={handleLoginClick} /> // Show modal if not authenticated
            )
          }
        />
        <Route
          path="/handpicked"
          element={
            isAuthenticated ? (
              <AllProductListing route={"products"} />
            ) : (
              <Modal onLoginClick={handleLoginClick} /> // Show modal if not authenticated
            )
          }
        />
        <Route
          path="/shoppers"
          element={
            isAuthenticated ? (
              <AllShopperListing route={"shoppers"} />
            ) : (
              <Modal onLoginClick={handleLoginClick} /> // Show modal if not authenticated
            )
          }
        />
        <Route
          path="/shoppers/:id"
          element={
            isAuthenticated ? (
              <EachShopperPage />
            ) : (
              <Modal onLoginClick={handleLoginClick} /> // Show modal if not authenticated
            )
          }
        />
        <Route
          path="/products"
          element={
            isAuthenticated ? (
              <EachProductPage />
            ) : (
              <Modal onLoginClick={handleLoginClick} /> // Show modal if not authenticated
            )
          }
        />

        <Route
          path="/wishListProducts"
          element={
            isAuthenticated ? (
              <WishListProducts />
            ) : (
              <Modal onLoginClick={handleLoginClick} /> // Show modal if not authenticated
            )
          }
        />
        <Route
          path="/signUp"
          element={<SignUp />}
        ></Route>
      </Routes>
      {<Footer />}
    </div>
  );
};

export default App;
