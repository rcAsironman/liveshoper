import React from 'react'
import { Link, Outlet,useNavigate } from 'react-router-dom'
import "./Orders.css"
import { useState } from 'react'
import { FaArrowLeft} from 'react-icons/fa'

const Orders = () => {
   const [activeLink, setactiveLink] = useState("Ongoing");
   console.log(activeLink);
   const navigation = useNavigate()
   const handleBack = () => {
     navigation("/");
   }

  return (
    <div>
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