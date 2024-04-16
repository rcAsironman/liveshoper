import React from "react";
import './OnGoingProducts.css'
import { AiTwotoneDelete } from "react-icons/ai";

const OnGoingProducts = () => {
  const cartItems = [
    
      {
        id: 13,
        title: "Fog Scent Xpressio Perfume",
        description:
          "Product details of Best Fog Scent Xpressio Perfume 100ml For Men cool long lasting perfumes for Men",
        price: 13,
        discountPercentage: 8.14,
        rating: 4.59,
        stock: 61,
        brand: "Fog Scent Xpressio",
        category: "fragrances",
        thumbnail: "https://cdn.dummyjson.com/product-images/13/thumbnail.webp",
        images: [
          "https://cdn.dummyjson.com/product-images/13/1.jpg",
          "https://cdn.dummyjson.com/product-images/13/2.png",
          "https://cdn.dummyjson.com/product-images/13/3.jpg",
          "https://cdn.dummyjson.com/product-images/13/4.jpg",
          "https://cdn.dummyjson.com/product-images/13/thumbnail.webp",
        ],
      },
      {
        id: 17,
        title: "Tree Oil 30ml",
        description:
          "Tea tree oil contains a number of compounds, including terpinen-4-ol, that have been shown to kill certain bacteria,",
        price: 12,
        discountPercentage: 4.09,
        rating: 4.52,
        stock: 78,
        brand: "Hemani Tea",
        category: "skincare",
        thumbnail: "https://cdn.dummyjson.com/product-images/17/thumbnail.jpg",
        images: [
          "https://cdn.dummyjson.com/product-images/17/1.jpg",
          "https://cdn.dummyjson.com/product-images/17/2.jpg",
          "https://cdn.dummyjson.com/product-images/17/3.jpg",
          "https://cdn.dummyjson.com/product-images/17/thumbnail.jpg",
        ],
      },
    ,

    {
      id: 5,
      title: "Huawei P30",
      description:
        "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
      price: 499,
      discountPercentage: 10.58,
      rating: 4.09,
      stock: 32,
      brand: "Huawei",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/5/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/5/1.jpg",
        "https://cdn.dummyjson.com/product-images/5/2.jpg",
        "https://cdn.dummyjson.com/product-images/5/3.jpg",
      ],
    },

    ,
    {
      id: 3,
      title: "Samsung Universe 9",
      description:
        "Samsung's new variant which goes beyond Galaxy to the Universe",
      price: 1249,
      discountPercentage: 15.46,
      rating: 4.09,
      stock: 36,
      brand: "Samsung",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/3/thumbnail.jpg",
      images: ["https://cdn.dummyjson.com/product-images/3/1.jpg"],
    },
    {
      id: 4,
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/4/1.jpg",
        "https://cdn.dummyjson.com/product-images/4/2.jpg",
        "https://cdn.dummyjson.com/product-images/4/3.jpg",
        "https://cdn.dummyjson.com/product-images/4/4.jpg",
        "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      ],
    },
    {
      id: 4,
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/4/1.jpg",
        "https://cdn.dummyjson.com/product-images/4/2.jpg",
        "https://cdn.dummyjson.com/product-images/4/3.jpg",
        "https://cdn.dummyjson.com/product-images/4/4.jpg",
        "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      ],
    },
    {
      id: 4,
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/4/1.jpg",
        "https://cdn.dummyjson.com/product-images/4/2.jpg",
        "https://cdn.dummyjson.com/product-images/4/3.jpg",
        "https://cdn.dummyjson.com/product-images/4/4.jpg",
        "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      ],
    },
    {
      id: 4,
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/4/1.jpg",
        "https://cdn.dummyjson.com/product-images/4/2.jpg",
        "https://cdn.dummyjson.com/product-images/4/3.jpg",
        "https://cdn.dummyjson.com/product-images/4/4.jpg",
        "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      ],
    },
    {
      id: 4,
      title: "OPPOF19",
      description: "OPPO F19 is officially announced on April 2021.",
      price: 280,
      discountPercentage: 17.91,
      rating: 4.3,
      stock: 123,
      brand: "OPPO",
      category: "smartphones",
      thumbnail: "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/4/1.jpg",
        "https://cdn.dummyjson.com/product-images/4/2.jpg",
        "https://cdn.dummyjson.com/product-images/4/3.jpg",
        "https://cdn.dummyjson.com/product-images/4/4.jpg",
        "https://cdn.dummyjson.com/product-images/4/thumbnail.jpg",
      ],
    },
  ];

  return (
    <div className="cartitems">
      <div className="cartitem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
      </div>
      <hr />
      {cartItems.map((item) => {
        if (1) {
          return (
            <div key={cartItems.id}>
              <div className=" cartitems-format  cartitem-format-main">
                <img
                  src={item.images[0]}
                  alt=""
                  className="carticon-product-icon"
                />
                <p>{item.title} </p>

               

                <p>${item.price} </p>
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default OnGoingProducts;
