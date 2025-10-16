import React from "react";
import { Box, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";

const features = [
  {
    icon: <LocalShippingOutlinedIcon fontSize="large" />,
    title: (
      <>
        <Box
          component="span"
          sx={{ color: "blue", textDecoration: "underline", fontWeight: 500 }}
        >
          Sign in
        </Box>{" "}
        <Box component="span" sx={{ color: "black", fontWeight: 700 }}>
          for FREE shipping
        </Box>
      </>
    ),
  },
  {
    icon: <AutorenewOutlinedIcon fontSize="large" />,
    title: (
      <>
        <Box component="span" sx={{ color: "black", fontWeight: 700 }}>
          Auto-Replenish
        </Box>
        <Box component="span" sx={{ color: "gray", fontWeight: 500 }}>
          Save 5% on this item
        </Box>
      </>
    ),
  },
  {
    icon: <LocalShippingOutlinedIcon fontSize="large" />,
    title: (
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        Same-Day Delivery
      </Typography>
    ),
  },
  {
    icon: <StorefrontOutlinedIcon fontSize="large" />,
    title: (
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        Buy Online & Pick<br />Up
      </Typography>
    ),
  },
];

const FeaturesSection: React.FC = () => {
  return (
    <Box sx={{ mt: 3 }}>
      {/* Features Grid */}
      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", md: "nowrap" },
          gap: 2,
        }}
      >
        {features.map((feature, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
              py: 1.5,
              border: "1px solid black",
              borderRadius: 1,
              fontSize: "0.875rem",
              textAlign: "center",
              minWidth: 120,
              flex: 1,
            }}
          >
            {feature.icon}
            {feature.title}
          </Box>
        ))}
      </Box>

      {/* Bottom Info Bar */}
      <Box
        sx={{
          bgcolor: "grey.200",
          mt: 2,
          p: 1.5,
          borderRadius: 1,
          textAlign: "left",
        }}
      >
        <Typography variant="body2" sx={{ color: "black", fontSize: "0.9rem" }}>
          <Box
            component="span"
            sx={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
          >
            Sign in
          </Box>{" "}
          or{" "}
          <Box
            component="span"
            sx={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}
          >
            create an account
          </Box>{" "}
          to enjoy{" "}
          <Box component="span" sx={{ color: "black", fontWeight: 700 }}>
            FREE
          </Box>{" "}
          standard shipping.
        </Typography>

        {/* Second Line */}
        <Typography
          variant="body2"
          sx={{
            color: "blue",
            textDecoration: "underline",
            cursor: "pointer",
            fontSize: "0.9rem",
            mt: 0.5,
          }}
        >
          Shipping & Returns
        </Typography>
      </Box>
    </Box>
  );
};

export default FeaturesSection;
