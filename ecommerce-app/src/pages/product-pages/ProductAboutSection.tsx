import React from "react";
import { Box, Typography, Chip } from "@mui/material";
import type { Product } from "../../types/product";
import Grid from "@mui/material/GridLegacy";

interface ProductAboutSectionProps {
  product: Product;
  brand: string;
}

const ProductAboutSection: React.FC<ProductAboutSectionProps> = ({ product, brand }) => {
  const tags = product.tags?.map(t => t.tag.title) || [];

  const getFirstParagraph = () => {
    if (!product.description) return "N/A";
    return product.description
      .split(/\r\n\r\n|How To Use:|Expiry:|<strong>/)[0]
      .replace(/<[^>]*>?/gm, '')
      .trim();
  };

  const getBenefits = () => {
    const benefits: string[] = [];
    const desc = product.description || "";

    if (desc.toLowerCase().includes("hydrat")) benefits.push("Hydrating");
    if (desc.toLowerCase().includes("moistur")) benefits.push("Moisturizing");
    if (desc.includes("SPF") || desc.includes("sun protection") || desc.includes("UV")) benefits.push("Sun Protection");
    if (desc.includes("fine lines") || desc.includes("wrinkles") || desc.includes("anti-aging")) benefits.push("Anti-aging");
    if (desc.includes("brightening") || desc.includes("radiance")) benefits.push("Brightening");
    if (desc.includes("soothing") || desc.includes("calming")) benefits.push("Soothing");

    return benefits.length > 0
      ? benefits.slice(0, 3).join(", ")
      : tags.slice(0, 3).join(", ") || "N/A";
  };

  const getIngredients = () => {
    const desc = product.description || "";
    const matches = desc.match(/(\d+[,.]?\d*\s*(?:ppm|%|mg)?\s*(?:of\s+)?[A-Za-z\s]+(?:acid|adenosine|panthenol|niacinamide|vitamin|retinol|hyaluronic|ceramide|peptide))/gi);
    if (!matches) return "";
    return matches.slice(0, 2).map(ing => ing.replace(/\s+/g, " ").trim()).join(", ");
  };

  return (
    <Box sx={{ mt: 8, pt: 4, borderTop: 1, borderColor: "grey.200" }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 4 }}>
        About the Product
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column - Item Number & Badge */}
        <Grid item xs={12} md={3}>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Item {product.id || "N/A"}
            </Typography>
            {brand && (
              <Chip
                label={`ONLY AT ${brand.toUpperCase()}`}
                size="small"
                sx={{
                  bgcolor: "black",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                  height: 24,
                }}
              />
            )}
          </Box>
        </Grid>

        {/* Right Column - Product Details */}
        <Grid item xs={12} md={9}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* What it is */}
            <Box>
              <Typography variant="body1" sx={{ display: "inline" }}>
                <Box component="span" fontWeight={600}>What it is:</Box>{" "}
                {getFirstParagraph()}
              </Typography>
            </Box>

            {/* Formulation Type */}
            {tags.length > 0 && (
              <Box>
                <Typography variant="body1">
                  <Box component="span" fontWeight={600}>Formulation Type:</Box>{" "}
                  {tags.join(", ")}
                </Typography>
              </Box>
            )}

            {/* Benefits */}
            {getBenefits() !== "N/A" && (
              <Box>
                <Typography variant="body1">
                  <Box component="span" fontWeight={600}>Benefits:</Box>{" "}
                  {getBenefits()}
                </Typography>
              </Box>
            )}

            {/* Ingredient Callouts */}
            {getIngredients() && (
              <Box>
                <Typography variant="body1">
                  <Box component="span" fontWeight={600}>Ingredient Callouts:</Box>{" "}
                  {getIngredients()}
                </Typography>
              </Box>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductAboutSection;
