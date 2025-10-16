import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Box, Typography, Button, Checkbox, FormControlLabel, Rating, TextField } from "@mui/material";
import { Star, StarBorder, LocationOnOutlined, StoreOutlined } from "@mui/icons-material";

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
  products?: any[];
  searchResults?: { value: string; productCount: number }[];
}

interface FilterSidebarProps {
  onFilterChange: (filters: Record<string, any>) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    rating: false,
    brand: false,
    delivery: true,
  });

  const [selectedFilters, setSelectedFilters] = useState<Record<string, Record<string, boolean>>>({
    rating: {},
    brand: {},
    delivery: { inStore: false, sameDay: false },
  });

  const [brands, setBrands] = useState<Brand[]>([]);
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [ratings, setRatings] = useState<number[]>([]);
  const [ratingsCounts, setRatingsCounts] = useState<Record<string, number>>({});
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [showAllAttributes, setShowAllAttributes] = useState<Record<string, boolean>>({});

  const [searchResults, setSearchResults] = useState<{ value: string; productCount: number }[]>([]);
  const [showAllSearchResults, setShowAllSearchResults] = useState(false);

  useEffect(() => {
    fetch("https://bb3-api.ashwinsrivastava.com/store/product-search?q=&minRating=1&page=1&limit=50")
      .then(res => res.json())
      .then((data: { data: ApiResponse }) => {
        const apiData = data.data;
        setBrands(apiData.brands || []);
        setAttributes(apiData.attributes || []);
        const ratingNumbers = Object.keys(apiData.ratingsCounts || {}).map(r => parseInt(r, 10));
        setRatings(ratingNumbers.sort((a, b) => b - a));
        setRatingsCounts(apiData.ratingsCounts || {});
        
        const flatResults: { value: string; productCount: number }[] = [];
        apiData.attributes?.forEach(attr => {
          attr.values.forEach(v => flatResults.push({ value: v.value, productCount: v.productCount }));
        });

        // Sort descending by productCount
        flatResults.sort((a, b) => b.productCount - a.productCount);
        setSearchResults(flatResults);
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const toggleFilter = (sectionId: string, optionId: string) => {
    setSelectedFilters(prev => {
      const updatedSection = { ...(prev[sectionId] || {}), [optionId]: !(prev[sectionId]?.[optionId] || false) };
      const updatedFilters = { ...prev, [sectionId]: updatedSection };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
  };

  const getCumulativeCount = (rating: number) => {
    return Object.entries(ratingsCounts)
      .filter(([r]) => parseInt(r, 10) >= rating)
      .reduce((acc, [, count]) => acc + count, 0);
  };

  const filteredBrands = brands
    .filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase()))
    .slice(0, showAllBrands ? brands.length : 10);

  // Inside your FilterSidebar component, define a price filter state
  const [selectedFiltersPrice, setSelectedFiltersPrice] = useState<{
    under25: boolean;
    from25to50: boolean;
    from50to100: boolean;
    above100: boolean;
    custom: boolean;
    min: string;
    max: string;
  }>({
    under25: false,
    from25to50: false,
    from50to100: false,
    above100: false,
    custom: false,
    min: "",
    max: "",
  });

  // Handle price toggle
  const togglePriceFilter = (option: keyof typeof selectedFiltersPrice) => {
    setSelectedFiltersPrice(prev => {
      const updated = { ...prev, [option]: !prev[option] };
      // Automatically apply price filter for predefined options
      if (option !== "custom") {
        onFilterChange({
          ...selectedFilters,
          price: updated,
        });
      }
      return updated;
    });
  };

  // Handle min/max change
  const handlePriceChange = (field: "min" | "max", value: string) => {
    setSelectedFiltersPrice(prev => ({ ...prev, [field]: value }));
  };

  // Apply custom price filter
  const applyPriceFilter = () => {
    onFilterChange({
      ...selectedFilters,
      price: selectedFiltersPrice,
    });
  };



  return (
    <Box sx={{ width: "80%", p: 1 }}>
      {/* Search Results Section */}
      <Box sx={{ width: "100%", mb: 2 }}>
        <Typography variant="subtitle2" gutterBottom fontWeight={700} sx={{ fontSize: "1.5rem" }}>
          Search Results
        </Typography>

        {(showAllSearchResults ? searchResults : searchResults.slice(0, 9)).map(item => (
          <Typography key={item.value} fontSize={14} sx={{ mb: 0.3, px: 4 }}>
            {item.value} ({item.productCount})
          </Typography>
        ))}

        {searchResults.length > 9 && (
          <Button
            size="small"
            onClick={() => setShowAllSearchResults(prev => !prev)}
            sx={{ textTransform: "none", mt: 0.5, px: 4 }}
          >
            {showAllSearchResults ? "Show Less" : "Show More"}
          </Button>
        )}
      </Box>

      {/* Rating Section */}
      <Box sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
        <Typography variant="subtitle2" gutterBottom sx={{ fontSize: "0.9rem" }}>
          Filters
        </Typography>
        {/* In Store & Delivery Section */}
        <Box sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
          <Button
            onClick={() => toggleSection("delivery")}
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              textTransform: "none",
              p: 0.5,
            }}
          >
            <Typography
              fontWeight={700}
              fontSize="0.95rem"
              color="black"
              sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
            >
              In Store & Delivery
            </Typography>
            {expandedSections.delivery ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          {expandedSections.delivery && (
            <Box
              sx={{
                mt: 1,
                pl: 2,
                px: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* In Store */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.delivery?.inStore || false}
                    onChange={() => toggleFilter("delivery", "inStore")}
                    sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                    icon={<StoreOutlined />}
                  />
                }
                label={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.3,
                      wordBreak: "break-word", // allow long words to wrap
                    }}
                  >
                    <Typography fontSize={15} sx={{ lineHeight: 1.2 }}>
                      In Store: Choose a Store
                    </Typography>
                  </Box>
                }
              />

              {/* Same-Day Delivery */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFilters.delivery?.sameDay || false}
                    onChange={() => toggleFilter("delivery", "sameDay")}
                    sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                    icon={<LocationOnOutlined />}
                  />
                }
                label={
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.3,
                      wordBreak: "break-word",
                    }}
                  >
                    <Typography fontSize={15} sx={{ lineHeight: 1.2 }}>
                      Same-Day Delivery: Set Your Location
                    </Typography>
                  </Box>
                }
              />
            </Box>
          )}
        </Box>


        {/* Price Range Section */}
        <Box sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
          <Button
            onClick={() => toggleSection("price")}
            sx={{ width: "100%", display: "flex", justifyContent: "space-between", textTransform: "none", p: 0.5 }}
          >
            <Typography fontWeight={700} fontSize="0.95rem" color="black">Price</Typography>
            {expandedSections.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>

          {expandedSections.price && (
            <Box sx={{ mt: 1, pl: 2, px: 3, display: "flex", flexDirection: "column", gap: 1 }}>

              {/* Predefined Price Ranges in INR */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFiltersPrice.under25}
                    onChange={() => togglePriceFilter("under25")}
                    sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                  />
                }
                label={<Typography fontSize={14}>Under ₹2000</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFiltersPrice.from25to50}
                    onChange={() => togglePriceFilter("from25to50")}
                    sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                  />
                }
                label={<Typography fontSize={14}>₹2000 to ₹4000</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFiltersPrice.from50to100}
                    onChange={() => togglePriceFilter("from50to100")}
                    sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                  />
                }
                label={<Typography fontSize={14}>₹4000 to ₹8000</Typography>}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFiltersPrice.above100}
                    onChange={() => togglePriceFilter("above100")}
                    sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                  />
                }
                label={<Typography fontSize={14}>Above ₹8000</Typography>}
              />

              {/* Custom Price Range */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedFiltersPrice.custom}
                    onChange={() => togglePriceFilter("custom")}
                    sx={{ color: "black", "&.Mui-checked": { color: "black" } }}
                  />
                }
                label={<Typography fontSize={14}>Custom Range</Typography>}
              />

              {/* Show min/max only if custom is selected */}
              {selectedFiltersPrice.custom && (
                <Box sx={{ display: "flex", gap: 1, mt: 0.5 }}>
                  <TextField
                    size="small"
                    placeholder="Min"
                    value={selectedFiltersPrice.min}
                    onChange={e => handlePriceChange("min", e.target.value)}
                    sx={{ width: "50%" }}
                  />
                  <TextField
                    size="small"
                    placeholder="Max"
                    value={selectedFiltersPrice.max}
                    onChange={e => handlePriceChange("max", e.target.value)}
                    sx={{ width: "50%" }}
                  />
                </Box>
              )}

              {selectedFiltersPrice.custom && (
                <Button
                  size="small"
                  variant="contained"
                  onClick={applyPriceFilter}
                  sx={{ mt: 1, width: "100%", textTransform: "none", color: "white", bgcolor: "black" }}
                >
                  Apply
                </Button>
              )}
            </Box>
          )}
        </Box>

        {/* Brand Section */}
        <Box sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
          <Button
            onClick={() => toggleSection("brand")}
            sx={{ width: "100%", display: "flex", justifyContent: "space-between", textTransform: "none", p: 0.5 }}
          >
            <Typography fontWeight={700} fontSize="0.95rem" color="black">Brand</Typography>
            {expandedSections.brand ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </Button>
          {expandedSections.brand && (
            <Box sx={{ mt: 0.5, pl: 1, px: 4 }}>
              <TextField
                size="small"
                placeholder="Search brands"
                fullWidth
                value={brandSearch}
                onChange={e => setBrandSearch(e.target.value)}
                sx={{ mb: 1, borderRadius: 2, "& .MuiOutlinedInput-root": { borderRadius: "25px" } }}
              />
              {filteredBrands.map(b => (
                <Box key={b.id} sx={{ mb: 1.8 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedFilters.brand?.[b.name] || false}
                        onChange={() => toggleFilter("brand", b.name)}
                        sx={{ color: "black", "&.Mui-checked": { color: "black" }, padding: 0 }}
                      />
                    }
                    label={<Typography fontSize={13}>{b.name} ({b.productCount})</Typography>}
                  />
                </Box>
              ))}
              {brands.filter(b => b.name.toLowerCase().includes(brandSearch.toLowerCase())).length > 10 && (
                <Button size="small" onClick={() => setShowAllBrands(prev => !prev)} sx={{ textTransform: "none", mt: 0.5 }}>
                  {showAllBrands ? "Show Less" : "Show More"}
                </Button>
              )}
            </Box>
          )}
        </Box>
        <Button
          onClick={() => toggleSection("rating")}
          sx={{ width: "100%", display: "flex", justifyContent: "space-between", textTransform: "none", p: 0.5 }}
        >
          <Typography fontWeight={700} fontSize="0.95rem" color="black">Rating</Typography>
          {expandedSections.rating ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </Button>
        {expandedSections.rating && (
          <Box sx={{ mt: 0.5, pl: 1, px: 4 }}>
            {ratings.map(r => (
              <FormControlLabel
                key={r}
                control={
                  <Checkbox
                    checked={selectedFilters.rating?.[`${r}`] || false}
                    onChange={() => toggleFilter("rating", `${r}`)}
                    sx={{ color: "black", "&.Mui-checked": { color: "black" }, padding: 0 }}
                  />
                }
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Rating
                      value={r}
                      precision={1}
                      readOnly
                      size="small"
                      icon={<Star sx={{ color: "black", height: "18px", width: "18px" }} />}
                      emptyIcon={<StarBorder sx={{ color: "black", height: "18px", width: "18px" }} />}
                    />
                    <Typography fontSize={11}>{r} & Up ({getCumulativeCount(r)})</Typography>
                  </Box>
                }
              />
            ))}
          </Box>
        )}
      </Box>


      {attributes.map(attr => { 
        const search = ""; 
        const showAll = showAllAttributes[attr.code] || false;

        const filteredOptions = attr.values
          .filter(v => v.value.toLowerCase().includes(search.toLowerCase()))
          .slice(0, showAll ? attr.values.length : 10);

        return (
          <Box key={attr.code} sx={{ borderBottom: "1px solid #e0e0e0", pb: 1, mb: 1 }}>
            <Button
              onClick={() => toggleSection(attr.code)}
              sx={{ width: "100%", display: "flex", justifyContent: "space-between", textTransform: "none", p: 0.5 }}
            >
              <Typography fontWeight={700} fontSize="0.95rem" color="black">{attr.title}</Typography>
              {expandedSections[attr.code] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
            {expandedSections[attr.code] && (
              <Box sx={{ mt: 0.5, pl: 1, px: 4 }}>
                {filteredOptions.map(opt => (
                  <Box key={opt.value} sx={{ mb: 1.8 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedFilters[attr.code]?.[opt.value] || false}
                          onChange={() => toggleFilter(attr.code, opt.value)}
                          sx={{ color: "black", "&.Mui-checked": { color: "black" }, padding: 0 }}
                        />
                      }
                      label={<Typography fontSize={13}>{opt.value} ({opt.productCount})</Typography>}
                    />
                  </Box>
                ))}
                {/* Show More */}
                {attr.values.filter(v => v.value.toLowerCase().includes(search.toLowerCase())).length > 10 && (
                  <Button
                    size="small"
                    onClick={() => setShowAllAttributes(prev => ({ ...prev, [attr.code]: !prev[attr.code] }))}
                    sx={{ textTransform: "none", mt: 0.5 }}
                  >
                    {showAll ? "Show Less" : "Show More"}
                  </Button>
                )}
              </Box>
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default FilterSidebar;
