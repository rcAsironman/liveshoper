import "./CartPage.css";
import React, {useEffect, useState} from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import loading from "../../lottie/loading.json"
import { FaArrowLeft } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../../components/ScrollToTop";
import { updateCart } from "../../Slices/CartSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineDeleteOutline } from "react-icons/md";

const CartPage = () => {

  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0)
  const [isProductInCart, setIsProductInCart] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const navigation = useNavigate()
  const dispatch = useDispatch()

  const handleBack = () => {
    navigation(-1);
  }

  const handleTotal = () => {
    let amount = 0;

    cartItems.map((data)=>{
      amount += (data.price * data.quantity)
    })
    setTotalAmount(amount)
  }

  
  useEffect(()=>{
    handleTotal()
  },[cartItems])

  // inorder to main the cart data even the page is refreshed. in cart page 


 useEffect(()=>{
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  dispatch(updateCart(storedCart))

 },[])
  

  
  const handleCheckout = () => {
    setIsCheckoutSuccess(!isCheckoutSuccess)
  }

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = storedCart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    console.log(id ,"updated cart ", updatedCart)
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
    if (!updatedCart.find(item => item.id === id)) {
      setIsProductInCart(false);
    }
  };

  const handleRemoveItemFromCart = (id) =>{
    const storedData = JSON.parse(localStorage.getItem("cart")) || []
    const updatedData = storedData.filter((item)=> item.id != id)
    saveCartToLocalStorage(updatedData)
    dispatch(updateCart(updatedData))

  }

  return cartItems.length == 0 ? (
    <div>
      <div className="back-btn" onClick={() => handleBack()}><FaArrowLeft /></div>
      <div className="cart-state ">
        Cart is empty
      </div>
    </div>
  ) : (
    <div className="cart-wrapper">
      <ScrollToTop/>
      <div className="cart-container ">
        <div style={{display: "flex",}}><div className="cart-back-btn" onClick={() => handleBack()}><FaArrowLeft /></div>
        <div style={{fontSize: "x-large", fontWeight: "600", position: "relative", left: "20px"}}>Cart</div>
        </div>
        {cartItems.map((eachProd) => (
          <div className="prod" key={eachProd.id}>
    
            <div className="cart-card">
              <div className="card-left">
                <div className="prod-image">
                  <img src={eachProd?.imageKey} alt="ad" className="cart-img" />
                </div>
                <div className="card-detail">
                  <h4 >{eachProd.name} </h4>
                  <p >Price : ₹{eachProd?.price}</p>
                  <div className="quantity-container">
                    <button
                      onClick={() => decreaseQuantity(eachProd.id)}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <p className="quantity">{cartItems.find(item => item.id === eachProd.productId)?.quantity}</p>
                    <p className="quantity">{eachProd?.quantity}</p>
                    <button
                     onClick={() => increaseQuantity(eachProd.id)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
             
                <div
                  className="cart-btn"
                  onClick={() => handleRemoveItemFromCart(eachProd.id)}
                >
                  <MdOutlineDeleteOutline fontSize={30}/>
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
        <div className="checkout-btn-container" onClick={() => { handleCheckout() }}>
          {
            !isCheckoutSuccess ? (<>Checkout</>)
              :
              (<div>
                <Lottie animationData={loading}></Lottie>
              </div>)
          }

        </div>
      </div>

    </div>
  );
};

export default CartPage;
