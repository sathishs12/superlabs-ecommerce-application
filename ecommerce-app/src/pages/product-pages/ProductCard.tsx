import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  IconButton,
} from "@mui/material";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import type { Product } from "../../types/product";
import fallbackImage from "../../assets/noimage.jpg";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
  onView: (p: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product.title}`, { state: { product } });
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        transition: "0.2s",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        borderRadius: "20px",
        boxShadow: "none",
        cursor: "pointer",
        position: "relative",
        "&:hover": {
          transform: "scale(1.02)",
          ".quickLookOverlay": { opacity: 1 },
        },
      }}
    >
      {/* Image */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          image={
            product.thumbnail && product.thumbnail.startsWith("http")
              ? product.thumbnail
              : fallbackImage
          }
          alt={product.title || "No Image"}
          sx={{
            height: { xs: 180, sm: 220, md: 280 },
            objectFit: "cover",
            width: "100%",
            backgroundColor: "#fafafa",
            borderRadius: "20px 20px 0 0",
          }}
        />


        {/* Favorite Icon */}
        <IconButton
          sx={{
            position: "absolute",
            top: 6,
            right: 6,
            color: "#000",
            backgroundColor: "rgba(255,255,255,0.7)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.9)" },
          }}
        >
          <FavoriteBorderOutlined />
        </IconButton>

        {/* Quick Look Overlay */}
        <Box
          className="quickLookOverlay"
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            bgcolor: "rgba(0,0,0,0.7)",
            color: "white",
            p: 1,
            opacity: 0,
            transition: "0.2s",
            textAlign: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontSize: { xs: "12px", sm: "14px" },
            }}
          >
            Quicklook
          </Typography>
        </Box>
      </Box>

      {/* Card Content */}
      <CardContent sx={{ flexGrow: 1, px: { xs: 1.5, sm: 2 }, py: { xs: 1, sm: 1.5 } }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          sx={{
            fontSize: { xs: "13px", sm: "15px", md: "16px" },
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.3,
          }}
        >

          {product.brand || "Unknown Brand"}
        </Typography>

        <Typography
          variant="subtitle2"
          color="text.secondary"
          sx={{
            fontSize: { xs: "11px", sm: "13px" },
            mb: 0.3,
          }}
        >
          {product.title}
        </Typography>

        <Box sx={{ mt: 0.5, display: "flex", alignItems: "center", gap: 0.5 }}>
          <Rating
            value={product.averageRating || 0}
            precision={0.5}
            readOnly
            size="small"
            sx={{
              color: "black",
              "& .MuiRating-iconEmpty": { color: "#e0e0e0" },
            }}
          />
          {product.reviewsCount && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "11px", sm: "13px" } }}
            >
              ({product.reviewsCount})
            </Typography>
          )}
        </Box>

        <Box sx={{ mt: 0.5 }}>
          {product.priceStart ? (
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ fontSize: { xs: "13px", sm: "15px" } }}
            >
              ₹{product.priceStart.toLocaleString()}
            </Typography>
          ) : (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontSize: { xs: "11px", sm: "13px" } }}
            >
              Price unavailable
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
