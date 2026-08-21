import React, { useState } from "react";

import {
  Box,
  Container,
  Typography,
  Paper,
  Divider,
  IconButton,
  Button,
  TextField,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import {
  Add,
  Remove,
  DeleteOutline,
  EditOutlined,
  ShoppingBagOutlined,
  LocationOnOutlined,
  CreditCardOutlined,
  Check,
} from "@mui/icons-material";

// ----------------------------------------------------
// PRODUCTS
// ----------------------------------------------------

const initialCartItems = [
  {
    id: 1,
    name: "Slim Fit Casual Shirt",
    description: "Button-Down Collar & Placket",
    size: "XL",
    color: "Maroon",
    price: 85,
    oldPrice: 92,
    quantity: 1,
    image: "/images/shirt.png",
  },
  {
    id: 2,
    name: "Printed Straight Kurtas",
    description: "Digital Printed With Yoke Embroidery",
    size: "XL",
    color: "Green",
    price: 68,
    oldPrice: 75,
    quantity: 2,
    image: "/images/kurta.png",
  },
];

// ----------------------------------------------------
// STEPS
// ----------------------------------------------------

const steps = ["Cart", "Address", "Payment"];

// ----------------------------------------------------
// CUSTOM CONNECTOR
// ----------------------------------------------------

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: "calc(-50% + 22px)",
    right: "calc(50% + 22px)",
  },

  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background:
        "linear-gradient(90deg, #1976d2, #7c4dff)",
    },
  },

  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      background:
        "linear-gradient(90deg, #1976d2, #7c4dff)",
    },
  },

  [`& .${stepConnectorClasses.line}`]: {
    height: 4,
    border: 0,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
  },
}));

// ----------------------------------------------------
// CUSTOM STEP ICON
// ----------------------------------------------------

