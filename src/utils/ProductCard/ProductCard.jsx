import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import fetchImageUrl from "../../fetchImageUrl";
import { useNavigate } from "react-router-dom";
import WishList from "../../components/wishlist/WishList";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, updateCart, incrementQuantity, decrementQuantity } from "../../Slices/CartSlice";
import { TiMinus } from "react-icons/ti";
import { TiPlus } from "react-icons/ti";


const ProductCard = (data) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProductInCart, setIsProductInCart] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await fetchImageUrl(data.data.productImageKey);
        setImageUrl(url);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(err);
      }
    };

    fetchUrl();
  }, [data]);

  // localStorage.removeItem("wishlist")
  useEffect(() => {
    // Load cart items from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(updateCart(storedCart));
  }, []);

  useEffect(() => {
    // Check if the product is in the cart
    const item = cartItems.find(product => product.id === data.data.productId);
    setIsProductInCart(!!item);
  }, [cartItems, data.data.productId]);

  const handleProductClick = () => {
    navigate("/products", { state: { data: data.data } });
  };

  const saveCartToLocalStorage = (updatedCart) => {
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const addToCartHandler = (id, name, price, imageKey, description) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const newItem = { id, name, price, imageKey, description, quantity: 1 };
    const updatedCart = [...storedCart, newItem];
    saveCartToLocalStorage(updatedCart);
    dispatch(addItemToCart(newItem));
    setIsProductInCart(true);
    console.log("new cart data ", newItem);
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
    if (!updatedCart.find(item => item.id === id)) {
      setIsProductInCart(false);
    }
  };

  return (
    <div className="card-wrapper product-card-wapper">
      <div className="card-container">
      <div className="wishList"><WishList data={data.data} size={20}/></div>
        <div onClick={handleProductClick}>
          <div className="product-image-container">

            <img loading="eager" src={imageUrl} alt="product image" className="product-image" />
          </div>
          <div className="product-info">
            {data.data.productName.length < 18 ? (
              <p className="product-details">{data.data.productName}</p>
            ) : (
              <p className="product-details">{data.data.productName.slice(0, 18) + "..."}</p>
            )}
            <div className="prices">
              <p className="product-discounted-price" style={{ color: 'green', fontWeight: '400' }}>₹{data.data.price}</p>
            </div>
          </div>
        </div>
        {isProductInCart ? (
          <div className="eachprod-quantity-container">
            <p onClick={() => decreaseQuantity(data.data.productId)} className="quantity-btn"><TiMinus size={11}/></p>
            <p className="quantity">{cartItems.find(item => item.id === data.data.productId)?.quantity}</p>
            <p onClick={() => increaseQuantity(data.data.productId)} className="quantity-btn"><TiPlus size={11}/></p>
          </div>
        ) : (
          <div className="add-to-cart" onClick={() => addToCartHandler(data.data.productId, data.data.productName, data.data.price, imageUrl, data.data.productDescription)}>ADD TO CART</div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
