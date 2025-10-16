import React from "react";
import { Box, Typography, Rating } from "@mui/material";
import { Favorite } from "@mui/icons-material";

interface Product {
  averageRating?: number;
  reviewsCount?: number;
}

interface Props {
  product: Product;
}

const ProductRatingsBar: React.FC<Props> = ({ product }) => {
  return (
    <Box
      sx={{
        bgcolor: "grey.200",
        p: { xs: 1, sm: 1.5 },
        borderRadius: 2,
        mt: 1,
        fontSize: { xs: "0.75rem", sm: "0.8rem" },
        color: "black",
      }}
    >
      {/* Top row: inline items with separators */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: { xs: 1, sm: 1.5 },
          flexWrap: { xs: "wrap", sm: "nowrap" },
          rowGap: 0.5,
        }}
      >
        {/* Star & review count */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Rating
            value={product.averageRating || 0}
            precision={0.25}
            readOnly
            size="small"
          />
          <Typography variant="body2" sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }}>
            {product.reviewsCount || 0}
          </Typography>
        </Box>

        {/* Divider */}
        <Typography sx={{ display: { xs: "none", sm: "block" } }}>|</Typography>

        {/* Ask a question */}
        <Typography
          variant="body2"
          sx={{
            cursor: "pointer",
            textDecoration: "underline",
            fontSize: { xs: "0.75rem", sm: "0.8rem" },
          }}
        >
          Ask a question
        </Typography>

        {/* Divider */}
        <Typography sx={{ display: { xs: "none", sm: "block" } }}>|</Typography>

        {/* Favorite count */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <Favorite sx={{ fontSize: { xs: 16, sm: 18 }, color: "black" }} />
          <Typography variant="body2" sx={{ fontSize: { xs: "0.75rem", sm: "0.8rem" } }}>
            139.2K
          </Typography>
        </Box>
      </Box>

      {/* Bottom row: highly rated features */}
      <Typography
        variant="body2"
        sx={{
          fontSize: { xs: "0.7rem", sm: "0.75rem" },
          color: "black",
          mt: 0.5,
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        Highly rated by customers for: color, satisfaction, hydrating
      </Typography>
    </Box>
  );
};

export default ProductRatingsBar;
