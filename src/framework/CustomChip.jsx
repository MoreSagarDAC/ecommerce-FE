import MuiChip from "@mui/material/Chip";
import React from "react";

const CustomChip = (props) => {
  const { label } = props;
  return (
    <MuiChip
      label={label}
      {...props}
      sx={{
        background: "#171818",
        color: "#ffffff",
        "& .MuiChip-deleteIcon": {
          color: "#ffffff",
          "&:hover": {
            color: "#ffffff",
          },
        },
      }}
    />
  );
};

export default CustomChip;
