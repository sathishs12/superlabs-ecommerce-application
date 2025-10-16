import React from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  Stack,
  Button,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Grid from "@mui/material/GridLegacy";
import { Star } from "@mui/icons-material";

interface ProductReviewsSummaryProps {
  averageRating?: number | null;
  totalReviews?: number | null;
  recommendedPercent?: number | null;
  ratingDistribution?: number[];
  pros?: Record<string, number>;
  cons?: Record<string, number>;
}

const ProductReviewsSummary: React.FC<ProductReviewsSummaryProps> = ({
  averageRating,
  totalReviews,
  recommendedPercent,
  ratingDistribution,
  pros,
  cons,
}) => {
  const avg = averageRating ?? 0;
  const total = totalReviews ?? 0;
  const recommend =
    recommendedPercent ?? Math.round((avg / 5) * 100);
  const distribution = ratingDistribution ?? [0, 0, 0, 0, 0];
  const prosData = pros ?? {};
  const consData = cons ?? {};

  const maxRating = Math.max(...distribution, 1);

  return (
    <Box sx={{ mt: 6, mb: 4, borderTop: 1, borderColor: "grey.200" }}>
      <Box sx={{ p: 3, borderRadius: 2 }}>
        <Typography variant="h5" fontWeight={600} mb={0}>
          Ratings & Reviews ({total})
        </Typography>
        <Button variant="text" sx={{ mb: 3, textTransform: "none" }}>
          Write a review
        </Button>

        <Grid container spacing={3} alignItems="stretch">
          {/* Left: Rating Bars */}
          <Grid item xs={12} md={3}>
            <Typography fontWeight={600} mb={2}>
              Summary
            </Typography>
            <Stack spacing={1}>
              {[5, 4, 3, 2, 1].map((rating) => (
                <Box key={rating} display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" width={16}>
                    {rating}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={
                      (distribution[5 - rating] / maxRating) * 100 || 0
                    }
                    sx={{
                      flex: 1,
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: "#eee",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#000",
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Grid>

          {/* Center: Overall Rating */}
          <Grid
            item
            xs={12}
            md={2}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            sx={{
              borderRight: { md: "1px solid #e0e0e0" },
              py: { xs: 2, md: 0 },
            }}
          >
            <Box display="flex" alignItems="center" gap={0.5}>
              <Typography variant="h4" fontWeight={500}>
                {avg.toFixed(1)}
              </Typography>
              <Star sx={{ height: "40px", width: "40px" }} />
            </Box>
            <Typography variant="body2" color="text.secondary" mb={1}>
              {total} Reviews*
            </Typography>
            <Typography variant="h5" fontWeight={500}>
              {recommend}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Recommended
            </Typography>
          </Grid>

          {/* Right: Pros & Cons */}
          <Grid item xs={12} md={4}>
            <Typography fontWeight={600} mb={1}>
              Pros Mentioned
            </Typography>
            {Object.keys(prosData).length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
                {Object.entries(prosData).map(([key, value]) => (
                  <Chip
                    key={key}
                    label={`${key} (${value})`}
                    variant="outlined"
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary" mb={2}>
                No pros mentioned yet.
              </Typography>
            )}

            <Typography fontWeight={600} mb={1}>
              Cons Mentioned
            </Typography>
            {Object.keys(consData).length > 0 ? (
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {Object.entries(consData).map(([key, value]) => (
                  <Chip
                    key={key}
                    label={`${key} (${value})`}
                    variant="outlined"
                  />
                ))}
              </Stack>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No cons mentioned yet.
              </Typography>
            )}
          </Grid>
        </Grid>

        <Typography variant="caption" color="text.secondary" mt={2} display="block">
          *Some reviewers received something in exchange for a review (free
          product, payment, or sweepstakes entry).
        </Typography>

        <Box display="flex" alignItems="center" gap={1} sx={{ mt: 1 }}>
          <CheckCircleIcon sx={{ color: "primary.main" }} />
          <Box>
            <Typography fontWeight={600} variant="body2">
              Authentic Reviews
            </Typography>
            <Typography variant="caption" color="text.secondary">
              BazaarVoice
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductReviewsSummary;
