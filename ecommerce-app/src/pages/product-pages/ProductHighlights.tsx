import React from "react";
import { Box, Typography } from "@mui/material";
import {
  AccessTime,
  Opacity,
  Palette,
  Checkroom
} from "@mui/icons-material";
import SpaIcon from "@mui/icons-material/Spa";

interface ProductHighlightsProps {
  highlights: string[];
}

const ProductHighlights: React.FC<ProductHighlightsProps> = ({ highlights }) => {
  const getHighlightConfig = (highlight: string) => {
    const lower = highlight.toLowerCase();

    if (lower.includes("vegan") || lower.includes("cruelty")) {
      return { icon: SpaIcon, color: "#F9A825", bgColor: "#FFF9C4" };
    }
    if (lower.includes("satin") || lower.includes("finish") || lower.includes("matte")) {
      return { icon: Palette, color: "#8D6E63", bgColor: "#D7CCC8" };
    }
    if (lower.includes("stick") || lower.includes("formula")) {
      return { icon: Checkroom, color: "#C62828", bgColor: "#FFCDD2" };
    }
    if (lower.includes("long") || lower.includes("wear")) {
      return { icon: AccessTime, color: "#6A1B9A", bgColor: "#E1BEE7" };
    }
    if (lower.includes("hydrat") || lower.includes("moisture")) {
      return { icon: Opacity, color: "#0277BD", bgColor: "#B3E5FC" };
    }

    return { icon: SpaIcon, color: "#757575", bgColor: "#E0E0E0" };
  };

  return (
    <Box sx={{ mt: 6, mb: 4, borderTop: 1, borderColor: "grey.200" }}>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2, mt: 5 }}>
        Highlights
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)"
          },
          gap: 6,
          maxWidth: 800,
          pl: { xs: 1, sm: 2, md: 45 },
        }}
      >
        {highlights.map((item, idx) => {
          const config = getHighlightConfig(item);
          const IconComponent = config.icon;

          return (
            <Box
              key={idx}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  bgcolor: config.bgColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}
              >
                <IconComponent
                  sx={{
                    fontSize: 24,
                    color: config.color
                  }}
                />
              </Box>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 400,
                  color: "text.primary"
                }}
              >
                {item}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default ProductHighlights;
