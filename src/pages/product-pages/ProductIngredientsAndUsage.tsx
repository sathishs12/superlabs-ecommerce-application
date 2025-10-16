import React, { useState } from "react";
import { Box, Typography, IconButton, Collapse } from "@mui/material";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

interface ProductIngredientsAndUsageProps {
  description: string;
}

const extractSectionContent = (html: string, heading: string): string => {
  const regex = new RegExp(
    `<h3[^>]*>(?:<span[^>]*>)?(?:<strong>)?${heading}(?:</strong>)?(?:</span>)?</h3>([\\s\\S]*?)(?=<h3|$)`,
    "i"
  );
  const match = html.match(regex);
  if (!match) return "";

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = match[1];

  let text = tempDiv.innerText
    .replace(/\n+/g, " ") 
    .replace(/\s+/g, " ")
    .replace(/•/g, "●") 
    .trim();

  if (tempDiv.querySelectorAll("li").length > 0) {
    const items = Array.from(tempDiv.querySelectorAll("li")).map((li) =>
      li.textContent?.trim()
    );
    text = items.filter(Boolean).join(" ● ");
  }

  return text;
};

const ProductIngredientsAndUsage: React.FC<ProductIngredientsAndUsageProps> = ({
  description,
}) => {
  const [showIngredients, setShowIngredients] = useState(false);
  const [showUsage, setShowUsage] = useState(false);

  const ingredients = extractSectionContent(description, "KEY INGREDIENTS");
  const howToUse = extractSectionContent(description, "HOW TO USE");

  return (
    <Box sx={{ mt: 4 }}>
      {/* ---------- Ingredients Section ---------- */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setShowIngredients(!showIngredients)}
        >
          <Typography variant="h6" fontWeight={600}>
            Ingredients
          </Typography>
          <IconButton size="small">
            {showIngredients ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={showIngredients}>
          <Typography
            variant="body2"
            sx={{
              mt: 1.5,
              pl: 45,
              pr: 2,
              color: ingredients ? "text.primary" : "text.secondary",
            }}
          >
            {ingredients
              ? `INGREDIENTS: ${ingredients}`
              : "No data available for this product."}
          </Typography>
        </Collapse>
      </Box>

      {/* ---------- How To Use Section ---------- */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            cursor: "pointer",
          }}
          onClick={() => setShowUsage(!showUsage)}
        >
          <Typography variant="h6" fontWeight={600}>
            How to Use
          </Typography>
          <IconButton size="small">
            {showUsage ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>

        <Collapse in={showUsage}>
          <Typography
            variant="body2"
            sx={{
              mt: 1.5,
              pl: 45,
              pr: 2,
              color: howToUse ? "text.primary" : "text.secondary",
            }}
          >
            {howToUse || "No data available for this product."}
          </Typography>
        </Collapse>
      </Box>
    </Box>
  );
};

export default ProductIngredientsAndUsage;
