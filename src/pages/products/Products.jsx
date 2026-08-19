import { useCallback, useEffect } from "react";
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

export const Products = () => {
  const dispatch = useDispatch();

  const {
    items: products,
    status,
    error,
  } = useSelector((state) => state.products);

  const fetchProducts = async () => {
    dispatch(fetchProductsStart());

    try {
      const productData = await getAllProducts();

      dispatch(fetchProductsSuccess(productData?.data || []));
    } catch (err) {
      dispatch(
        fetchProductsFailure(err?.message || "Failed to fetch products"),
      );
    }
  };

const addInCart = useCallback(async (product) => {
  try {
    const payload = {
      productId: product._id,
      quantity: 1,
    };
    const productAddedCart = await addToCart(payload);
    return productAddedCart;
  } catch (error) {
    console.error(
      "Add to cart failed:",
      error.response?.data || error.message
    );
  }
}, []);

  useEffect(() => {
    if (products.length === 0 && status === "idle") {
      fetchProducts();
    }
  }, [products.length, status]);

  if (status === "loading") {
    return (
      <div className="products-page">
        <div className="products-status">
          <h2>Loading products...</h2>
        </div>
      </div>
    );
  }

  if (status === "failed") {
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

        <span className="products-count">{products.length} products</span>
      </div>

      {products.length === 0 ? (
        <div className="products-empty">
          <h3>No products found</h3>
          <p>There are currently no products available.</p>
        </div>
      ) : (
        <div className="products-grid">
          {products.map((product) => (
            <Card key={product._id} product={product} onAddToCart={addInCart} />
          ))}
        </div>
      )}
    </div>
  );
};
