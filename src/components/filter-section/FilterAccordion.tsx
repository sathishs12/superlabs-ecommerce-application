import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Props {
  title: string;
  options: string[];
}

const FilterAccordion: React.FC<Props> = ({ title, options }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography fontWeight={600}>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormGroup>
          {options.map((opt, idx) => (
            <FormControlLabel key={idx} control={<Checkbox sx={{ borderRadius: "50%"}}/>} label={opt} />
          ))}
        </FormGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default FilterAccordion;
