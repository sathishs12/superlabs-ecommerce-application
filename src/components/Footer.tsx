import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Divider,
  Stack,
  InputBase,
  Button,
} from "@mui/material";
import Grid from '@mui/material/GridLegacy';
import {
  Facebook,
  Instagram,
  Pinterest,
  LocationOn, 
  Headset,
  Download, 
  PhoneAndroid, 
  CreditCard, 
  ExpandLess, 
  MoreHoriz, 
  Reddit,
  X,
} from "@mui/icons-material";
// @ts-ignore
import Flag from 'react-world-flags';

const CustomSocialIcons = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: X, label: "X" },
  { icon: Pinterest, label: "Pinterest" },
  { icon: Reddit, label: "Reddit/Lookalike" },
  { icon: MoreHoriz, label: "More" },
];

// Helper component for link stacks
const LinkStack: React.FC<{ title: string; links: string[] }> = ({ title, links }) => (
  <Box>
    <Typography
      variant="body1"
      fontWeight={600}
      sx={{ mb: 1, color: "white", textTransform: "uppercase", fontSize: '0.875rem' }}
    >
      {title}
    </Typography>
    <Stack spacing={0.5}>
      {links.map((link) => (
        <Typography
          key={link}
          variant="body2"
          component="a"
          href="#"
          sx={{
            color: "#ccc",
            textDecoration: "none",
            fontSize: '0.875rem',
            "&:hover": { textDecoration: "underline" },
          }}
        >
          {link}
        </Typography>
      ))}
    </Stack>
  </Box>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // --- Data structures based on the image content ---

  const aboutSuperLabsLinks = [
    "About SuperLabs", "Newsroom", "Careers", "SuperLabs Values",
    "Supply Chain Transparency", "Affiliates", "SuperLabs Events",
    "Gift Cards", "SuperLabs Global Sites", "Diversity, Equity & Inclusion",
    "SuperLabs Accelerate", "Beauty (Re)purposed", "Report a Vulnerability"
  ];

  const mySuperLabsLinks = [
    "Beauty Insider", "SuperLabs Credit Card", "Community Profile",
    "Order Status", "Purchase History", "Account Settings",
    "Auto-Replenish", "Beauty Offers", "Buying Guides",
    "Rewards Bazaar", "My Lists", "Book a Reservation"
  ];

  const helpLinks = [
    "Customer Service", "Returns & Exchanges", "Delivery and Pickup Options",
    "Shipping", "Billing", "International Shipments",
    "Beauty Services FAQ", "SuperLabs at Kohl's", "Store Locations",
    "Flexible Payments", "Accessibility", "Teen Skincare Resource"
  ];

  const countrySelectorLinks = [
    { text: "India - Tamil", icon: <Flag code="IN" style={{ width: 20, height: 14 }} /> }, // Use a generic flag and color
    { text: "India - English", icon: <Flag code="IN" style={{ width: 20, height: 14 }} /> },
    { text: "India - Hindi  ", icon: <Flag code="IN" style={{ width: 20, height: 14 }} /> },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#000",
        color: "#fff",
        py: 0,
        px: { xs: 2, md: 0 },
        position: "absolute",
        zIndex: 1000,
        left: 0,
        right: 0,
      }}
    >

      {/* 1. TOP BAR - Feedback */}
      <Box sx={{ textAlign: 'center', py: 1.5, bgcolor: "rgb(204, 204, 204)", color: 'black', position: "absolute",
        zIndex: 1000,
        left: 0,
        right: 0 }}>
        <Typography variant="body2" fontWeight={700} sx={{ color: 'black', fontSize: '0.rem' }}>
          Website feedback? Let us know
          <ExpandLess sx={{ fontSize: '0.7rem', ml: 0.5, transform: 'rotate(90deg)' }} />
        </Typography>
      </Box>

      {/* 2. TOP UTILITY LINKS */}
      <Grid
        container
        spacing={2}
        sx={{
          py: 3,
          px: { md: 8, lg: 15 },
          mt:3,
          borderBottom: '1px solid #333',
        }}
        justifyContent="space-between"
      >
        <Grid item xs={12} md={10}>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={{ xs: 2, md: 5 }}
            alignItems={{ xs: 'flex-start', md: 'center' }}
            divider={<Divider orientation="vertical" flexItem sx={{ display: { xs: 'none', md: 'block' }, borderColor: '#333' }} />}
          >
            {[
              { icon: LocationOn, text: "Find a Store", subtext: "Choose Your Store" },
              { icon: Headset, text: "Customer Service Chat", subtext: null },
              { icon: Download, text: "Get the App", subtext: "Download Now" },
              { icon: PhoneAndroid, text: "Get SuperLabs Texts", subtext: "Sign Up Now" },
              { icon: CreditCard, text: "SuperLabs Credit Card Program", subtext: "Want 25% off your SuperLabs purchase? > DETAILS" },
            ].map((item, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', minWidth: '150px' }}>
                <item.icon sx={{ color: 'white', fontSize: 24, mr: 1 }} />
                <Box>
                  <Typography variant="body2" fontWeight={600} sx={{ lineHeight: 1.2, fontSize: '0.8rem' }}>
                    {item.text}
                  </Typography>
                  {item.subtext && (
                    <Typography variant="caption" sx={{ color: '#ccc', lineHeight: 1.2, fontSize: '0.7rem' }}>
                      {item.subtext}
                    </Typography>
                  )}
                </Box>
              </Box>
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* 3. MAIN CONTENT GRID */}
      <Grid
        container
        spacing={4}
        sx={{
          py: 5,
          px: { md: 8, lg: 15 },
          borderBottom: '1px solid #333'
        }}
      >
        {/* Left Columns (Links) */}
        <Grid item xs={12} md={7}>
          <Grid container spacing={4}>
            <Grid item xs={6} sm={4}>
              <LinkStack title="About SuperLabs" links={aboutSuperLabsLinks} />
            </Grid>
            <Grid item xs={6} sm={4}>
              <LinkStack title="My SuperLabs" links={mySuperLabsLinks} />
            </Grid>
            <Grid item xs={6} sm={4}>
              <LinkStack title="Help" links={helpLinks} />
            </Grid>
          </Grid>
        </Grid>

        {/* Right Columns (Region & Language + Slogan/Sign Up) */}
        <Grid item xs={12} md={5}>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body1"
                fontWeight={600}
                sx={{ mb: 1, color: "white", textTransform: "uppercase", fontSize: '0.875rem' }}
              >
                Region & Language
              </Typography>
              <Stack spacing={1}>
                {countrySelectorLinks.map((item, index) => (
                  <Box key={index} display="flex" alignItems="center" gap={1}>
                    <Typography sx={{ fontSize: 16 }}>{item.icon}</Typography>
                    <Typography variant="body2" sx={{ color: '#ccc', fontSize: '0.875rem' }}>
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>

            {/* Slogan and Email Signup */}
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 500, mb: 1.5 }}>
                  We Belong to
                  <br />
                  Something Beautiful
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{ mt: 15, mb: 1, textTransform: "uppercase", fontSize: '0.875rem' }}>
                  Sign up for SuperLabs Emails
                </Typography>
                <Box display="flex" width="100%" gap={2} mt={1}>
                  <InputBase
                    placeholder="Enter your email address"
                    sx={{
                      flexGrow: 1,
                      backgroundColor: "#fff",
                      color: "#000",
                      px: 1.5,
                      py: 0.5,
                      borderTopLeftRadius: 1,
                      borderRadius: 2,
                      height: 50,
                      width: 20,
                      fontSize: '0.875rem'
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "black",
                      color: "#fff",
                      textTransform: "none",
                      borderTopRightRadius: 1,
                      border: "1px solid white",
                      borderRadius: 20,
                      "&:hover": { backgroundColor: "#555" },
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* 4. BOTTOM BAR - Copyright, Legal, Social */}
      <Box sx={{ py: 3, px: { md: 8, lg: 15 } }}>
        <Grid container spacing={3} alignItems="center">
          {/* Left: Copyright and Legal Links */}
          <Grid item xs={12} sm={7}>
            <Typography variant="caption" sx={{ color: '#ccc', mr: 2, display: 'block', mb: { xs: 1, sm: 0 } }}>
              © {currentYear} SuperLabs India, Inc. All rights reserved.
            </Typography>
            <Stack direction="row" flexWrap="wrap" spacing={1} divider={<Divider orientation="vertical" flexItem sx={{ borderColor: '#333', height: 10, alignSelf: 'center' }} />}>
              {[
                "Privacy Policy",
                "Terms of Use",
                "Accessibility",
                "Sitemap",
                "Your Privacy Choices",
              ].map((link, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  component="a"
                  href="#"
                  sx={{
                    color: '#ccc',
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {link}
                </Typography>
              ))}
              {/* Privacy Options Icon Placeholder (similar to the blue icon) */}
              <Box sx={{ backgroundColor: 'blue', width: 14, height: 14, borderRadius: 1, ml: 0.5 }} />
            </Stack>
            <Typography variant="caption" sx={{ color: '#ccc', mt: 1, display: 'block' }}>
              1.877.737.4672
            </Typography>
          </Grid>

          {/* Right: Social Media Icons */}
          <Grid item xs={12} sm={5} sx={{ textAlign: { xs: 'left', sm: 'right' } }}>
            <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', sm: 'flex-end' }}>
              {CustomSocialIcons.map((item, index) => (
                <IconButton key={index} sx={{ color: "white", p: 0.5 }}>
                  <item.icon sx={{ fontSize: 20 }} />
                </IconButton>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;