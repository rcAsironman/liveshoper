import React from "react";
import "./ProductsContainer.css";
import SliderComp from "../Slider/SliderComp";
import { Link } from "react-router-dom";
import ProductCard from "../../utils/ProductCard/ProductCard";

const ProductsContainer = () => {


  const categoery = [
    {
      catgName: 'Popular Products'
    },
    {
      catgName: 'Handpicked Products By Liveshoper'
    },
    {
      catgName: 'Popular Products'
    }
  ]
  return (
    <div className="wrapper">
      <div className="productscontainer-top">
        <h3>Products Available</h3>
      </div>
      <div className="slider-container">

        {
          categoery.map((data, index) => {
            return (
              <div key={index}>
                <div className="products-sub-heading-container">
                  <h4>{data.catgName}</h4>

                  <Link
                    onClick={window.scrollTo(0, 0)}
                    className="link"
                    to="/popular"
                  >
                    <p className="view-more">
                      View More <img src="arrow-right.svg" alt="product image" />
                    </p>
                  </Link>
                </div>
                <SliderComp route="/products" Component={ProductCard} />
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default ProductsContainer;
