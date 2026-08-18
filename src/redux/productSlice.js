import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
};

const productSlice = createSlice({
  name: "products",

  initialState,

  reducers: {
    fetchProductsStart: (state) => {
      state.status = "loading";
      state.error = null;
    },

    fetchProductsSuccess: (state, action) => {
      state.status = "succeeded";
      state.items = action.payload;
      state.error = null;
    },

    fetchProductsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    clearProducts: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  clearProducts,
} = productSlice.actions;

export default productSlice.reducer;