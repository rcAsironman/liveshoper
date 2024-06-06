import React, {useState, useEffect} from 'react';
import "./EachProductPage.css";
import ProductPageCard from '../../components/ProductPageCard/ProductPageCard';
import DescriptionBox from '../../components/DescriptionBox/DescriptionBox';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import ScrollToTop from '../../components/ScrollToTop';
import fetchImageUrl from '../../fetchImageUrl';

const EachProductPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { data } = state || {}; // Access item data from location state with fallback to an empty object
  console.log("in each product page the image data  ",data.productImageKey)
  
  const handleGoBack = () => {
    navigate(-1); // This will navigate back to the previous page
  };

  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await fetchImageUrl(data.productImageKey);
        setImageUrl(url);
        setLoading(false);
        console.log("image url ",url)
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(err)
      }
    };

    fetchUrl();

  }, [data]);

  return (
    <div className="product-wrapper">
      <ScrollToTop/>
      <div className="product-back-btn" style={{}} onClick={handleGoBack}><FaArrowLeft /></div>
      {data ? (
        <div className='product-content'>
            <ProductPageCard data={data} img={imageUrl}/> {/* Pass item as prop to ProductPageCard component */}
          <DescriptionBox description={data.productDescription
}/>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default EachProductPage;
