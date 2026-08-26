import { useCallback, useEffect, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";

import Card from "../../components/Card";

import { getAllProducts } from "../../services/product-services";

import { addToCart } from "../../services/cart-services";

import {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
} from "../../redux/productSlice";

import "./Product.css";

const PRODUCT_LIMIT = 20;

export const Products = () => {
  const dispatch = useDispatch();
  const loadMoreRef = useRef(null);
  const isFetchingRef = useRef(false);
  // const paginationRef = useRef({ hasMore: true, nextCursor: null });

  const {
    items: products = [],
    status,
    error,
    nextCursor,
    hasMore,
  } = useSelector((state) => state.products);

  // paginationRef.current = { hasMore, nextCursor };

  const fetchProducts = useCallback(
    async ({ cursor = null, append = false } = {}) => {
      if (isFetchingRef.current) {
        return;
      }

      if (append && (!hasMore || !cursor)) {
        return;
      }

      isFetchingRef.current = true;
      dispatch(fetchProductsStart());

      try {
        const productData = await getAllProducts({
          limit: PRODUCT_LIMIT,
          cursor,
        });

        dispatch(
          fetchProductsSuccess({
            products: productData.products,
            nextCursor: productData.nextCursor,
            hasMore: productData.hasMore,
            append,
          }),
        );
      } catch (err) {
        dispatch(
          fetchProductsFailure(
            err?.response?.data?.message ||
              err?.message ||
              "Failed to fetch products",
          ),
        );
      } finally {
        isFetchingRef.current = false;
      }
    },
    [dispatch, hasMore],
  );

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    const element = loadMoreRef.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchProducts({
            cursor: nextCursor,
            append: true,
          });
        }
      },
      {
        rootMargin: "300px",
        threshold: 0,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [fetchProducts, nextCursor, products?.length]);

  const addInCart = useCallback(async (product) => {
    try {
      return await addToCart({
        productId: product._id,
        quantity: 1,
      });
    } catch (err) {
      console.error("Add to cart failed:", err.response?.data || err.message);
    }
  }, []);

  if (status === "loading" && products.length === 0) {
    return (
      <div className="products-page">
        <div className="products-status">
          <h2>Loading products...</h2>
        </div>
      </div>
    );
  }

  if (status === "failed" && products.length === 0) {
    return (
      <div className="products-page">
        <div className="products-status error">
          <h2>{error || "Failed to load products"}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1 className="products-title">Products</h1>

          <p className="products-subtitle">Browse all available products</p>
        </div>

        <span className="products-count">
          {products.length} products loaded
        </span>
      </div>

      {products.length === 0 ? (
        <div className="products-empty">
          <h3>No products found</h3>

          <p>There are currently no products available.</p>
        </div>
      ) : (
        <>
          <div className="products-grid">
            {products.map((product) => (
              <Card
                key={product._id}
                product={product}
                onAddToCart={addInCart}
              />
            ))}
          </div>

          <div ref={loadMoreRef} className="products-load-more">
            {status === "loading" && <p>Loading more products...</p>}

            {!hasMore && <p>You've reached the end of the products.</p>}

            {status === "failed" && products.length > 0 && (
              <p className="products-load-error">
                Failed to load more products.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};
