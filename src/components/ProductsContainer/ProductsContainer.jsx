import React, { useState, useEffect } from "react";
import "./ProductsContainer.css";
import SliderComp from "../Slider/SliderComp";
import { Link } from "react-router-dom";
import ProductCard from "../../utils/ProductCard/ProductCard";
import axios from "axios";
import Lottie from "lottie-react";
import loadingBox from "../../lottie/loadingBox.json";
import { useDispatch, useSelector } from "react-redux";
import { storeData, clearData, storeCatg, clearCatg } from "../../Slices/InitialDataFetchSlice";
import { ipAddress } from "../../config";

const ProductsContainer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [catg, setCatg] = useState([]);
  const [subCatg, setSubCatg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const initialDataFromApi = useSelector((state) => state.initialDataFromApi.data);
  const catgRedux = useSelector((state) => state.initialDataFromApi.catg);
  const [selectedOption, setSelectedOption] = useState(catgRedux);
  const [categoreyFromApi, setCategoeryFromApi] = useState([]);


  // Fetch all categories like Top-rated, hand-picked 
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://${ipAddress}/liveshoper/api/v1/category/find-all-categories?page=0&size=10`);
      const categoeryData = response.data.data.content.map(item => ({
        categoryId: item.categoryId,
        categoryName: item.categoryName
      }));
      setCategoeryFromApi(categoeryData);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all sub-categories like snacks, clothing, Decoration
  const fetchSubCategories = async () => {

    console.log("fetch subcatg is called")
    try {
      const response = await axios.get(`http://${ipAddress}/liveshoper/api/v1/sub-category/find-all-sub-categories?page=0&size=100`);
      setCatg(response.data.data.content);
      return response.data.data.content
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch products by category and sub-category
  const fetchProducts = async (subCatgId, name) => {
    setIsLoading(true);
    setIsOpen(false);
    setSubCatg([]);
    setSelectedOption(name);

    try {
      const requests = categoreyFromApi.map(async (item) => {
        try {
          const response = await axios.get(`http://${ipAddress}/liveshoper/api/v1/product/find-by-category-and-sub-category?categoryId=${item.categoryId}&subCategoryId=${subCatgId}&page=0&size=12`);
          return {
            categoryId: item.categoryId,
            categoryName: item.categoryName,
            content: response.data.data.content
          };
        } catch (error) {
          console.log(error);
          return { categoryName: item.categoryName, content: [] };
        }
      });

      const responses = await Promise.all(requests);
      const updatedData = responses.map(data => ({
        categoryId: data.categoryId,
        categoryName: data.categoryName,
        content: data.content
      }));

      setSubCatg(updatedData);
      dispatch(clearData());
      dispatch(storeData(updatedData));
      dispatch(storeCatg(name))
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


 

  // Initial data fetch or use Redux store data
  useEffect(() => {
    if (!initialDataFromApi || initialDataFromApi.length === 0) {
      //calling this function to fetch Top-rated, Hand Picked e.t.c
      fetchCategories().then(() => {

        //This method is for fetching snacks, Clothing e.t.c
        fetchSubCategories().then((response) => {

          fetchProducts(response[4].subCategoryId, response[4].subCategoryName);
        });

      });
    } else {
      setSubCatg(initialDataFromApi);
    }
  }, [initialDataFromApi, dispatch,]);

  const toggleMenu = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
    if (!isOpen && catg.length === 0) {
      fetchSubCategories();
    }
  };

  return (
    <div className="wrapper">
      <div className="pro-box"></div>
      <div className="productscontainer-top">
        <h3>Products Available</h3>
        <div className="menu">
          <div onClick={toggleMenu} className="selectCatg">
            {isOpen ? "close" : selectedOption}
          </div>
        </div>
      </div>

      {isOpen ? (
        <div className="toggle-menu">
          <div className="dropdown-menu">
            <ul>
              {catg.map((data) => (
                <li key={data.subCategoryId} onClick={() => fetchProducts(data.subCategoryId, data.subCategoryName)}>
                  {data.subCategoryName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="slider-container">
          {isLoading ? (
            <div className="loading-box">
              <Lottie animationData={loadingBox} style={{ width: "200px", height: "200px" }} />
            </div>
          ) : (
            subCatg.map((data, index) => (
              data.content.length > 0 && (

                <div key={index}>
                  <div className="products-sub-heading-container">
                    <h4>{data.categoryName}</h4>
                    <Link className="link"

                      to="/popular"
                      state={{
                        categoryData: data,
                        page: 0,
                        category: selectedOption,
                        catgId: data.content.length > 0 ? data.content[0].subCategoryId : 0

                        //data.content[0].subCategoryId.subCategoryId
                      }}>
                      <div className="view-more">
                        View More <img src="arrow-right.svg" alt="product image" className="right-arrow"/>
                      </div>
                    </Link>
                  </div>
                  <SliderComp Component={ProductCard} productData={data.content} />
                </div>
              )
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ProductsContainer;
