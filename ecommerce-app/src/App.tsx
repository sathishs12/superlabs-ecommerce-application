import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, useSearchParams } from "react-router-dom"; 
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchPage from "./pages/SearchPage";
import ProductPage from "./pages/product-pages/ProductPage";
import { Fab } from "@mui/material";

const App: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  const urlKeyword = searchParams.get('keyword') || "";
  const [query, setQuery] = useState(urlKeyword); 
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    setQuery(urlKeyword);
  }, [urlKeyword]);

  useEffect(() => {
    const handleScroll = () => setShowTopButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleSearchUpdate = (keyword: string) => {
    if (keyword.trim()) {
      setSearchParams({ keyword: keyword.trim() });
      if (location.pathname !== '/search') {
        navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
      }
    } else {
      setSearchParams({});
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
  };

  return (
    <div>
      <Header
        query={query}
        onChange={setQuery}
        onSearch={handleSearchUpdate}
        cartCount={2}
        favoriteCount={3}
      />

      <Routes>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:handle" element={<ProductPage />} />
        <Route path="/" element={<SearchPage />} />
        <Route path="*" element={<SearchPage />} />
      </Routes>

      <Footer />

      {showTopButton && (
        <Fab
          onClick={scrollToTop}
          sx={{
            position: "fixed",
            top: { xs: 170, sm: 190, md: 200 },
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2000,
            bgcolor: "rgba(0,0,0,0.7)",
            color: "#fff",
            "&:hover": { bgcolor: "rgba(0,0,0,0.9)" },
            textTransform: "none",
            fontSize: 12,
            px: 2,
            py: 0.5,
          }}
          variant="extended"
        >
          Back to Top
        </Fab>
      )}
    </div>
  );
};

export default App;
