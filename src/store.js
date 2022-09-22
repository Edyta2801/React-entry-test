import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./utils/productsSlice";
import singleProductReducer from './utils/singleProductSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    singleProduct:singleProductReducer,
  },

});
