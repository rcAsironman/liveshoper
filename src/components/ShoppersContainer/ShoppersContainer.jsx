import React, {useState, useEffect} from "react";
import "./ShoppersContainer.css";
import SliderComponentForShoper from "../sliderComponentForShopper/SliderComponentForShoper";
import { Link } from "react-router-dom";
import ProfileCard from "../../utils/ProfileCard/ProfileCard";
import axios from "axios";
import { ipAddress } from "../../config";

const ShoppersContainer = () => {
  const [shopperData, setShopperData] = useState([]);
  
  useEffect(() => {
    axios
      .get(`http://${ipAddress}/liveshoper/api/v1/employee/get-all-employees?page=0&size=15`)
      .then((response) => {
        setShopperData(response.data.data['content']);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <div className="wrapper">
      <div className="productcontainer-top" >
        <h3>Shoppers Available now</h3>
        <p>
          <Link className="link" to="/shoppers"
          state={{
            data: shopperData,
            page: 0
          }}
          >
            View More
            <img src="arrow-right.svg" alt="" />
          </Link>
        </p>
      </div>
      {/*pass data to slidercomponent for different categories */}
      <SliderComponentForShoper route={"shoppers"} Component={ProfileCard} data={shopperData}/>
    </div>
  );
};

export default ShoppersContainer;
