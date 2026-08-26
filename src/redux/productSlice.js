import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  nextCursor: null,
  hasMore: true,
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
      const { products = [], nextCursor = null, hasMore = false, append = false } =
        action.payload;

      state.status = "succeeded";

      if (append) {
        const existingIds = new Set(state.items.map((product) => product._id));
        const newProducts = products.filter(
          (product) => !existingIds.has(product._id),
        );
        state.items.push(...newProducts);
      } else {
        state.items = products;
      }

      state.nextCursor = nextCursor;
      state.hasMore = Boolean(hasMore) && Boolean(nextCursor);
    },

    fetchProductsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    resetProducts: () => initialState,
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  resetProducts,
} = productSlice.actions;

export default productSlice.reducer;
