import React, { useState, useEffect } from "react";
import "./ProductsContainer.css";
import SliderComp from "../Slider/SliderComp";
import { Link } from "react-router-dom";
import ProductCard from "../../utils/ProductCard/ProductCard";
import axios from "axios";
import Lottie from "lottie-react";
import loadingBox from "../../lottie/loadingBox.json"
import { useDispatch, useSelector } from "react-redux";
import { storeData } from "../../Slices/InitialDataFetchSlice";
import { clearData } from "../../Slices/InitialDataFetchSlice";
import { storeCatg } from "../../Slices/InitialDataFetchSlice";
import { clearCatg } from "../../Slices/InitialDataFetchSlice";

const ProductsContainer = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [catg, setCatg] = useState([]);
  const [subCatg, setSubCatg] = useState(null);
  const [keys, setKeys] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const initialDataFromApi = useSelector((state) => state.initialDataFromApi.data)
  const [initialData, setInitialData] = useState(initialDataFromApi)

  const catgRedux = useSelector((state) => state.initialDataFromApi.catg)
  const [selectedOption, setSelectedOption] = useState(catgRedux)

  useEffect(() => {

    if (!initialData) {
      console.log("in in side useEffect if block")
      handleCategoery()
      handleSubCatg(2, "snacks")
    }
    else{
      console.log("in in side useEffect else block") 
      setSubCatg(initialData)
    }

  }, [])




 const fetchReduxData = () => {
  const dataReduxSet = useSelector((state) => state.initialDataFromApi.sate)
  setInitialData(dataReduxSet)
 }
  const toggleMenu = (event) => {
    event.preventDefault(); // Prevent default behavior

    setIsOpen(!isOpen);
    if (isOpen !== true && catg.length === 0) {
      handleCategoery()
    }
  };

  const handleCategoery = async () => {



    axios.get(`http://65.2.73.20:8080/liveshoper/api/v1/sub-category/find-all-sub-categories?page=0&size=100`)
      .then((response) => {
        setCatg(response.data.data.content)
      })
      .catch((error) => {
        console.log(error)
      })
  }



  const handleSubCatg = async (catgId, name) => {

    dispatch(clearCatg())
    dispatch(storeCatg(name))
    setIsLoading(true)
    setIsOpen(false);
    setSubCatg(null);
    setSelectedOption(name)
    setKeys([])
    try {
      const updatedData = [];
      for (let i = 1; i < 6; i++) {
        const response = await axios.get(`http://65.2.73.20:8080/liveshoper/api/v1/product/find-by-category-and-sub-category?categoryId=${i}&subCategoryId=${catgId}&page=0&size=15`);
        const initialCatg = {};
        initialCatg[`${response.data.data.content[0][0].CatName}`] = response.data.data.content[0][0].products;
        updatedData.push(initialCatg);
      }
       setSubCatg(updatedData);
       dispatch(clearData())
       setInitialData(null)
       dispatch(storeData(updatedData))
       
    } catch (error) {
      console.log(error);
    }

  };

  useEffect(() => {
    if (subCatg !== null) {

      const key = []

      for (let i = 0; i < subCatg.length; i++) {
        const eachKey = Object.keys(subCatg[i])
        key.push(eachKey[0])
      }
      // Execute further actions after data is fetched and assigned
      setKeys(key)
      setIsLoading(false)
    }
  }, [subCatg]);




  return (
    <div className="wrapper">

      <div className="pro-box">

      </div>
      <div className="productscontainer-top">
        <h3>Products Available</h3>
        <div className="menu">
          <div onClick={(event) => toggleMenu(event)} className="selectCatg">{isOpen == true ? "close" : catgRedux}</div>

        </div>
      </div>



      {
        isOpen == false ? (
          <div className="slider-container">


            {
              isLoading ? (<div className="loading-box">
                <Lottie animationData={loadingBox} style={{ width: "200px", height: "200px" }} />
              </div>) : (<>
                {
                  keys.map((data, index) => {
                    return (

                      <div key={index}>
                        <div className="products-sub-heading-container">
                          <h4>{data}</h4>
                          <Link
                            className="link"
                            to="/popular"
                            
                          >
                            <p className="view-more">
                              View More <img src="arrow-right.svg" alt="product image" />
                            </p>
                          </Link>
                        </div>
                        <SliderComp Component={ProductCard} productData={subCatg[index][data]} />
                      </div>
                    );
                  })
                }
              </>)
            }
          </div>
        ) :

          (
            <div className="toggle-menu">
              {
                isOpen && (

                  <div className="dropdown-menu">

                    <ul>
                      {
                        catg.map((data, key) => {
                          return (
                            <>
                              <li key={key} onClick={() => handleSubCatg(data.subCategoryId, data.subCategoryName)}>{data.subCategoryName}</li>
                            </>


                          )
                        })
                      }
                    </ul>

                  </div>
                )
              }
            </div>
          )
      }


    </div>
  );
};

export default ProductsContainer;
