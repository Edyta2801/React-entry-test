import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./utils/productsSlice";
import singleProductReducer from "./utils/singleProductSlice";
import cartSliceReducer from "./utils/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    singleProduct: singleProductReducer,
    cart: cartSliceReducer,
  },
});
