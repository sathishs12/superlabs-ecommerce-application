import React from "react";
import type { Product } from "../../types/product";
import { Dialog, DialogTitle, DialogContent, Typography, DialogActions, Button, Box } from "@mui/material";

interface Props {
  product: Product | null;
  onClose: () => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <Dialog open={!!product} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product.title}</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
            <img src={product.thumbnail || ""} alt={product.title} style={{ maxHeight: 250, objectFit: "contain" }} />
          </Box>
          <Box sx={{ flex: 2 }}>
            <Typography variant="body2" color="text.secondary">{product.description}</Typography>
            <Typography variant="h6" sx={{ mt: 2 }}>Price: ₹{product.priceStart}</Typography>
            {product.averageRating && <Typography variant="body2">{product.averageRating} ★</Typography>}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
        <Button variant="contained">Add to Cart</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
