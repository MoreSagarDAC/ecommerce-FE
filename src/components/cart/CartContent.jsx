import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity as decreaseCartQuantity,
  increaseQuantity as increaseCartQuantity,
  removeFromCart,
} from "../../redux/cartSlice";
import { Box, Typography, Paper, Divider, IconButton } from "@mui/material";
import {
  Add,
  Remove,
  DeleteOutline,
  ShoppingBagOutlined,
} from "@mui/icons-material";

const mapCartItem = (item) => {
  const product = item?.productId || {};

  return {
    cartId: item?._id,
    productId: product._id,
    name: product.name || "",
    description: product.description || "",
    brand: product.brand || "",
    sku: product.sku || "",
    price: product.price ?? 0,
    compareAtPrice: product.compareAtPrice,
    image: product.images?.[0] || "",
    quantity: item?.quantity || 1,
  };
};

export const CartContent = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items || []).map(
    mapCartItem,
  );

  const increaseQuantity = (productId) => {
    dispatch(increaseCartQuantity(productId));
  };

  const decreaseQuantity = (productId) => {
    dispatch(decreaseCartQuantity(productId));
  };

  const removeItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <Box>
      {/* CART ITEMS */}

      {cartItems.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 5,
            textAlign: "center",
            border: "1px solid #eee",
            borderRadius: 3,
          }}
        >
          <ShoppingBagOutlined
            sx={{
              fontSize: 60,
              color: "#aaa",
              mb: 2,
            }}
          />

          <Typography variant="h6">Your cart is empty</Typography>
        </Paper>
      ) : (
        cartItems.map((item, index) => (
          <Box key={item.cartId || item.productId}>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                py: 3,

                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
              }}
            >
              <Box
                component="img"
                src={item.image}
                alt={item.name}
                sx={{
                  width: {
                    xs: "100%",
                    sm: 120,
                  },

                  height: {
                    xs: 220,
                    sm: 140,
                  },

                  objectFit: "cover",

                  borderRadius: 2,

                  backgroundColor: "#f7f4ef",
                }}
              />

              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  {item.name}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 0.5,
                  }}
                >
                  {item.description}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    mt: 1,
                  }}
                >
                  Brand <strong>{item.brand}</strong>
                  &nbsp; / &nbsp; SKU <strong>{item.sku}</strong>
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Typography variant="h6" fontWeight={700}>
                    ${item.price.toFixed(2)}
                  </Typography>

                  {item.compareAtPrice > item.price && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        textDecoration: "line-through",
                      }}
                    >
                      ${item.compareAtPrice.toFixed(2)}
                    </Typography>
                  )}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid #ddd",
                      borderRadius: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => decreaseQuantity(item.productId)}
                    >
                      <Remove fontSize="small" />
                    </IconButton>

                    <Typography
                      sx={{
                        px: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      {item.quantity}
                    </Typography>

                    <IconButton
                      size="small"
                      onClick={() => increaseQuantity(item.productId)}
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>

                  <Box>
                    <IconButton onClick={() => removeItem(item.productId)}>
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>

            {index !== cartItems.length - 1 && <Divider />}
          </Box>
        ))
      )}
    </Box>
  );
};
