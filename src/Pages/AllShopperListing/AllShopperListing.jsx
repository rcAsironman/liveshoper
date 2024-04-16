import React from "react";
import Data from "../../utils/Data";
import { Link } from "react-router-dom";
import ProfileCard from "../../utils/ProfileCard/ProfileCard";

const AllShopperListing = () => {
  
  return (
    <div className="wrapper">
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
