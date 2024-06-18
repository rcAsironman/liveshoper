import React, { useEffect, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loading from "../../lottie/loading.json";
import { FaArrowLeft } from 'react-icons/fa';
import ScrollToTop from "../../components/ScrollToTop";
import { updateCart } from "../../Slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";
import img1 from "../../background-image/woman2.png";
import { updateShoper } from "../../Slices/ShoperSlice";
import { ipAddress } from "../../config";
import axios from "axios";
import "./CartPage.css";

const CartPage = () => {
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const shopperData = useSelector((state) => state.shoper.shoperList);
  const [appointmentId, setAppointmentId] = useState(null);
  const [isAppointmentProcessing, setIsAppointmentProcessing] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBack = () => {
    navigate(-1);
  };

  const handleTotal = () => {
    let amount = 0;
    cartItems.forEach((data) => {
      amount += data.price * data.quantity;
    });
    setTotalAmount(amount);
  };

  useEffect(() => {
    handleTotal();
  }, [cartItems]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(updateCart(storedCart));
  }, [dispatch]);

  useEffect(() => {
    const shopperData = JSON.parse(localStorage.getItem("shoperCart"));
    dispatch(updateShoper(shopperData));
  }, [dispatch]);

  useEffect(() => {
    const localDa = JSON.parse(localStorage.getItem('shoperCart'));
    dispatch(updateShoper(localDa));
  }, [dispatch]);

  useEffect(() => {
    if (appointmentId) {
      handleOrderProcessing();
    }
  }, [appointmentId]);

  const handleShopperAppointment = async () => {
    const shopperData = JSON.parse(localStorage.getItem("shoperCart"));
    if (shopperData) {
      setIsAppointmentProcessing(true);
      try {
        const response = await axios.post(`http://${ipAddress}/liveshoper/api/v1/appointment-form/save-or-update`, {
          name: shopperData.name,
          mblNum: shopperData.mblNum,
          itemsList: shopperData.itemsList,
          lang: "TELUGU",
          date: shopperData.date,
          timeStampId: 1,
          employeeId: shopperData.employeeId,
          startTime: shopperData.startTime,
          endTime: shopperData.endTime
        });
        setAppointmentId(response.data.data.appointmentId);
        handleRemoveShopperFromCart();
      } catch (error) {
        console.error('There was an error!', error);
      } finally {
        setIsAppointmentProcessing(false);
      }
    }
  };

  const handleOrderProcessing = async () => {
    const productList = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const userData = JSON.parse(localStorage.getItem("userData"));
    try {
      const response = await axios.post(`http://${ipAddress}/liveshoper/api/v1/orders/save-or-update`, {
        totalAmount: totalAmount,
        orderStatus: "PENDING",
        appointmentId: appointmentId || 0, // Use appointmentId if present, otherwise use 0
        userId: userData.userId,
        orderDetails: productList
      });
      localStorage.removeItem('cart');
      console.log("response ", response.data)
      dispatch(updateCart([]));
      navigate("/order-success");
    } catch (error) {
      console.log("error ", error);
      navigate("/order-reject");
    }
  };

  const handleCheckout = async () => {
    setIsCheckoutSuccess(true);
    // Only proceed with appointment handling if shopperData is present
    if (shopperData) {
      await handleShopperAppointment();
    } else {
      // Handle checkout directly without appointment
      await handleOrderProcessing();
    }
    setIsCheckoutSuccess(false);
  };

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = storedCart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    saveCartToLocalStorage(updatedCart);
    dispatch(updateCart(updatedCart));
  };

  const decreaseQuantity = (id) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = storedCart
      .map(item =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    saveCartToLocalStorage(updatedCart);
    dispatch(updateCart(updatedCart));
  };

  const handleRemoveItemFromCart = (id) => {
    const storedData = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedData = storedData.filter((item) => item.id !== id);
    saveCartToLocalStorage(updatedData);
    dispatch(updateCart(updatedData));
  };

  const handleRemoveShopperFromCart = () => {
    localStorage.removeItem("shoperCart");
    dispatch(updateShoper(null));
  };

  const handleProductClick = (productData) => {
    navigate("/products", { state: { data: productData } });
  };

  return cartItems.length === 0 && shopperData == null ? (
    <div>
      <div className="back-btn" onClick={() => handleBack()}><FaArrowLeft /></div>
      <div className="cart-state">
        Cart is empty
      </div>
    </div>
  ) : (
    <div className="cart-wrapper">
      <ScrollToTop />
      <div className="cart-container">
        <div style={{ display: "flex" }}>
          <div className="cart-back-btn" onClick={() => handleBack()}><FaArrowLeft /></div>
          <div style={{ fontSize: "x-large", fontWeight: "600", position: "relative", left: "20px" }}>Cart</div>
        </div>

        {shopperData != null && shopperData.name && (
          <div className="shopperCont">
            <div className="card-left">
              <div className="prod-image">
                <img src={img1} alt="ad" className="cart-img" />
              </div>
              <div className="card-right">
                <div style={{ fontWeight: "900" }}>{shopperData.name}</div>
                <div>{shopperData.date}</div>
              </div>
            </div>
            <div className="cart-btn" onClick={() => handleRemoveShopperFromCart()}>
              <MdOutlineDeleteOutline fontSize={30} />
            </div>
          </div>
        )}

        {cartItems.map((eachProd) => (
          <div className="prod" key={eachProd.id}>
            <div className="cart-card">
              <div className="card-left">
                <div className="prod-image">
                  <img src={eachProd?.imageKey} alt="ad" className="cart-img" />
                </div>
                <div className="card-detail">
                  <h4>{eachProd.name}</h4>
                  <p>Price : ₹{eachProd?.price}</p>
                  <div className="quantity-container">
                    <button onClick={() => decreaseQuantity(eachProd.id)} className="quantity-btn">-</button>
                    <p className="quantity">{eachProd?.quantity}</p>
                    <button onClick={() => increaseQuantity(eachProd.id)} className="quantity-btn">+</button>
                  </div>
                </div>
              </div>
              <div className="cart-btn" onClick={() => handleRemoveItemFromCart(eachProd.id)}>
                <MdOutlineDeleteOutline fontSize={30} />
              </div>
            </div>
          </div>
        ))}

        <div className="cart-total">
          <Link to="/">
            <button className="card-btn">Add more items</button>
          </Link>
          <div>
            <div>Total Cart Value : ₹{totalAmount}</div>
          </div>
        </div>

        <div className="checkout-btn-container" onClick={handleCheckout}>
          {!isCheckoutSuccess ? "Checkout" : <div className="checkout-loading"><Lottie animationData={loading} /></div>}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
