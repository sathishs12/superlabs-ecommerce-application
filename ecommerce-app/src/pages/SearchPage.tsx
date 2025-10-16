import React, { useState, useEffect, useRef } from "react";
import ProductCard from "./product-pages/ProductCard";
import ProductModal from "./product-pages/ProductModal";
import FilterSidebar from "../components/filter-section/FilterSidebar";
import MobileFilter from "../components/filter-section/MobileFilter";
import { Box, Typography, Button, Skeleton } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import type { Product } from "../types/product";
import { useSearchParams } from "react-router-dom";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [filters, setFilters] = useState<any>({});
  const limit = 50;
  const lastScrollY = useRef(0);
  const [showMobileFilter, setShowMobileFilter] = useState(true);
  const mobileFilterHeight = 60; // Adjust height as needed

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowMobileFilter(false);
      } else {
        setShowMobileFilter(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    searchProducts(1, true, keyword);
  }, [keyword]);

  async function searchProducts(pageNumber = 1, reset = false, currentKeyword: string) {
    setLoading(true);

    if (reset) {
      setProducts([]);
      setFilteredProducts([]);
      setTotalResults(0);
      setPage(1);
    }

    try {
      const queryString = currentKeyword.trim()
        ? `q=${encodeURIComponent(currentKeyword)}`
        : '';
      const url = `https://bb3-api.ashwinsrivastava.com/store/product-search?${queryString}&minRating=1&page=${pageNumber}&limit=${limit}`;

      const res = await fetch(url);
      const data = await res.json();

      const apiProducts = data?.data?.products ?? [];
      const meta = data?.data?.meta ?? {};

      const newProducts = apiProducts.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        thumbnail:
          p.thumbnail ||
          p.productImages?.[0]?.image ||
          "https://via.placeholder.com/300x300?text=No+Image",
        averageRating: p.averageRating,
        reviewsCount: p.reviewsCount,
        brand: p.brand?.title || "",
        priceStart: p.priceStart || p.variants?.[0]?.currentPrice,
        category: p.category?.title || "",
        inStore: p.inStore || false,
        sameDay: p.sameDay || false,
        attributes: p.productValuesForAttribute?.map(
          (a: any) => a.productAttributeValue?.value
        ),
      }));

      setProducts((prev) => (reset ? newProducts : [...prev, ...newProducts]));
      setFilteredProducts((prev) =>
        reset ? newProducts : [...prev, ...newProducts]
      );

      if (meta?.total) {
        setTotalResults(meta.total);
      } else if (meta?.lastPage) {
        setTotalResults(meta.items * meta.lastPage);
      } else {
        setTotalResults((prev) => prev || newProducts.length);
      }

      setPage(pageNumber);
    } catch (error) {
      console.error("searchProducts error:", error);
    } finally {
      setLoading(false);
    }
  }
  const handleLoadMore = () => {
    searchProducts(page + 1, false, keyword);
  };

  useEffect(() => {
    let result = [...products];
    if (keyword.trim()) {
      result = result.filter((p) =>
        p.title?.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    Object.entries(filters).forEach(([section, values]: any) => {
      switch (section) {
        case "brand":
          const activeBrands = Object.entries(values)
            .filter(([_, v]) => v)
            .map(([k]) => k);
          if (activeBrands.length) {
            result = result.filter((p) => activeBrands.includes(p.brand ?? ""));
          }
          break;

        case "rating":
          const activeRatings = Object.entries(values)
            .filter(([_, v]) => v)
            .map(([k]) => Number(k));
          if (activeRatings.length) {
            result = result.filter((p) => {
              const productRating = Math.floor(p.averageRating || 0);
              return activeRatings.some((r) => productRating >= r);
            });
          }
          break;

        case "delivery":
          const activeDelivery = Object.entries(values)
            .filter(([_, v]) => v)
            .map(([k]) => k);
          if (activeDelivery.length) {
            result = result.filter((p) =>
              activeDelivery.some((v: string) =>
                v === "inStore" ? p.inStore : p.sameDay
              )
            );
          }
          break;

        case "price":
          const priceFilter = values as {
            under25: boolean;
            from25to50: boolean;
            from50to100: boolean;
            above100: boolean;
            custom: boolean;
            min: string;
            max: string;
          };
          if (
            !priceFilter.under25 &&
            !priceFilter.from25to50 &&
            !priceFilter.from50to100 &&
            !priceFilter.above100 &&
            !priceFilter.custom
          ) break;

          result = result.filter((p) => {
            const price = p.priceStart ?? 0;
            const checks: boolean[] = [];

            if (priceFilter.under25) checks.push(price < 2000);
            if (priceFilter.from25to50) checks.push(price >= 2000 && price <= 4000);
            if (priceFilter.from50to100) checks.push(price > 4000 && price <= 8000);
            if (priceFilter.above100) checks.push(price > 8000);

            if (priceFilter.custom) {
              const min = parseFloat(priceFilter.min) || 0;
              const max = parseFloat(priceFilter.max) || Infinity;
              checks.push(price >= min && price <= max);
            }

            return checks.some(Boolean);
          });
          break;


        default:
          const activeAttrs = Object.entries(values)
            .filter(([_, v]) => v)
            .map(([k]) => k);
          if (activeAttrs.length) {
            result = result.filter((p) =>
              p.attributes?.some((attr: string) => activeAttrs.includes(attr))
            );
          }
      }
    });

    setFilteredProducts(result);
  }, [filters, products, keyword]);



  return (
    <Box sx={{ pt: { xs: "170px", md: "180px" }, pb: "100px" }}>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "fixed",
          top: { xs: 125, sm: 140 },
          left: 0,
          right: 0,
          zIndex: 1100,
          backgroundColor: "#fff",
          borderBottom: "1px solid #eee",
           transition: "transform 0.4s ease",
          transform: showMobileFilter ? "translateY(0)" : `translateY(-${mobileFilterHeight}px)`,
        }}
      >
        <MobileFilter section="mobile" onFilterChange={setFilters} />
      </Box>

      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ px: { xs: 1, sm: 2, md: 2 }, py: { xs: 1, sm: 2, md: 3 } }}>
        <Grid
          item
          xs={0}
          md={3.2}
          lg={3}
          sx={{
            display: { xs: "none", md: "block" },
            pr: { md: 1.5, lg: 2 },
          }}
        >

          <FilterSidebar onFilterChange={setFilters} />
        </Grid>

        {/* Product Grid */}
        <Grid item xs={12} md={8.8} lg={9}>
          <Box
            sx={{
              mb: 2,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Typography sx={{ fontSize: "16px", opacity: 0.6 }}>
              {filteredProducts.length > 0
                ? `${filteredProducts.length} Results`
                : `${totalResults} Total Results`}
            </Typography>

            {keyword.trim() && (
              <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                for:{" "}
                <Box
                  component="span"
                  sx={{ fontWeight: "bold", color: "black" }}
                >
                  "{keyword}"
                </Box>
              </Typography>
            )}
          </Box>


          {loading && products.length === 0 ? (
            <Grid container spacing={{ xs: 1.5, sm: 2.5, md: 3 }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <Skeleton variant="rectangular" height={220} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map((p) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={4}
                  key={p.id}
                >
                  <ProductCard product={p} onView={setSelectedProduct} />
                </Grid>
              ))}

              <Box sx={{ textAlign: "center", mt: 5, width: "100%" }}>
                <Typography
                  variant="body1"
                  sx={{ mb: 2, fontWeight: 500, opacity: 0.8 }}
                >
                  {`1–${products.length} of ${totalResults} Results`}
                </Typography>

                <Button
                  onClick={handleLoadMore}
                  disabled={loading}
                  sx={{
                    borderRadius: "50px",
                    px: 4,
                    py: 1,
                    backgroundColor: "white",
                    color: "black",
                    fontWeight: 600,
                    border: "1px solid black",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "black",
                      border: "1px solid black",
                    },
                  }}
                >
                  {loading ? "Loading..." : "Show More Products"}
                </Button>
              </Box>
            </Grid>
          )}
        </Grid>
      </Grid>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </Box>
  );
};

export default SearchPage;