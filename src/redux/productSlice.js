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
      const { products, nextCursor, hasMore, append = false } = action.payload;
      state.status = "succeeded";

      if (append) {
        // Prevent duplicate products
        const existingIds = new Set(state.items.map((product) => product._id));

        const newProducts = products.filter(
          (product) => !existingIds.has(product._id),
        );

        state.items.push(...newProducts);
      } else {
        // First page / fresh fetch
        state.items = products;
      }

      state.nextCursor = nextCursor;
      state.hasMore = hasMore;
    },

    fetchProductsFailure: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },

    resetProducts: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
      state.nextCursor = null;
      state.hasMore = true;
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  resetProducts,
} = productSlice.actions;

export default productSlice.reducer;