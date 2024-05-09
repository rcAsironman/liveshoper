import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/AuthSlice";
import cartReducer from '../Slices/CartSlice'
import initialData from "../Slices/InitialDataFetchSlice"

const Store = configureStore({
  reducer: {
    auth: authReducer,
    cart:cartReducer,
    initialDataFromApi: initialData,
  },
});

export default Store;
