import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addWish(state, action) {
      state.push(action.payload);
    },
    removeWish(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addWish, removeWish } = wishlistSlice.actions;
export default wishlistSlice.reducer;
