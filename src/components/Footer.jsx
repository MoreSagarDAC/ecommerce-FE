import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  Divider,
  IconButton,
} from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "#1a1a1a",
        color: "white",
        mt: 8,
        pt: 6,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Brand */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              ShopEase
            </Typography>

            <Typography variant="body2" color="grey.400">
              Your one-stop destination for fashion, electronics, accessories,
              and more.
            </Typography>

            <Box sx={{ mt: 2 }}>
              <IconButton sx={{ color: "white" }}>
                <Facebook />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <Instagram />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <Twitter />
              </IconButton>
              <IconButton sx={{ color: "white" }}>
                <YouTube />
              </IconButton>
            </Box>
          </Grid>

          {/* Shop */}
          <Grid item xs={6} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Shop
            </Typography>

            {["Men", "Women", "Electronics", "Accessories", "New Arrivals"].map(
              (item) => (
                <Link
                  key={item}
                  href="#"
                  underline="none"
                  display="block"
                  color="grey.400"
                  sx={{
                    mb: 1,
                    "&:hover": { color: "white" },
                  }}
                >
                  {item}
                </Link>
              ),
            )}
          </Grid>

          {/* Customer Service */}
          <Grid item xs={6} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Support
            </Typography>

            {[
              "Contact Us",
              "FAQs",
              "Shipping & Delivery",
              "Returns",
              "Track Order",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                display="block"
                color="grey.400"
                sx={{
                  mb: 1,
                  "&:hover": { color: "white" },
                }}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* Company */}
          <Grid item xs={6} sm={6} md={2}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Company
            </Typography>

            {[
              "About Us",
              "Careers",
              "Privacy Policy",
              "Terms & Conditions",
            ].map((item) => (
              <Link
                key={item}
                href="#"
                underline="none"
                display="block"
                color="grey.400"
                sx={{
                  mb: 1,
                  "&:hover": { color: "white" },
                }}
              >
                {item}
              </Link>
            ))}
          </Grid>

          {/* Newsletter */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Stay Updated
            </Typography>

            <Typography variant="body2" color="grey.400" sx={{ mb: 2 }}>
              Subscribe to get special offers and updates.
            </Typography>

            <Box
              component="form"
              sx={{
                display: "flex",
                gap: 1,
                flexDirection: { xs: "column", sm: "row" },
              }}
            >
              <TextField
                size="small"
                placeholder="Your email"
                variant="outlined"
                fullWidth
                sx={{
                  bgcolor: "white",
                  borderRadius: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 1,
                  },
                }}
              />

              <Button
                variant="contained"
                sx={{
                  whiteSpace: "nowrap",
                  textTransform: "none",
                }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: "grey.800", my: 4 }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "row" },
            gap: 1,
          }}
        >
          <Typography variant="body2" color="grey.500">
            © 2026 ShopEase. All rights reserved.
          </Typography>

          <Typography variant="body2" color="grey.500">
            Made with ❤️ for online shoppers
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
