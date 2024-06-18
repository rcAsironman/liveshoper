import React, { useEffect, useState } from "react";
import Data from "../../utils/Data";
import { Link, useLocation } from "react-router-dom";
import ProfileCard from "../../utils/ProfileCard/ProfileCard";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft} from 'react-icons/fa'
import axios from "axios";
import Lottie from "lottie-react";
import loading from "../../lottie/loading1.json";
import { ipAddress } from "../../config";

const AllShopperListing = () => {
  
  const navigation = useNavigate();
  const location = useLocation()
  const {data, page} = location.state || {}
  const [shopperData, setShopperData] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [isLoading, setIsloading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  useEffect(()=>{
    if(data)
      {
        setShopperData(data.length> 0? data : [])
        // id data is present then the default value page is 0
        setCurrentPage(page+1)
      }
  },[data])
  const handleBack = () => {
    navigation("/");
  }

  
  const fetchShoppersData = async () => {
    console.log("shopper data is fetched ")
    try{
        const response = await axios.get(`http://${ipAddress}/liveshoper/api/v1/employee/get-all-employees?page=${currentPage}&size=12`)
        
        setShopperData((previousData) => [...previousData, ...response.data.data['content']]);
        setIsloading(false)
        if(response.data.data['content'] < 12)
          {
            console.log("inside if block, data is less than 12")
            setHasMore(false)
          }
    }
    catch (error){
      setIsloading(false)
      console.log(error)
    }
  }

  useEffect(()=>{
    fetchShoppersData()
  },[currentPage])

  const handleScroll = () =>{
    const {scrollTop, clientHeight, scrollHeight} = document.documentElement
    if(scrollTop + clientHeight >= scrollHeight-10 && !isLoading)
      {
        setIsloading(true)
        setCurrentPage((pre)=> pre+1)
      }
  }
  useEffect(()=>{
    window.addEventListener('scroll', handleScroll)

    return () => window.removeEventListener('scroll', handleScroll)
  },[])
  return (
    <div className="wrapper">
      <div style={{width: '40px', height: '40px', backgroundColor: 'rgb(212, 212, 212)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', marginBottom: '20px'}} className="allShop-back-btn" onClick={()=> handleBack()}><FaArrowLeft/></div>
      <div className="products-container">
        {shopperData.map((item, index) => (
          <Link  key={item.id} to={`/shoppers/${item.id}`}
         
          state={{
            data: item
          }}
          >
            <ProfileCard  id={item.employeeId} name={item.name} location={item.address} />
          </Link>
        ))}
      </div>
      {isLoading && hasMore && (
        <div className="load-more-products">
          <Lottie animationData={loading} alt="loading..." className="loading-lottie" />
        </div>
      )}
      {!hasMore && (
        <div className="end-of-page">
          <p>End of the page</p>
        </div>
      )}
    </div>
  );
};

export default AllShopperListing;
