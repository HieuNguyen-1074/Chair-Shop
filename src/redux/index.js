import { combineReducers, configureStore } from "@reduxjs/toolkit";
import reducerProduct from "./SliceProduct";
import reducerReceipt from "./SliceReceipt";
import reducerUser from "./SliceUser";
import reducerCart from "./SliceCart";
import reducerAlert from "./SlideAlert";
import reducerMessage from "./SliceMessage";
import reducerCategory from "./SliceCategory";

const rootReducer = {
  product: reducerProduct,
  receipt: reducerReceipt,
  user: reducerUser,
  cart: reducerCart,
  alert: reducerAlert,
  message: reducerMessage,
  category: reducerCategory,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
