import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(localStorage.getItem("cart"));
  } else {
    return [];
  }
};

const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  cart: fetchFromLocalStorage(),
  itemsCount: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add(state, action) {
      const isItemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (isItemInCart) {
        const tempCart = state.cart.map((item) => {
          if (item.id === action.payload.id) {
            let tempQty = item.quantity + action.payload.quantity;
            let tempTotalPrice = tempQty + item.price;
            return {
              ...item,
              quantity: tempQty,
              totalPrice: tempTotalPrice,
            };
          } else {
            return item;
          }
        });
        state.cart = tempCart;
        storeInLocalStorage(state.cart);
      } else {
        state.cart.push(action.payload);
        storeInLocalStorage(state.cart);
      }
    },
    remove(state, action) {
      const tempCart = state.cart.filter((item) => item.id !== action.payload);
      state.cart = tempCart;
      storeInLocalStorage(state.cart);
    },

    clearCart(state) {
      state.cart = [];
    },

    getCartTotal: (state) => {
      state.totalAmount = state.cart.reduce((cartTotal, cartItem) => {
        return (cartTotal += cartItem.totalPrice);
      }, 0);

      state.itemsCount = state.cart.length;
    },
    toggleCartQty: (state, action) => {
      const tempCart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          let tempQty = item.quantity;
          let tempTotalPrice = item.totalPrice;

          if (action.payload.type === "INC") {
            tempQty++;
            if (tempQty === item.stock) tempQty = item.stock;
            tempTotalPrice = tempQty * item.discountPrice;
          }

          if (action.payload.type === "DEC") {
            tempQty--;
            if (tempQty < 1) tempQty = 1;
            tempTotalPrice = tempQty * item.discountPrice;
          }
          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice };
        } else {
          return item;
        }
      });
      state.cart = tempCart;
      storeInLocalStorage(state.cart);
    },
  },
});

export const { add, remove, clearCart, getCartTotal, toggleCartQty } =
  cartSlice.actions;
export default cartSlice.reducer;
