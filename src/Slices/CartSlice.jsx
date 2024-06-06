import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartCount: 0
  },

  reducers: {
    addCountToCart: (state, action) => {
      state.cartCount = action.payload;
    },
    addItemToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.cartItems.push({ ...item, quantity: 1 });
      }
      state.cartCount = state.cartItems.length;
    },
    updateCart: (state, action) => {
      const updatedCart = action.payload;
      state.cartItems = updatedCart;
      state.cartCount = updatedCart.length;
    },
    incrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find(cartItem => cartItem.id === itemId);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const itemId = action.payload;
      const item = state.cartItems.find(cartItem => cartItem.id === itemId);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(cartItem => cartItem.id !== itemId);
        }
      }
      state.cartCount = state.cartItems.length;
    }
  }
});

export const { addCountToCart, addItemToCart, updateCart, incrementQuantity, decrementQuantity } = CartSlice.actions;
export default CartSlice.reducer;
