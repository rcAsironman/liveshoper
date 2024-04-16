import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import cartReducer from '../Slices/CartSlice'

const Store = configureStore({
  reducer: {
    auth: authReducer,
    cart:cartReducer
  },
});

export default Store;
