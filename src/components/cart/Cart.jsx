import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";

import Button from "../../framework/Button";
import { styled } from "@mui/material/styles";
import { CartContent } from "./CartContent";
import { AddressContent } from "./DelveryAddress";
import { PaymentContent } from "./Payment";
import {
  ShoppingBagOutlined,
  LocationOnOutlined,
  CreditCardOutlined,
  Check,
} from "@mui/icons-material";

import { saveOrders } from "../../services/order/order-services.js";
import { clearCart } from "../../redux/cartSlice.js";
import { displayToast } from "../../framework/displayToast.jsx";

const steps = ["Cart", "Address", "Payment"];

const CustomConnector = styled(StepConnector)(() => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: "calc(-50% + 22px)",
    right: "calc(50% + 22px)",
  },

  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "linear-gradient(90deg, #1976d2, #7c4dff)",
    },
  },

  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background: "linear-gradient(90deg, #1976d2, #7c4dff)",
    },
  },

  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
}));

const CustomStepIconRoot = styled("div")(({ ownerState }) => ({
  backgroundColor: "#d8d8d8",
  zIndex: 1,
  width: 45,
  height: 45,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  color: "#fff",

  transition: "all 0.3s ease",

  ...(ownerState.active && {
    background: "linear-gradient(135deg, #1976d2, #7c4dff)",
    boxShadow: "0 5px 15px rgba(25,118,210,0.3)",
  }),

  ...(ownerState.completed && {
    background: "linear-gradient(135deg, #1976d2, #7c4dff)",
  }),
}));

function CustomStepIcon(props) {
  const { active, completed, className, icon } = props;

  const icons = {
    1: <ShoppingBagOutlined />,
    2: <LocationOnOutlined />,
    3: <CreditCardOutlined />,
  };

  return (
    <CustomStepIconRoot
      ownerState={{ active, completed }}
      className={className}
    >
      {completed ? <Check /> : icons[String(icon)]}
    </CustomStepIconRoot>
  );
}

const mapCartItem = (item) => {
  const product =
    item?.productId && typeof item.productId === "object" ? item.productId : {};

  return {
    cartId: item?._id,
    productId: product._id || item?.productId,
    name: product.name || item?.name || "",
    description: product.description || item?.description || "",
    brand: product.brand || item?.brand || "",
    sku: product.sku || item?.sku || "",
    price: product.price ?? item?.price ?? 0,
    compareAtPrice: product.compareAtPrice ?? item?.compareAtPrice,
    image: product.images?.[0] || item?.image || "",
    quantity: item?.quantity || 1,
  };
};

