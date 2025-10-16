import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Drawer,
  Typography,
  Checkbox,
  FormControlLabel,
  Rating,
  IconButton,
} from "@mui/material";
import { Star, StarBorder, Close } from "@mui/icons-material";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Sort } from "@mui/icons-material";

interface Brand {
  id: string;
  name: string;
  productCount: number;
}
interface Attribute {
  title: string;
  code: string;
  values: { value: string; productCount: number }[];
}
interface ApiResponse {
  brands: Brand[];
  attributes: Attribute[];
  ratingsCounts: Record<string, number>;
}

interface MobileFilterProps {
  section: string;
  onFilterChange: (filters: Record<string, any>) => void;
}

const MobileFilter: React.FC<MobileFilterProps> = ({ onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [ratingsCounts, setRatingsCounts] = useState<Record<string, number>>({});
  const [selectedFilters, setSelectedFilters] = useState<Record<string, Record<string, boolean>>>({
    instore: {}, 
    sameDay: {},
    rating: {},
    brand: {},
  });
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [showAllAttributes, setShowAllAttributes] = useState<Record<string, boolean>>({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    fetch("https://bb3-api.ashwinsrivastava.com/store/product-search?q=&minRating=1&page=1&limit=50")
      .then((res) => res.json())
      .then((data: { data: ApiResponse }) => {
        const apiData = data.data;
        setBrands(apiData.brands || []);
        setAttributes(apiData.attributes || []);
        const ratingNumbers = Object.keys(apiData.ratingsCounts || {}).map((r) => parseInt(r, 10));
        setRatings(ratingNumbers.sort((a, b) => b - a));
        setRatingsCounts(apiData.ratingsCounts || {});
      });
  }, []);

  const toggleFilter = (sectionId: string, optionId: string) => {
    setSelectedFilters((prev) => {
      const updated = { ...(prev[sectionId] || {}), [optionId]: !(prev[sectionId]?.[optionId] || false) };
      const newFilters = { ...prev, [sectionId]: updated };
      onFilterChange(newFilters);
      return newFilters;
    });
  };


  const getCumulativeCount = (rating: number) =>
    Object.entries(ratingsCounts)
      .filter(([r]) => parseInt(r, 10) >= rating)
      .reduce((acc, [, c]) => acc + c, 0);

  const handleOpenDrawer = (section: string) => {
    setOpen(true);
    setTimeout(() => {
      const el = sectionRefs.current[section];
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 400);

    if (section !== "rating" && section !== "brand") {
      setExpandedSections((prev) => ({ ...prev, [section]: true }));
    }
  };


  const handleClearAll = () => {
    setSelectedFilters({ rating: {}, brand: {} });
    onFilterChange({});
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 1,
          px: 2,
          py: 1,
          backgroundColor: "#fff",
          position: "fixed",
          left: 0,
          right: 0,
          zIndex: 1200,
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box
          key="sort"
          sx={{
            flexShrink: 0,
            backgroundColor: "#e0e0e0",
            borderRadius: 2,
            px: 2,
            py: 0.8,
            cursor: "pointer",
            whiteSpace: "nowrap",
            display: "flex",
            alignItems: "center",
            "&:hover": { backgroundColor: "#d5d5d5" },
          }}
          onClick={() => handleOpenDrawer("sort")} // opens drawer
        >
          <Sort sx={{ fontSize: 16, mr: 0.5 }} />
          <Typography sx={{ fontSize: 12, color: "#000" }}>Sort</Typography>
        </Box>
        {["In Store", "Same-Day Delviery", "rating", "brand", ...attributes.map((a) => a.code)].map((section) => (
          <Box
            key={section}
            onClick={() => handleOpenDrawer(section)}
            sx={{
              flexShrink: 0,
              backgroundColor: "#e0e0e0",
              borderRadius: 2,
              px: 2,
              py: 0.8,
              cursor: "pointer",
              whiteSpace: "nowrap",
              "&:hover": { backgroundColor: "#d5d5d5" },
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography sx={{ color: "#000", fontSize: 12 }}>
              {section === "rating"
                ? "Rating"
                : section === "brand"
                  ? "Brand"
                  : attributes.find((a) => a.code === section)?.title || section}
            </Typography>
            <IconButton size="small" sx={{ p: 0 }}>
              {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </IconButton>
          </Box>
        ))}
      </Box>

      {/* Drawer */}
      <Drawer
        anchor="bottom"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            height: "80%",
            borderTopLeftRadius: 12,
            borderTopRightRadius: 12,
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
            pt: 1,
            pb: 1,
            borderBottom: "1px solid #eee",
          }}
        >
          <Typography variant="h6">Filters</Typography>
          <IconButton onClick={() => setOpen(false)}>
            <Close />
          </IconButton>
        </Box>

        {/* Scrollable Content */}
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: 2,
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {/* Rating Section */}
          <Box
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current["rating"] = el;
            }} sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
            <Typography fontWeight={500} fontSize="0.95rem" color="black">Rating</Typography>
            {ratings.map((r) => (
              <FormControlLabel
                key={r}
                control={
                  <Checkbox
                    checked={selectedFilters.rating?.[`${r}`] || false}
                    onChange={() => toggleFilter("rating", `${r}`)}
                    sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating value={r} precision={1} readOnly icon={<Star />} emptyIcon={<StarBorder />} />
                    <Typography>{r} & Up ({getCumulativeCount(r)})</Typography>
                  </Box>
                }
              />
            ))}
          </Box>

          {/* Brand Section */}
          <Box
            ref={(el: HTMLDivElement | null) => {
              sectionRefs.current["brand"] = el;
            }} sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
            <Typography fontWeight={500} fontSize="10px" color="black">Brand</Typography>
            {brands.slice(0, showAllBrands ? brands.length : 10).map((b) => (
              <FormControlLabel
                key={b.id}
                control={
                  <Checkbox
                    checked={selectedFilters.brand?.[b.name] || false}
                    onChange={() => toggleFilter("brand", b.name)}
                    sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                  />
                }
                label={<Typography fontSize={13}>{b.name} ({b.productCount})</Typography>}
              />
            ))}
            {brands.length > 10 && (
              <Button size="small" onClick={() => setShowAllBrands(!showAllBrands)} sx={{ textTransform: "none" }}>
                {showAllBrands ? "Show Less" : "Show More"}
              </Button>
            )}
          </Box>

          {/* Dynamic Attributes */}
          {attributes.map((attr) => (
            <Box
              ref={(el: HTMLDivElement | null) => {
                sectionRefs.current[attr.code] = el;
              }}
              sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}
            >
              <Button
                onClick={() =>
                  setExpandedSections((prev) => ({ ...prev, [attr.code]: !prev[attr.code] }))
                }
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  textTransform: "none",
                  p: 0.5,
                }}
              >
                <Typography fontWeight={700} fontSize="0.95rem" color="black">
                  {attr.title}
                </Typography>
                {expandedSections[attr.code] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
              {expandedSections[attr.code] && (
                <Box sx={{ mt: 0.5, pl: 1 }}>
                  {attr.values
                    .slice(0, showAllAttributes[attr.code] ? attr.values.length : 10)
                    .map((opt) => (
                      <FormControlLabel
                        key={opt.value}
                        control={
                          <Checkbox
                            checked={selectedFilters[attr.code]?.[opt.value] || false}
                            onChange={() => toggleFilter(attr.code, opt.value)}
                            sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                          />
                        }
                        label={<Typography fontSize={13}>{opt.value} ({opt.productCount})</Typography>}
                      />
                    ))}
                  {attr.values.length > 10 && (
                    <Button
                      size="small"
                      onClick={() =>
                        setShowAllAttributes((prev) => ({ ...prev, [attr.code]: !prev[attr.code] }))
                      }
                      sx={{ textTransform: "none" }}
                    >
                      {showAllAttributes[attr.code] ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          ))}
        </Box>

        {/* Bottom fixed buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            px: 2,
            py: 1.5,
            borderTop: "1px solid #eee",
            backgroundColor: "#fff",
          }}
        >
          <Button
            // variant="outlined"
            fullWidth
            onClick={handleClearAll}
            sx={{ textTransform: "none", color:"black", border: "1px solid black", borderRadius:"20px" }}
          >
            Clear All
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setOpen(false)}
            sx={{ textTransform: "none", borderRadius:"20px", backgroundColor: "#000", "&:hover": { backgroundColor: "#222" } }}
          >
            Show Results
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileFilter;
