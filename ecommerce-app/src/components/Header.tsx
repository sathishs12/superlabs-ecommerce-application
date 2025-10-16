import React, { useState, useEffect, useRef } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Badge,
  Container,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  List,
  ListItemButton,
} from "@mui/material";
import {
  Search as SearchIcon,
  StorefrontOutlined,
  Event,
  AccountCircleOutlined,
  FavoriteBorderOutlined,
  ShoppingCartOutlined,
  HomeOutlined,
  StoreOutlined,
  LocalOfferOutlined,
  PersonOutline,
  GroupsOutlined,
} from "@mui/icons-material";
import AddToBasketButton from "../pages/product-pages/AddToBasketButton";
import { useLocation } from 'react-router-dom';
import { useTheme, useMediaQuery } from "@mui/material";

interface HeaderProps {
  query: string;
  onChange: (v: string) => void;
  onSearch: (keyword: string) => void;
  cartCount?: number;
  favoriteCount?: number;
}

const Header: React.FC<HeaderProps> = ({
  query,
  onChange,
  onSearch,
  cartCount = 0,
  favoriteCount = 0,
}) => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [bottomNavValue, setBottomNavValue] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const location = useLocation();
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [showTopBanner, setShowTopBanner] = useState(true);
  const lastScrollY = useRef(0);
  const topBannerHeight = 60;

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowTopBanner(false);
      } else {
        setShowTopBanner(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Fetch suggestions with debounce
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        try {
          const res = await fetch(
            `https://bb3-api.ashwinsrivastava.com/store/product-search/suggestions?q=${encodeURIComponent(query)}`
          );
          const data = await res.json();
          setSuggestions(data?.data?.suggestions || []);
        } catch {
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };
    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBoxRef.current && !searchBoxRef.current.contains(event.target as Node)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionClick = (keyword: string) => {
    onChange(keyword);
    onSearch(keyword);
    setSuggestions([]);
    setIsSearchActive(false);
  };

  const handleCancelSearch = () => {
    setIsSearchActive(false);
    onChange("");
    onSearch("");
    setSuggestions([]);
  };

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
    setSuggestions([]);
  };

  const navItems = [
    "Gifts & Value Sets",
    "New",
    "Makeup",
    "Skincare",
    "Fragrance",
    "Hair",
    "Tools & Brushes",
    "Bath & Body",
    "Brands",
    "Mini Size",
    "Gift Cards",
    "Sale & Offers",
  ];
  const appBarHeight = isMobile ? 65 : 95; // matches your AppBar height in sx
  const desktopNavTop = showTopBanner ? topBannerHeight + appBarHeight : appBarHeight;
  return (
    <Box sx={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1200 }}>
      {/* Top Banner */}
      <Box
        sx={{
          backgroundColor: "rgb(197, 183, 220)",
          color: "#000",
          height: topBannerHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 1, sm: 2, md: 2 },
          transition: "transform 0.2s ease",
          transform: showTopBanner ? "translateY(0)" : `translateY(-${topBannerHeight}px)`,
        }}
      >
        <Typography sx={{ fontSize: { xs: 12, sm: 13, md: 14 }, textAlign: "center" }}>
          <Box component="span" sx={{ fontWeight: "bold" }}>
            Pick up to 6 FREE* Trial Sizes
          </Box>{" "}
          with $105 Spend. Online only. *Terms apply. Use code{" "}
          <Box component="span" sx={{ color: "red", fontWeight: "bold" }}>
            BEAUTYSMGM
          </Box>
        </Typography>
      </Box>

      {/* Main Header */}
      <AppBar
        position="fixed"
        sx={{
          top: showTopBanner ? topBannerHeight : 0,
          backgroundColor: "#fff",
          color: "#000",
          boxShadow: "none",
          borderBottom: "1px solid #e0e0e0",
          height: { xs: 65, sm: 85, md: 95 },
          justifyContent: "center",
          transition: "top 0.3s ease",
        }}
      >  <Container maxWidth="xl">
          <Toolbar sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "100%", px: 0 }}>
            {!isSearchActive && (
              <Typography variant="h5" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: { xs: 1.5, sm: 3, md: 4 }, fontSize: { xs: "16px", sm: "20px", md: "24px" }, color: "#000", flexShrink: 0 }}>
                SuperLabs
              </Typography>
            )}

            {/* Search Bar */}
            <Box ref={searchBoxRef} sx={{ position: 'relative', flex: 1, mx: { xs: 1, sm: 2, md: 2 } }}>
              <Box component="form" onSubmit={handleManualSearch} sx={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "25px", px: 1.5, py: 0.5, backgroundColor: "#f9f9f9", flex: 1, transition: "all 0.3s ease", maxWidth: isSearchActive ? "100%" : isMobile ? "calc(100% - 16px)" : { xs: "calc(100% - 80px)", sm: 400 } }}>
                <SearchIcon sx={{ color: "#666", mr: 1, fontSize: { xs: 18, sm: 20 } }} />
                <InputBase
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => onChange(e.target.value)}
                  onFocus={() => isMobile && setIsSearchActive(true)}
                  sx={{ flex: 1, fontSize: { xs: "13px", sm: "14px" } }}
                />
                {isSearchActive && (
                  <Button onClick={handleCancelSearch} sx={{ ml: 1, color: "#007aff", fontSize: { xs: "13px", sm: "14px" }, textTransform: "none", display: { xs: "inline", md: "none" } }}>
                    Cancel
                  </Button>
                )}
              </Box>

              {/* Suggestions Dropdown */}
              {suggestions.length > 0 && (
                <Paper sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 1, zIndex: 1300, borderRadius: '8px', boxShadow: 3 }}>
                  <List disablePadding>
                    {suggestions.map((suggestion, index) => (
                      <ListItemButton key={index} onClick={() => handleSuggestionClick(suggestion)} sx={{ py: 1, px: 2, '&:hover': { backgroundColor: '#f0f0f0' } }}>
                        <SearchIcon sx={{ color: "#666", mr: 1, fontSize: 18 }} />
                        <Typography variant="body2">{suggestion}</Typography>
                      </ListItemButton>
                    ))}
                  </List>
                </Paper>
              )}
            </Box>

            {!isSearchActive && (
              <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 1.5 }}>
                <Button sx={{ textTransform: "none", fontSize: 14, display: "flex", gap: 1, color: "black" }} startIcon={<StorefrontOutlined sx={{ height: 30, width: 30 }} />}>
                  <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                    <span style={{ fontWeight: 500 }}>Shop Store & Delivery</span>
                    <span style={{ fontSize: 12, color: "#555" }}>Choose your store & location</span>
                  </Box>
                </Button>
                <Button sx={{ textTransform: "none", fontSize: 14, display: "flex", alignItems: "center", gap: 0.5, color: "black" }} startIcon={<Event sx={{ height: 30, width: 30 }} />}>
                  Services & Events
                </Button>
                <Button sx={{ textTransform: "none", fontSize: 14, display: "flex", alignItems: "flex-start", gap: 1, color: "black" }} startIcon={<AccountCircleOutlined sx={{ height: 30, width: 30 }} />}>
                  <Box sx={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
                    <span style={{ fontWeight: 500 }}>Sign In</span>
                    <span style={{ fontSize: 12, color: "#555" }}>for FREE Shipping</span>
                  </Box>
                </Button>
              </Box>
            )}

            {!isSearchActive && (
              <Box sx={{ display: "flex", gap: { xs: 0.5, sm: 1 }, flexShrink: 0 }}>
                <IconButton sx={{ color: "#000", p: { xs: 0.5, sm: 1 } }}>
                  <Badge badgeContent={favoriteCount} color="error">
                    <FavoriteBorderOutlined fontSize="small" />
                  </Badge>
                </IconButton>
                <IconButton sx={{ color: "#000", p: { xs: 0.5, sm: 1 } }}>
                  <Badge badgeContent={cartCount} color="error">
                    <ShoppingCartOutlined fontSize="small" />
                  </Badge>
                </IconButton>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Desktop Navigation */}
      <Box sx={{ display: { xs: "none", sm: "none", md: "block" }, position: "fixed", top: desktopNavTop, transition: "top 0.3s ease", left: 0, right: 0, backgroundColor: "#000", color: "#fff", borderTop: "1px solid #333", zIndex: 1199 }}>
        <Container maxWidth="xl">
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 5, py: 1.5, overflowX: "auto", "&::-webkit-scrollbar": { display: "none" } }}>
            {navItems.map((item) => (
              <Typography key={item} component="a" href="#" sx={{ fontSize: "15px", fontWeight: 500, whiteSpace: "nowrap", textDecoration: "none", color: "#fff", "&:hover": { color: "#d4b5d4" }, transition: "color 0.2s" }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Add to Basket Mobile */}
      {location.pathname.startsWith("/product/") && (
        <Box sx={{ position: "fixed", bottom: "56px", left: 0, width: "100%", padding: "7px", backgroundColor: "white", display: { xs: "flex", sm: "none" }, justifyContent: "center", zIndex: 1000 }}>
          <AddToBasketButton quantity={quantity} setQuantity={setQuantity} />
        </Box>
      )}

      {/* Mobile Bottom Navigation */}
      <Box sx={{ display: { xs: "flex", md: "none" }, position: "fixed", bottom: 0, left: 0, right: 0, borderTop: "1px solid #ccc", backgroundColor: "#fff", zIndex: 1300 }}>
        <BottomNavigation showLabels value={bottomNavValue} onChange={(_event, newValue) => setBottomNavValue(newValue)} sx={{ width: "100%", minHeight: 55 }}>
          <BottomNavigationAction label="Home" icon={<HomeOutlined />} sx={{ minWidth: 0, maxWidth: "auto", px: 0.5 }} />
          <BottomNavigationAction label="Shop" icon={<StoreOutlined />} sx={{ minWidth: 0, maxWidth: "auto", px: 0.5 }} />
          <BottomNavigationAction label="Offer" icon={<LocalOfferOutlined />} sx={{ minWidth: 0, maxWidth: "auto", px: 0.5 }} />
          <BottomNavigationAction label="Me" icon={<PersonOutline />} sx={{ minWidth: 0, maxWidth: "auto", px: 0.5 }} />
          <BottomNavigationAction label="Community" icon={<GroupsOutlined />} sx={{ minWidth: 0, maxWidth: "auto", px: 0.5 }} />
          <BottomNavigationAction label="Store" icon={<StorefrontOutlined />} sx={{ minWidth: 0, maxWidth: "auto", px: 0.5 }} />
        </BottomNavigation>
      </Box>
    </Box>
  );
};

export default Header;
