import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartSlice";
import wishReducer from "./WishlistSlice";

const store = configureStore({
  reducer: {
    allCart: cartReducer,
    wishlist: wishReducer,
  },
});
export default store;
