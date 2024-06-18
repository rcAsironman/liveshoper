import React, { useEffect, useState } from "react";
import "./EachShopperPage.css"; // Styling for the component
import { useSearchParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { FaArrowLeft} from 'react-icons/fa'
import ScrollToTop from "../../components/ScrollToTop";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateCart } from "../../Slices/CartSlice";
import { updateShoper } from "../../Slices/ShoperSlice";
const EachShopperPage = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation();
  const {data} = location.state || {}
  const [shopperData, setShopperData] = useState(data);
  const [list, setList] = useState("");
  const [date, setDate] = useState("");
  const [bookedData, setBookedData] = useState()
  const [isBooked, setIsBooked] = useState(false)
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('10:00');
  const [isDisabled, setIsDisabled] = useState(false)
  const [removeAccess, setRemoveAccess] = useState(false)
  useEffect(()=>{
    setShopperData(data)
  },[data])
  const handleGoBack = () => {
    navigate(-1)
  }

  console.log("data ", data)

  useEffect(() => {
    if (isBooked) {
    }
  }, [isBooked, bookedData]);
  
  
  useEffect(() => {
    // Load cart items from local storage
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch(updateCart(storedCart));
    const shoper = JSON.parse(localStorage.getItem('shoperCart'))
    if(shoper)
      {
        
        console.log("shopper data ", shoper['employeeId'])
        console.log("data ",data['employeeId'])
        if(shoper['employeeId'] != data['employeeId'])
          {
            setRemoveAccess(true)
          }
          else{
            setIsBooked(true)
            setList(shoper['itemsList'])
            setDate(shoper['date'])
            setIsDisabled(true)
            setBookedData(shoper) 
            dispatch(updateShoper(shoper))
            setRemoveAccess(false)
            setStartTime(shoper['startTime'])
            setEndTime(shoper['endTime'])
          }
       
      }
  }, []);



  const [minDate, setMinDate] = useState('');
  useEffect(() => {
    // Get the current date
    const today = new Date();
    // Format the date as YYYY-MM-DD
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${yyyy}-${mm}-${dd}`;
    setMinDate(formattedDate);
  }, []);


//   axios.post('http://65.2.73.20:8080/liveshoper/api/v1/appointment-form/save-or-update', {
//   name: "Suresh",
//   mblNum: 7894561230,
//   itemsList: "1",
//   lang: "TELUGU",
//   date: "2024-06-05T12:14:45.777Z",
//   timeStampId: 1,
//   employeeId: 2
// })
// .then(response => {
//   console.log(response.data);
// })
// .catch(error => {
//   console.error('There was an error!', error);
// });

// localStorage.removeItem("shoperCart")
  const handleShoperBooking = (shopperData) => {

  

    console.log("Shopper Data ", shopperData)
  const shoperBookingData = {
      name: shopperData.name,
      mblNum: shopperData.userId.mblNum,
      itemsList: list,
      lang: "TELUGU",
      date: date,
      timeStampId: 1,
      employeeId: shopperData.employeeId, 
      startTime: startTime ,
      endTime: endTime
  } 

  localStorage.setItem("shoperCart", JSON.stringify(shoperBookingData))
  
  const localDa = JSON.parse(localStorage.getItem('shoperCart'))
  setBookedData(localDa)
  if(localDa && list != "")
    {
      setIsDisabled(true)
      setIsBooked(true)
      dispatch(updateShoper(localDa))
    }
  }



  const handleShoperBookingRemoveBooking = () => {

  localStorage.removeItem("shoperCart")
  const localDa = JSON.parse(localStorage.getItem('shoperCart'))
  setBookedData(localDa)
  setIsDisabled(false)
  setIsBooked(false)
  dispatch(updateShoper({}))
  setList("")
  setDate("") 
  }


  return (
    <div className="wrapper">
      <ScrollToTop/>
      <div className="back-btn shopper-back-btn" onClick={()=> handleGoBack()}><FaArrowLeft/></div>
      <div className="profile-form-container">
        <div className="profile-details">
          <div className="profile-picture">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/220px-Outdoors-man-portrait_%28cropped%29.jpg" alt="" />
          </div>
          <div className="profile-details ">
            <div className="name shopper-detail">
              <p>Name:</p>
              <p>{shopperData.name}</p>
            </div>
            <div className="experience shopper-detail">
              <p>Location:</p>
              <p>{shopperData.address}</p>
            </div>
            <div className="experience shopper-detail">
              <p>Gender:</p>
              <p>{shopperData.gender}</p>
            </div>
            <div className="experience shopper-detail">
              <p>Exp:</p>
              <p>2+</p>
            </div>
            
            <div className="language shopper-detail">
              <p>Languages:</p>
              <p>Telugu,English,Hindi</p>
            </div>
          </div>
        </div>
        {
          !removeAccess ? ( <div className="form-fields">
            <div className="date-time-input">
              <div className="field">
                <label htmlFor="date">Date</label>
                <input
                  className="shopper-input"
                  type="date"
                  id="date"
                  name="date"
                  min={minDate}
                  value={date}
                  onChange={(e)=>setDate(e.target.value)}
                  disabled={isDisabled}
                />
              </div>
              <div className="time-slot">
              <div className="field">
                <label htmlFor="time">start Time</label>
                <input
                  className="shopper-input"
                  type="time"
                  id="time"
                  name="time"
                  value={startTime}
                  onChange={(e)=>setStartTime(e.target.value)}
                  disabled={isDisabled}
                />
                
              </div>
              <div className="field">
              <label htmlFor="time">End Time</label>
                <input
                  className="shopper-input"
                  type="time"
                  id="time"
                  name="time"
                  value={endTime}
                  min={startTime}
                  onChange={(e)=>setEndTime(e.target.value)}
                  disabled={isDisabled}
                />
              </div>
              </div>
            </div>
            <br></br>
            {/* <div>
              <label>preferred language</label>
              <br/>
                <div className="select-lang">select Language</div>
                <div className="lang-options">
                  <ul>
                    <li>Telugu</li>
                    <li>Telugu</li>
                    <li>Telugu</li>
                    <li>Telugu</li>
                    <li>Telugu</li>
                    <li>Telugu</li>
                    <li>Telugu</li>
                    <li>Telugu</li>
                    <li>Telugu</li>
  
                  </ul>
                </div>
            </div> */}
            <div className="message-textarea">
              <label htmlFor="message" >List Of Items:</label>
              <textarea disabled={isDisabled} value={list} onChange={(e)=>{setList(e.target.value)}} id="message" name="message" rows="8" cols="50" placeholder="Enter Items Eg: 1) item1,2) item 2"/>
            </div>
            {
              !isBooked ?(        <div className="shopper-book-now-btn" onClick={()=> handleShoperBooking(shopperData)}>Add to cart</div>
            ) : (
              <div className="shopper-book-now-btn" onClick={()=> handleShoperBookingRemoveBooking() }>Remove from cart</div>
            )
            }
          </div>) 

          : (<div className="not-allowed">
            your shopper is already in your cart...
          </div>)
        }
      </div>
    </div>
  );
};

export default EachShopperPage;
