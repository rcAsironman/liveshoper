import React from "react";
import "./ShoppersContainer.css";
import SliderComponentForShoper from "../sliderComponentForShopper/SliderComponentForShoper";
import { Link } from "react-router-dom";
import ProfileCard from "../../utils/ProfileCard/ProfileCard";

const ShoppersContainer = () => {



  return (
    <div className="wrapper">
      <div className="productcontainer-top" >
        <h3>Shoppers Available now</h3>
        <p>
          <Link onClick={window.scrollTo(0, -20)} className="link" to="/shoppers">
            View More
            <img src="arrow-right.svg" alt="" />
          </Link>
        </p>
      </div>
      {/*pass data to slidercomponent for different categories */}
      <SliderComponentForShoper route={"shoppers"} Component={ProfileCard} />
    </div>
  );
};

export default ShoppersContainer;