export default function Cart() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [activeStep, setActiveStep] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [deliveryDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);

    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  const cartItems = useSelector((state) => state.cart.items || []).map(
    mapCartItem,
  );

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const discount = subTotal * 0.15;

  const shipping = subTotal > 0 ? 0 : 0;

  const tax = 0;

  const finalOrderTotal = subTotal - discount + tax + shipping;

  const handleNext = () => {
    if (activeStep === 1 && !selectedAddress) {
      displayToast({
        severity: "error",
        message: "Please select a delivery address.",
      });
      return;
    }
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSelectAddress = useCallback((addressId) => {
    setSelectedAddress(addressId);
  }, []);

  const handleSaveOrder = async () => {
    const userId = user?._id || user?.user?._id;

    if (!userId) {
      displayToast({
        severity: "error",
        message: "Please login to place an order.",
      });
      return;
    }

    if (!cartItems.length) {
      displayToast({
        severity: "error",
        message: "Your cart is empty.",
      });
      return;
    }

    if (!selectedAddress) {
      displayToast({
        severity: "error",
        message: "Please select a delivery address.",
      });
      return;
    }

    const orderItems = cartItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      productName: item.name,
      productImage: item.image || "",
      price: item.price,
      totalPrice: Math.round(item.price * item.quantity),
    }));

    const orderPayload = {
      userId,
      deliveryAddress: selectedAddress,
      subTotalAmt: Number(subTotal.toFixed(2)),
      totalAmt: Number(finalOrderTotal.toFixed(2)),
      orderItems,
      paymentData: {
        method: "ONLINE",
        currency: "INR",
      },
    };

    try {
      setIsSavingOrder(true);
      const order = await saveOrders({ orderData: orderPayload });
      displayToast({
        severity: "success",
        message: "Order placed successfully.",
      });
      dispatch(clearCart());
      setActiveStep(0);
      console.log("Order : ", order);
    } catch (error) {
      displayToast({
        severity: "error",
        message:
          error?.response?.data?.message ||
          error?.message ||
          "Failed to place order.",
      });
    } finally {
      setIsSavingOrder(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#e6eae9",
        minHeight: "100vh",
        py: {
          xs: 3,
          md: 5,
        },
      }}
    >
      <Container maxWidth="xl">
        <Paper
          elevation={0}
          sx={{
            p: {
              xs: 2,
              md: 4,
            },
            mb: 4,
            borderRadius: 3,
            border: "1px solid #eee",
            backgroundColor: "#fff",
          }}
        >
          <Stepper
            activeStep={activeStep}
            alternativeLabel
            connector={<CustomConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={CustomStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: activeStep === 0 ? "1fr 360px" : "1fr 360px",
            },
            gap: 4,
            alignItems: "start",
          }}
        >
          {/* LEFT */}

          <Paper
            elevation={0}
            sx={{
              p: {
                xs: 2,
                sm: 3,
                md: 4,
              },
              borderRadius: 3,
              border: "1px solid #eee",
              backgroundColor: "#fff",
            }}
          >
            {activeStep === 0 && <CartContent />}

            {activeStep === 1 && (
              <AddressContent
                selectedAddress={selectedAddress}
                onSelectAddress={handleSelectAddress}
              />
            )}

            {activeStep === 2 && <PaymentContent />}

            {/* BACK / NEXT */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
              }}
            >
              <Button
                label="Back"
                disabled={activeStep === 0}
                onClick={handleBack}
              />

              {activeStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  label="Continue"
                  sx={{ px: 4, borderRadius: 2 }}
                />
              ) : (
                <Button
                  onClick={handleSaveOrder}
                  label={isSavingOrder ? "Placing Order..." : "Place Order"}
                  disabled={isSavingOrder}
                  sx={{ px: 4, borderRadius: 2 }}
                />
              )}
            </Box>
          </Paper>

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #eee",
              backgroundColor: "#ffffff",
              position: {
                lg: "sticky",
              },
              top: 20,
            }}
          >
            <Typography variant="h6" fontWeight={700} mb={3}>
              Order Summary
            </Typography>

            {/* SUB TOTAL */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography>Sub Total</Typography>

              <Typography fontWeight={600}>₹{subTotal.toFixed(2)}</Typography>
            </Box>

            {/* DISCOUNT */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography>Discount</Typography>

              <Typography fontWeight={600}>-₹{discount.toFixed(2)}</Typography>
            </Box>

            {/* TAX */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography>Tax</Typography>

              <Typography fontWeight={600}>₹{tax.toFixed(2)}</Typography>
            </Box>

            {/* SHIPPING */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography>Shipping</Typography>

              <Typography
                fontWeight={700}
                sx={{
                  color: "#f26b38",
                }}
              >
                Free
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* TOTAL */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 3,
              }}
            >
              <Typography variant="h6" fontWeight={700}>
                Total
              </Typography>

              <Typography variant="h6" fontWeight={700}>
                ₹{finalOrderTotal.toFixed(2)}
              </Typography>
            </Box>

            {/* CHECKOUT */}

            {activeStep === 0 && (
              <Button
                fullWidth
                variant="contained"
                onClick={handleNext}
                label="Proceed to Checkout"
              />
            )}

            {/* DELIVERY */}

            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: "1px solid rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <Typography variant="body2">
                Estimated Delivery by <strong>{deliveryDate}</strong>
              </Typography>
            </Box>

            {activeStep === 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2}>
                  Have a Coupon?
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    overflow: "hidden",
                    backgroundColor: "#fff",
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Coupon Code"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        px: 1.5,
                      },
                    }}
                  />

                  <Button label="Apply" />
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}
