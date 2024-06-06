import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import cartReducer from '../Slices/CartSlice'
import initialData from "../Slices/InitialDataFetchSlice"
import wishListReducer from "../Slices/WishListSlice"
import shoperReducer from "../Slices/ShoperSlice"

const Store = configureStore({
reducer: {
    auth: authReducer,
    cart:cartReducer,
    initialDataFromApi: initialData,
    WishList: wishListReducer,
    shoperCart: shoperReducer
  },
});

export default Store;
