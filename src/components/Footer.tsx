import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import Grid from '@mui/material/GridLegacy';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        mt: 8,
        py: 6,
        px: { xs: 2, md: 8 },
      }}
    >
      <Grid container spacing={4}>
        {/* Column 1 */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Customer Service
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Help & FAQs
          </Typography>
          
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Shipping
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Returns & Exchanges
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Contact Us
          </Typography>
        </Grid>

        {/* Column 2 */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            About Us
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Our Story
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Careers
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Sustainability
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Press
          </Typography>
        </Grid>

        {/* Column 3 */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Quick Links
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Gift Cards
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Offers & Promotions
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Store Locator
          </Typography>
          <Typography variant="body2" sx={{ mb: 1, opacity: 0.8 }}>
            Affiliate Program
          </Typography>
        </Grid>

        {/* Column 4 */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Follow Us
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
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
      </Grid>

      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          mt: 4,
          pt: 2,
          textAlign: "center",
          fontSize: 13,
          opacity: 0.7,
        }}
      >
        © {new Date().getFullYear()} SuperLabs. All Rights Reserved.
      </Box>
    </Box>
  );
};

export default Footer;