const CustomStepIconRoot = styled("div")(({ theme, ownerState }) => ({
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
    background:
      "linear-gradient(135deg, #1976d2, #7c4dff)",
    boxShadow: "0 5px 15px rgba(25,118,210,0.3)",
  }),

  ...(ownerState.completed && {
    background:
      "linear-gradient(135deg, #1976d2, #7c4dff)",
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

// ----------------------------------------------------
// CART COMPONENT
// ----------------------------------------------------

export default function Cart() {
  const [activeStep, setActiveStep] = useState(0);

  const [cartItems, setCartItems] = useState(
    initialCartItems
  );

  const [coupon, setCoupon] = useState("");

  // --------------------------------------------------
  // QUANTITY
  // --------------------------------------------------

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  item.quantity - 1
                ),
              }
            : item
        )
    );
  };

  // --------------------------------------------------
  // DELETE
  // --------------------------------------------------

  const removeItem = (id) => {
    setCartItems((items) =>  
      items.filter((item) => item.id !== id)
    );
  };

  // --------------------------------------------------
  // TOTALS
  // --------------------------------------------------

  const subTotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const discount = subTotal * 0.15;

  const shipping = subTotal > 0 ? 0 : 0;

  const tax = 0;

  const total =
    subTotal - discount + tax + shipping;

  // --------------------------------------------------
  // STEP NAVIGATION
  // --------------------------------------------------

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // --------------------------------------------------
  // CART CONTENT
  // --------------------------------------------------

  const CartContent = () => (
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

          <Typography variant="h6">
            Your cart is empty
          </Typography>
        </Paper>
      ) : (
        cartItems.map((item, index) => (
          <Box key={item.id}>
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
              {/* IMAGE */}

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

              {/* DETAILS */}

              <Box
                sx={{
                  flex: 1,
                  minWidth: 0,
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                >
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
                  Size{" "}
                  <strong>{item.size}</strong>
                  &nbsp; / &nbsp;
                  Color{" "}
                  <strong>{item.color}</strong>
                </Typography>

                {/* PRICE */}

                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    alignItems: "center",
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                  >
                    ${item.price}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      textDecoration:
                        "line-through",
                    }}
                  >
                    ${item.oldPrice}
                  </Typography>
                </Box>

                {/* ACTIONS */}

                <Box
                  sx={{
                    display: "flex",
                    justifyContent:
                      "space-between",
                    alignItems: "center",
                    mt: 2,
                  }}
                >
                  {/* QUANTITY */}

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
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
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
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      <Add fontSize="small" />
                    </IconButton>
                  </Box>

                  {/* DELETE / EDIT */}

                  <Box>
                    <IconButton
                      onClick={() =>
                        removeItem(item.id)
                      }
                    >
                      <DeleteOutline />
                    </IconButton>

                    <IconButton>
                      <EditOutlined />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </Box>

            {index !== cartItems.length - 1 && (
              <Divider />
            )}
          </Box>
        ))
      )}
    </Box>
  );

  // --------------------------------------------------
  // ADDRESS
  // --------------------------------------------------

  const AddressContent = () => (
    <Box>
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
      >
        Delivery Address
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
          },
          gap: 2,
        }}
      >
        <TextField
          label="First Name"
          fullWidth
        />

        <TextField
          label="Last Name"
          fullWidth
        />

        <TextField
          label="Email"
          fullWidth
        />

        <TextField
          label="Phone"
          fullWidth
        />

        <TextField
          label="Address"
          fullWidth
          sx={{
            gridColumn: {
              sm: "1 / -1",
            },
          }}
        />

        <TextField
          label="City"
          fullWidth
        />

        <TextField
          label="Postal Code"
          fullWidth
        />
      </Box>
    </Box>
  );

  // --------------------------------------------------
  // PAYMENT
  // --------------------------------------------------

  const PaymentContent = () => (
    <Box>
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
      >
        Payment Method
      </Typography>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid #ddd",
          borderRadius: 2,
          p: 3,
          mb: 2,
        }}
      >
        <Typography fontWeight={600}>
          Credit / Debit Card
        </Typography>

        <Box sx={{ mt: 2 }}>
          <TextField
            label="Card Number"
            fullWidth
            sx={{ mb: 2 }}
          />

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
            }}
          >
            <TextField
              label="Expiry Date"
            />

            <TextField label="CVV" />
          </Box>
        </Box>
      </Paper>

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontWeight: 700,
        }}
      >
        Place Order
      </Button>
    </Box>
  );

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

        {/* ------------------------------------------
            TITLE
        ------------------------------------------ */}

        {/* <Typography
          variant="h3"
          fontWeight={700}
          sx={{
            mb: 4,
            fontSize: {
              xs: "2rem",
              md: "3rem",
            },
          }}
        >
          Cart
        </Typography> */}

        {/* ------------------------------------------
            STEPPER
        ------------------------------------------ */}

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
                <StepLabel
                  StepIconComponent={
                    CustomStepIcon
                  }
                >
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>

        {/* ------------------------------------------
            CONTENT
        ------------------------------------------ */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg:
                activeStep === 0
                  ? "1fr 360px"
                  : "1fr 360px",
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
            {activeStep === 0 && (
              <CartContent />
            )}

            {activeStep === 1 && (
              <AddressContent />
            )}

            {activeStep === 2 && (
              <PaymentContent />
            )}

            {/* BACK / NEXT */}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mt: 4,
              }}
            >
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>

              {activeStep !==
                steps.length - 1 && (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{
                    px: 4,
                    borderRadius: 2,
                  }}
                >
                  Continue
                </Button>
              )}
            </Box>
          </Paper>

          {/* ----------------------------------------
              ORDER SUMMARY
          ---------------------------------------- */}

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
            <Typography
              variant="h6"
              fontWeight={700}
              mb={3}
            >
              Order Summary
            </Typography>

            {/* SUB TOTAL */}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 2,
              }}
            >
              <Typography>
                Sub Total
              </Typography>

              <Typography fontWeight={600}>
                ${subTotal.toFixed(2)}
              </Typography>
            </Box>

            {/* DISCOUNT */}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 2,
              }}
            >
              <Typography>
                Discount
              </Typography>

              <Typography fontWeight={600}>
                -${discount.toFixed(2)}
              </Typography>
            </Box>

            {/* TAX */}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 2,
              }}
            >
              <Typography>Tax</Typography>

              <Typography fontWeight={600}>
                ${tax.toFixed(2)}
              </Typography>
            </Box>

            {/* SHIPPING */}

            <Box
              sx={{
                display: "flex",
                justifyContent:
                  "space-between",
                mb: 2,
              }}
            >
              <Typography>
                Shipping
              </Typography>

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
                justifyContent:
                  "space-between",
                mb: 3,
              }}
            >
              <Typography
                variant="h6"
                fontWeight={700}
              >
                Total
              </Typography>

              <Typography
                variant="h6"
                fontWeight={700}
              >
                ${total.toFixed(2)}
              </Typography>
            </Box>

            {/* CHECKOUT */}

            {activeStep === 0 && (
              <Button
                fullWidth
                variant="contained"
                onClick={handleNext}
                sx={{
                  py: 1.5,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 700,
                  fontSize: "1rem",
                  backgroundColor: "#222",

                  "&:hover": {
                    backgroundColor: "#000",
                  },
                }}
              >
                Proceed to Checkout
              </Button>
            )}

            {/* DELIVERY */}

            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop:
                  "1px solid rgba(0,0,0,0.08)",
                textAlign: "center",
              }}
            >
              <Typography variant="body2">
                Estimated Delivery by{" "}
                <strong>
                  25 August, 2026
                </strong>
              </Typography>
            </Box>

            {/* --------------------------------------
                COUPON
            -------------------------------------- */}

            {activeStep === 0 && (
              <Box sx={{ mt: 3 }}>
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={2}
                >
                  Have a Coupon?
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    border:
                      "1px solid #ddd",
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
                    onChange={(e) =>
                      setCoupon(
                        e.target.value
                      )
                    }
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                      sx: {
                        px: 1.5,
                      },
                    }}
                  />

                  <Button
                    sx={{
                      px: 2,
                      fontWeight: 700,
                    }}
                  >
                    Apply
                  </Button>
                </Box>
              </Box>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
}