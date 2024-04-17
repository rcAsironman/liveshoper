import React from "react";
import Data from "../../utils/Data";
import { Link } from "react-router-dom";
import ProfileCard from "../../utils/ProfileCard/ProfileCard";
import { useNavigate } from "react-router-dom";

const AllShopperListing = () => {
  
  const navigation = useNavigate();

  const goBack = () => {
    navigation(-1);
  }
  return (
    <div className="wrapper">
      <div className="back-btn" onClick={()=>{goBack()}}>back</div>
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
