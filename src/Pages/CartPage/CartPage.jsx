import { useDispatch, useSelector } from "react-redux";
import "./CartPage.css";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../Slices/CartSlice";
import { AiTwotoneDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const dispatch = useDispatch();
  const totalAmount = cart.reduce((acc, curr) => acc + (curr.quantity * curr.price), 0);

  return cart.length===0 ? (
    <div className="cart-state ">
      Cart is empty
    </div>
  ) : (
    <div className="wrapper">
      <div className="cart-container ">
        {cart.map((eachProd) => (
          <div className="prod" key={eachProd.id}>
            <div className="cart-card">
              <div className="card-left">
                <div className="prod-image">
                  <img src={eachProd?.images[0]} alt="ad" className="cart-img" />
                </div>
                <div className="card-detail">
                  <h4 >{eachProd.title} </h4>
                  <p >Price :{eachProd?.price}$</p>
                  <div className="quantity-container">
                    <button
                      onClick={() => {
                        dispatch(decreaseQuantity(eachProd.id));
                      }}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <p className="quantity">{eachProd?.quantity}</p>
                    <button
                      onClick={() => {
                        dispatch(increaseQuantity(eachProd.id));
                      }}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-right">
                <button
                  className="cart-btn"
                  onClick={() => dispatch(removeFromCart(eachProd.id))}
                >
                  <AiTwotoneDelete fontSize={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="btn-container">
          <Link to="/">
            <button className="card-btn">Add more items</button>
          </Link>
          <button className="card-btn">Checkout</button>
        </div>
      </div>
      <div className="cart-total">
        <h3>Total Cart Value :</h3>
        <p>{totalAmount}$</p>
      </div>
    </div>
  );
};

export default CartPage;
