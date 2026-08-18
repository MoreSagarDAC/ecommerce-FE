import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import Chip from "@mui/material/Chip";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ProductCard({
  product,
  onAddToCart,
  onShare,
}) {
  const [isFavourite, setIsFavourite] = useState(false);

  const title = product.name || product.title || "Untitled Product";
  const image = product.images?.[0] || product.image || "";
  const categoryLabel =
    typeof product.category === "string"
      ? product.category
      : product.category?.name;
  const rating = product.ratings ?? product.rating;
  const reviews = product.numReviews ?? product.reviews ?? 0;
  const oldPrice = product.compareAtPrice ?? product.oldPrice;
  const discount =
    product.discount ||
    (oldPrice && product.price
      ? `${Math.round((1 - product.price / oldPrice) * 100)}% OFF`
      : null);

  const handleFavourite = () => {
    setIsFavourite((prev) => !prev);
  };

  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 360,
        borderRadius: 3,
        overflow: "hidden",
        position: "relative",
        boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",

        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 10px 25px rgba(0,0,0,0.14)",
        },
      }}
    >
      {/* Image area */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: {
            xs: 280,
            sm: 320,
            md: 350,
          },
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",

            "&:hover": {
              transform: "scale(1.06)",
            },
          }}
        />

        {/* Discount */}
        {discount && (
          <Chip
            label={discount}
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 15,
              left: 15,
              fontWeight: 700,
            }}
          />
        )}

        {/* Favourite + Share */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <IconButton
            onClick={handleFavourite}
            sx={{
              backgroundColor: "#fff",
              width: 42,
              height: 42,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",

              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
          >
            {isFavourite ? (
              <FavoriteIcon sx={{ color: "red" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>

          <IconButton
            onClick={() => onShare?.(product)}
            sx={{
              backgroundColor: "#fff",
              width: 42,
              height: 42,
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",

              "&:hover": {
                backgroundColor: "#fff",
              },
            }}
          >
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Product details */}
      <CardContent sx={{ p: 2.5 }}>
        {/* Category */}
        {categoryLabel && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.5 }}
          >
            {categoryLabel}
          </Typography>
        )}

        {/* Product title */}
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            mb: 1,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>

        {/* Rating */}
        {rating > 0 && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 1.5,
            }}
          >
            <Rating
              value={rating}
              precision={0.5}
              size="small"
              readOnly
            />

            <Typography
              variant="body2"
              color="text.secondary"
            >
              ({reviews})
            </Typography>
          </Box>
        )}

        {/* Price */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            mb: 2,
          }}
        >
          <Typography
            variant="h6"
            fontWeight={700}
          >
            ₹{product.price}
          </Typography>

          {oldPrice && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textDecoration: "line-through",
              }}
            >
              ₹{oldPrice}
            </Typography>
          )}
        </Box>

        {/* Add to cart */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<ShoppingCartIcon />}
          onClick={() => onAddToCart?.(product)}
          sx={{
            textTransform: "none",
            borderRadius: 2,
            py: 1.3,
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}