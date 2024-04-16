// CartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [
    {
      id: 11,
      title: "perfume Oil",
      description:
        "Mega Discount, Impression of Acqua Di Gio by GiorgioArmani concentrated attar perfume Oil",
      price: 13,
      discountPercentage: 8.4,
      rating: 4.26,
      stock: 65,
      brand: "Impression of Acqua Di Gio",
      category: "fragrances",
      thumbnail: "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/11/1.jpg",
        "https://cdn.dummyjson.com/product-images/11/2.jpg",
        "https://cdn.dummyjson.com/product-images/11/3.jpg",
        "https://cdn.dummyjson.com/product-images/11/thumbnail.jpg",
      ],
      quantity: 1, // Adding quantity property with value 1
    },
    {
      id: 12,
      title: "Brown Perfume",
      description: "Royal_Mirage Sport Brown Perfume for Men & Women - 120ml",
      price: 40,
      discountPercentage: 15.66,
      rating: 4,
      stock: 52,
      brand: "Royal_Mirage",
      category: "fragrances",
      thumbnail: "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/12/1.jpg",
        "https://cdn.dummyjson.com/product-images/12/2.jpg",
        "https://cdn.dummyjson.com/product-images/12/3.png",
        "https://cdn.dummyjson.com/product-images/12/4.jpg",
        "https://cdn.dummyjson.com/product-images/12/thumbnail.jpg",
      ],
      quantity: 1, // Adding quantity property with value 1
    },
    {
      id: 18,
      title: "Oil Free Moisturizer 100ml",
      description:
        "Dermive Oil Free Moisturizer with SPF 20 is specifically formulated with ceramides, hyaluronic acid & sunscreen.",
      price: 40,
      discountPercentage: 13.1,
      rating: 4.56,
      stock: 88,
      brand: "Dermive",
      category: "skincare",
      thumbnail: "https://cdn.dummyjson.com/product-images/18/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/18/1.jpg",
        "https://cdn.dummyjson.com/product-images/18/2.jpg",
        "https://cdn.dummyjson.com/product-images/18/3.jpg",
        "https://cdn.dummyjson.com/product-images/18/4.jpg",
        "https://cdn.dummyjson.com/product-images/18/thumbnail.jpg",
      ],
      quantity: 1,
    },
    {
      id: 19,
      title: "Skin Beauty Serum.",
      description:
        "Product name: rorec collagen hyaluronic acid white face serum riceNet weight: 15 m",
      price: 46,
      discountPercentage: 10.68,
      rating: 4.42,
      stock: 54,
      brand: "ROREC White Rice",
      category: "skincare",
      thumbnail: "https://cdn.dummyjson.com/product-images/19/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/19/1.jpg",
        "https://cdn.dummyjson.com/product-images/19/2.jpg",
        "https://cdn.dummyjson.com/product-images/19/3.png",
        "https://cdn.dummyjson.com/product-images/19/thumbnail.jpg",
      ],
      quantity: 1,
    },
    {
      id: 20,
      title: "Freckle Treatment Cream- 15gm",
      description:
        "Fair & Clear is Pakistan's only pure Freckle cream which helpsfade Freckles, Darkspots and pigments. Mercury level is 0%, so there are no side effects.",
      price: 70,
      discountPercentage: 16.99,
      rating: 4.06,
      stock: 140,
      brand: "Fair & Clear",
      category: "skincare",
      thumbnail: "https://cdn.dummyjson.com/product-images/20/thumbnail.jpg",
      images: [
        "https://cdn.dummyjson.com/product-images/20/1.jpg",
        "https://cdn.dummyjson.com/product-images/20/2.jpg",
        "https://cdn.dummyjson.com/product-images/20/3.jpg",
        "https://cdn.dummyjson.com/product-images/20/4.jpg",
        "https://cdn.dummyjson.com/product-images/20/thumbnail.jpg",
      ],
      quantity: 1,
    },
    {
      id: 21,
      title: "- Daal Masoor 500 grams",
      description: "Fine quality Branded Product Keep in a cool and dry place",
      price: 20,
      discountPercentage: 4.81,
      rating: 4.44,
      stock: 133,
      brand: "Saaf & Khaas",
      category: "groceries",
      thumbnail: "https://cdn.dummyjson.com/product-images/21/thumbnail.png",
      images: [
        "https://cdn.dummyjson.com/product-images/21/1.png",
        "https://cdn.dummyjson.com/product-images/21/2.jpg",
        "https://cdn.dummyjson.com/product-images/21/3.jpg",
      ],
      quantity: 1,
    },
  ],
  reducers: {
    addToCart: (state, action) => {
      console.log(action.payload);
      // Check if item already exists in cart
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        // If item exists, update its quantity
        existingItem.quantity += 1;
      } else {
        // If item doesn't exist, add it to the cart
        state.push({ ...action.payload, quantity: 1 });
      }
    },

    removeFromCart: (state, action) => {
      console.log(action.payload);
      return state.filter((item) => item.id !== action.payload);
    },
    increaseQuantity: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.find((item) => item.id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
      } else if (existingItem && existingItem.quantity === 1) {
        // If quantity becomes zero after decreasing, remove the item from the cart
        return state.filter((item) => item.id !== existingItem.id);
      }
    },
  },
});

export const { addToCart, removeFromCart,increaseQuantity,decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
