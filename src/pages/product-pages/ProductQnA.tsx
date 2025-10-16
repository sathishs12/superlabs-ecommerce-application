import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Stack,
  InputAdornment,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { Search, X } from "lucide-react";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/GridLegacy";

interface Question {
  id: number;
  question: string;
  answer?: string;
  date: string;
}

interface ProductQnAProps {
  questions?: Question[];
}

const ProductQnA: React.FC<ProductQnAProps> = ({ questions = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const displayedQuestions = showAll ? questions : questions.slice(0, 1);
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ mt: 6, mb: 4, borderTop: 1, borderColor: "grey.200", pt: 4 }}>
      <Grid container spacing={4}>
        {/* LEFT SIDE */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" fontWeight={700} mb={1}>
            Questions & Answers ({questions.length})
          </Typography>

          <Button
            variant="text"
            sx={{
              textTransform: "none",
              color: "primary.main",
              mb: 1,
              p: 0,
            }}
          >
            Ask a question
          </Button>

          {/* Search + Sort Section */}
          <Stack
            direction={isSmall ? "column" : "row"}
            spacing={2}
            alignItems="center"
            mb={3}
          >
            {/* Search Toggle Button */}
            <IconButton
              onClick={() => setShowSearch(!showSearch)}
              sx={{
                backgroundColor: "#f5f5f5",
                borderRadius: "50%",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              {showSearch ? <X size={18} /> : <Search size={18} />}
            </IconButton>

            {/* Search Field (Visible on Toggle) */}
            {showSearch && (
              <TextField
                fullWidth
                placeholder="Search questions"
                variant="outlined"
                size="small"
                sx={{
                  backgroundColor: "#f5f5f5",
                  borderRadius: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                  },
                  transition: "all 0.3s ease",
                  width: isSmall ? "100%" : "200px",
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={18} color="#777" />
                    </InputAdornment>
                  ),
                }}
              />
            )}

            {/* Sort Button */}
            <Button
              variant="outlined"
              sx={{
                textTransform: "none",
                borderRadius: "50px",
                fontWeight: 500,
                backgroundColor: "#f5f5f5",
                color: "text.primary",
                borderColor: "transparent",
                "&:hover": {
                  backgroundColor: "#e0e0e0",
                },
              }}
            >
              Sort
            </Button>
          </Stack>
        </Grid>

        {/* RIGHT SIDE */}
        <Grid item xs={12} md={7}>
          <Typography fontWeight={600} mb={2} mt={8}>
            Most Recent Questions
          </Typography>

          {displayedQuestions.map((q) => (
            <Box key={q.id} mb={2} pb={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                Q: {q.question}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                display="block"
                mb={1}
                px={2}
              >
                Asked {q.date}
              </Typography>
              {q.answer ? (
                <Typography variant="body2">A: {q.answer}</Typography>
              ) : (
                <Button
                  variant="text"
                  sx={{
                    textTransform: "none",
                    color: "primary.main",
                    p: 0,
                    px: 2,
                  }}
                >
                  Answer this question
                </Button>
              )}
            </Box>
          ))}

          {questions.length > 1 && !showAll && (
            <Button
              variant="outlined"
              sx={{
                mt: 1,
                py: 1.2,
                px: 3,
                borderRadius: 10,
                textTransform: "none",
                color: "black",
                border: "1px solid black",
                fontWeight: 600,
              }}
              onClick={() => setShowAll(true)}
            >
              Show more Questions & Answers
            </Button>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductQnA;
