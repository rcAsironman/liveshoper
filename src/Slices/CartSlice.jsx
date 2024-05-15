import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== idToRemove);
    },
    increaseQuantity: (state, action) => {
      const idToIncrease = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item.id === idToIncrease ? { ...item, quantity: item.quantity + 1 } : item
      );
    },
    decreaseQuantity: (state, action) => {
      const existingItem = state.cartItems.find((item) => item.id === action.payload);
      if (existingItem && existingItem.quantity > 1) {
        state.cartItems = state.cartItems.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else if (existingItem && existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
