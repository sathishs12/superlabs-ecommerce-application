import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Chip,
  Breadcrumbs,
  Link,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import {
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import type { Product } from "../../types/product";
import fallbackImage from "../../assets/imagesnotavailiablee.png";
import FeaturesSection from "../../components/filter-section/FeaturesSection";
import ProductRatingsBar from "./ProductRatingsBar";
import AddToBasketButton from "./AddToBasketButton";
import ProductAboutSection from "./ProductAboutSection";
import ProductHighlights from "./ProductHighlights";
import ProductIngredientsAndUsage from "./ProductIngredientsAndUsage";
import ProductQnA from "./ProductQnA";
import ProductReviewsSummary from "./ProductReviewsSummary";
const ProductPage: React.FC = () => {
  const location = useLocation();
  const product = location.state?.product as Product | undefined;
  const sampleQuestions = [
    {
      id: 1,
      question: "Is it long wearing",
      date: "12 Sep 2025",
      answer: ""
    },
    {
      id: 2,
      question: "What is the best shade for medium skin tone?",
      date: "10 Sep 2025",
      answer: "Shade 3 or 4 would work well for medium skin tones."
    }
  ];

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5">Product not found.</Typography>
      </Box>
    );
  }

  const images: string[] =
    product.images?.map((img) => img.image || fallbackImage) || [
      fallbackImage,
    ];
  const categories: string[] = product.categories || [];
  const tags: string[] = product.tags?.map(t => t.tag.title) || [];

  const brand: string = typeof product.brand === "string" ? product.brand : "Brand";

  const currentPrice: number =
    product.variants?.[0]?.currentPrice ?? product.priceStart ?? 0;
  const originalPrice: number =
    product.variants?.[0]?.price ?? currentPrice;
  const discount: number =
    originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0;

  const autoReplenishDiscountPercent = 5;
  const autoReplenishPrice = currentPrice * (1 - autoReplenishDiscountPercent / 100);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          px: { xs: 2, sm: 3, md: 4, lg: 6 },
          pt: { xs: "130px", sm: "100px", md: "200px" },
          pb: { xs: 4, sm: 6, md: 8 },
        }}
      >
        {/* Breadcrumb */}
        <Breadcrumbs sx={{ mb: 3, fontSize: "0.875rem", color: "text.secondary" }}>
          <Link underline="hover" color="inherit" href="/">
            Home
          </Link>
          <Link underline="hover" color="inherit" href="/store">
            Store
          </Link>
          {categories[0] && (
            <Link underline="hover" color="inherit" href="#">
              {categories[0]}
            </Link>
          )}
          <Typography color="text.primary" fontSize="0.875rem">
            {product.title}
          </Typography>
        </Breadcrumbs>

        <Grid container spacing={{ xs: 4, sm: 5, md: 6 }}>
          {/* Left: Image Gallery */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ position: "relative" }}>
              <Paper
                elevation={0}
                sx={{
                  position: "relative",
                  bgcolor: "grey.50",
                  borderRadius: 4,
                  overflow: "hidden",
                  aspectRatio: { xs: "1", sm: "1", md: "4/3.5" },
                }}
              >
                <Box
                  component="img"
                  src={images[selectedImage]}
                  alt={product.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                {discount > 0 && (
                  <Chip
                    label={`${discount}% OFF`}
                    color="error"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      fontWeight: 600,
                    }}
                  />
                )}

                {/* Navigation Arrows */}
                {images.length > 1 && (
                  <>
                    <IconButton
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      sx={{
                        position: "absolute",
                        left: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        bgcolor: "white",
                        "&:hover": { bgcolor: "grey.100" },
                        boxShadow: 2,
                      }}
                    >
                      <ChevronLeft />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        setSelectedImage((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      sx={{
                        position: "absolute",
                        right: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        bgcolor: "white",
                        "&:hover": { bgcolor: "grey.100" },
                        boxShadow: 2,
                      }}
                    >
                      <ChevronRight />
                    </IconButton>
                  </>
                )}
              </Paper>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <Box sx={{ display: "flex", gap: 1.5, overflowX: "auto", py: 1 }}>
                  {images.map((img: string, idx: number) => (
                    <Box
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      sx={{
                        flex: "0 0 auto",
                        width: { xs: 60, sm: 80, md: 100 },
                        height: { xs: 60, sm: 80, md: 100 },
                        borderRadius: 2,
                        overflow: "hidden",
                        border: 2,
                        borderColor: selectedImage === idx ? "black" : "grey.200",
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                        "&:hover": {
                          borderColor: selectedImage === idx ? "black" : "grey.400",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        src={img || fallbackImage}
                        alt={`View ${idx + 1}`}
                        sx={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>

          {/* Right: Product Details */}
          <Grid item xs={12} lg={6}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: { xs: 2, md: 0, } }}>
              {/* Brand & Title */}
              <Box>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, lineHeight: 1.2, mt: 0.5, fontSize: { xs: "1rem", sm: "1.5rem", md: "1.5rem" } }}
                > {brand}

                </Typography>
                <Typography
                  variant="overline"
                  sx={{
                    fontWeight: 600,
                    color: "text.secondary",
                    letterSpacing: 1.5,
                  }}
                >
                  {product.title}
                </Typography>
              </Box>
              {/* Rating Section */}
              <ProductRatingsBar product={product} />

              {/* Pricing */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 1,
                    mt: 1
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    ₹{currentPrice.toLocaleString()}
                  </Typography>

                  <Box
                    sx={{
                      bgcolor: "#E3F2FD",
                      color: "black",
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 1.5,
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    or 4 payments of ₹{(currentPrice / 4).toFixed(2)}
                  </Box>

                  {originalPrice !== currentPrice && (
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      sx={{ textDecoration: "line-through" }}
                    >
                      ₹{originalPrice.toLocaleString()}
                    </Typography>
                  )}
                </Box>

                {/* --- Auto-Replenish Offer (2nd line) --- */}
                <Typography
                  variant="body2"
                  sx={{
                    mt: 1,
                    fontWeight: 500,
                  }}
                >
                  GET it for{" "}
                  <Box component="span" sx={{ color: "red", fontWeight: 600 }}>
                    ₹{autoReplenishPrice.toFixed(2)} ({autoReplenishDiscountPercent}% off)
                  </Box>{" "}
                  with <Box component="span" sx={{ fontWeight: 600 }}>Auto-Replenish</Box>
                </Typography>
              </Box>



              {/* Features Section */}
              <FeaturesSection />
              <Box sx={{ mt: 0, display: { xs: "none", sm: "block", position: "relative", top: "20px", display: "flex", alignItems: "center", }, }}>
                <AddToBasketButton quantity={quantity} setQuantity={setQuantity} />
              </Box>


              {/* Tags */}
              {tags.length > 0 && (
                <Box sx={{ pt: 2, borderTop: 1, borderColor: "grey.200" }}>
                  <Typography variant="body2" fontWeight={600} sx={{ mb: 1.5 }}>
                    Product Tags:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {tags.map((tag, idx) => (
                      <Chip
                        key={idx}
                        label={tag}
                        size="small"
                        sx={{ bgcolor: "grey.100" }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
        <ProductHighlights highlights={[
          "Vegan",
          "Satin Finish",
          "Stick Formula",
          "Long-wearing",
          "Hydrating"
        ]} />
        {/* About the Product */}
        <ProductAboutSection product={product} brand={brand} />
        <ProductIngredientsAndUsage description={product.description || ""} />
        <ProductQnA questions={sampleQuestions} />
        <ProductReviewsSummary
          averageRating={product.averageRating}
          totalReviews={product.reviewsCount} 
          ratingDistribution={[250, 50, 15, 10, 4]} 
          pros={{ color: 168, satisfaction: 157, hydrating: 73 }}
          cons={{ disappointing: 3 }}
        />

      </Box>
    </Box>
  );
};

export default ProductPage;
