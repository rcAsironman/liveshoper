import React from "react";
import Data from "../../utils/Data";
import { Link } from "react-router-dom";
import ProfileCard from "../../utils/ProfileCard/ProfileCard";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft} from 'react-icons/fa'

const AllShopperListing = () => {
  
  const navigation = useNavigate();

  const handleBack = () => {
    navigation("/");
  }
  return (
    <div className="wrapper">
      <div style={{width: '40px', height: '40px', backgroundColor: 'rgb(212, 212, 212)', display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', marginBottom: '20px'}} className="allShop-back-btn" onClick={()=> handleBack()}><FaArrowLeft/></div>
      <div className="products-container">
        {Data.map((item) => (
          <Link onClick={window.scrollTo(0,0)} key={item.id} to={`/shoppers/${item.id}`}>
            <ProfileCard />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllShopperListing;
