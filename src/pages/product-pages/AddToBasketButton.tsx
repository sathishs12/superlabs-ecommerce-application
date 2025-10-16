import React from "react";
import { Box, Button, FormControl, MenuItem, Select, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material";
import { FavoriteBorderOutlined } from "@mui/icons-material";

interface Props {
  quantity: number;
  setQuantity: (value: number) => void;
}

const AddToBasketButton: React.FC<Props> = ({ quantity, setQuantity }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Mobile check
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: "80%",
        maxWidth: 400,
        mx: "auto",
        height: 44,
        gap: 2,
      }}
    >
      {/* --- Main Button (Quantity + Add to Basket) --- */}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          borderRadius: 25,
          overflow: "hidden",
          bgcolor: "rgb(207, 17, 44)",
          boxShadow: 2,
          height: "100%",
        }}
      >
        {/* Quantity Selector (50%) */}
        {!isMobile && (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              maxWidth: "100px",
              justifyContent: "center",
              color: "white",
              "& .MuiSelect-select": {
                color: "white",
                padding: "6px 0",
                textAlign: "center",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            }}
          >
            <FormControl size="small" sx={{ maxWidth: "100px" }}>
              <Select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <MenuItem key={num} value={num} sx={{ color: "black" }}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
        {/* Vertical Divider */}
        {!isMobile && (
          <Box
            sx={{
              border: "1px solid white"
            }}
          />
        )}
        {/* Add to Basket / Get it shipped (50%) */}
        <Button
          variant="contained"
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            bgcolor: "rgb(207, 17, 44)",
            color: "white",
            borderRadius: 0,
            "&:hover": { bgcolor: "rgb(207, 17, 44)" },
            py: 0,
            textTransform: "none",
            px: 2,
          }}
        >
          <Typography sx={{ fontSize: "0.80rem", fontWeight: 600, lineHeight: 1 }}>
            Add to Basket
          </Typography>
          <Typography sx={{ fontSize: "0.65rem", fontWeight: 500, lineHeight: 1 }}>
            Get it shipped
          </Typography>
        </Button>
      </Box>

      {/* --- Favorite Icon (Separate) --- */}
      {!isMobile && (
        <IconButton
          sx={{
            color: "black",
            bgcolor: "#f5f5f5",
            "&:hover": { bgcolor: "#e0e0e0" },
            borderRadius: "50%",
            width: 50,
            height: 50,
          }}
        >
          <FavoriteBorderOutlined />
        </IconButton>
      )}
    </Box>
  );
};

export default AddToBasketButton;
