import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalItems: 0,
  totalAmount: 0,
};

const getProductId = (item) =>
  typeof item?.productId === "object" ? item.productId?._id : item?.productId;

const getItemPrice = (item) => {
  if (typeof item?.price === "number") {
    return item.price;
  }

  if (typeof item?.productId?.price === "number") {
    return item.productId.price;
  }

  return 0;
};

const recalcTotals = (state) => {
  state.totalItems = state.items.reduce(
    (total, item) => total + (item.quantity || 0),
    0,
  );

  state.totalAmount = state.items.reduce(
    (total, item) => total + getItemPrice(item) * (item.quantity || 0),
    0,
  );
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const productId = getProductId(product);

      const existingItem = state.items.find(
        (item) => getProductId(item) === productId,
      );

      if (existingItem) {
        existingItem.quantity += product.quantity || 1;
      } else {
        state.items.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }

      recalcTotals(state);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => getProductId(item) !== action.payload,
      );

      recalcTotals(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => getProductId(item) === action.payload,
      );

      if (item) {
        item.quantity += 1;
      }

      recalcTotals(state);
    },

    decreaseQuantity: (state, action) => {
      const item = state.items.find(
        (item) => getProductId(item) === action.payload,
      );

      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }

      recalcTotals(state);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
      state.totalAmount = 0;
    },

    setCart: (state, action) => {
      const payload = action.payload;
      state.items = Array.isArray(payload) ? payload : [];
      recalcTotals(state);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
  setCart,
} = cartSlice.actions;

export default cartSlice.reducer;
