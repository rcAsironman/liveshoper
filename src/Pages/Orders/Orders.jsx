import React from 'react'
import { Link, Outlet,useNavigate } from 'react-router-dom'
import "./Orders.css"
import { useState, useEffect } from 'react'
import { FaArrowLeft} from 'react-icons/fa'
import ScrollToTop from "../../components/ScrollToTop"
import { useDispatch } from 'react-redux'
import { updateCart } from '../../Slices/CartSlice'
import { updateShoper } from '../../Slices/ShoperSlice'






const Orders = () => {

  const dispatch = useDispatch()
   const [activeLink, setactiveLink] = useState("Ongoing");
   console.log(activeLink);
   const navigation = useNavigate()
   const handleBack = () => {
     navigation("/");
   }

   useEffect(() => {
    // Load cart items from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(updateCart(storedCart));
  }, []);

 

  useEffect(()=>{
    const localDa = JSON.parse(localStorage.getItem('shoperCart'))
    dispatch(updateShoper(null))
    if(localDa)
      {
        dispatch(updateShoper(localDa))
      }
      else{
        dispatch(updateShoper(null))
      }
  },[])
  return (
    <div>
      <ScrollToTop/>
      <div className="back-btn" onClick={()=> handleBack()}><FaArrowLeft/></div>
      <div className="orders-wrapper">
        
        <div className="orders-top">
          <Link
            onClick={() => setactiveLink("Ongoing")}
            className="link "
            to="/orders/ongoing"
          >
            <p
              className={`orders-link  ${
                activeLink === "Ongoing" ? "present-link" : ""
              } `}
            >
              Ongoing
            </p>
          </Link>
          <Link
            onClick={() => setactiveLink("Completed")}
            className="link "
            to="/orders/ordercompleted"
          >
            <p
              className={`orders-link  ${
                activeLink === "Completed" ? "present-link" : ""
              } `}
            >
              {" "}
              Completed
            </p>
          </Link>
        </div>
        <div className="orders-bottom">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Orders