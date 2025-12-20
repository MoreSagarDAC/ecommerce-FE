import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { createTheme, ThemeProvider, styled } from "@mui/material";

const theme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    black: {
      main: "#000000",
      contrastText: "#000000",
      color: "white",
      boxShadow: "-4px 4px 0px 0px rgb(0,0,0, 0.8)",
    },
    violet: {
      main: "#434DF9",
      contrastText: "#000000",
      color: "white",
      boxShadow: "-4px 4px 0px 0px rgb(67,77,249, 0.8)",
    },
  },
});

const StyledFormControl = styled(FormControl)(({ theme, color = "black" }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    fontSize: "13px",
    fontWeight: 700,
    backgroundColor: "#e6fcee",
    "& fieldset": {
      border: `2px solid ${theme.palette[color].main}`,
    },
    "&:hover fieldset": {
      border: `2px solid ${theme.palette[color].main}`,
      boxShadow: `${theme.palette[color].boxShadow}`,
    },
    "&.Mui-focused fieldset": {
      border: `2px solid ${theme.palette[color].main}`,
      boxShadow: `${theme.palette[color].boxShadow}`,
    },
    "&.Mui-disabled": {
      backgroundColor: "#e6fcee",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "13px",
    fontWeight: 700,
    "&.Mui-focused": {
      color: theme.palette[color].main,
    },
  },
}));

const SelectInput = React.forwardRef(
  (
    {
      id,
      label,
      value,
      onChange,
      onBlur,
      error,
      helperText,
      disabled = false,
      fullWidth = true,
      sx,
      color = "black",
      required = false,
      name,
      options = [],
      placeholder = "Select an option",
      ...otherProps
    },
    ref
  ) => {
    return (
      <ThemeProvider theme={theme}>
        <StyledFormControl
          fullWidth={fullWidth}
          error={error}
          disabled={disabled}
          required={required}
          sx={sx}
          color={color}
        >
          <InputLabel id={`${id || name}-label`}>{label}</InputLabel>
          <Select
            id={id}
            ref={ref}
            name={name}
            labelId={`${id || name}-label`}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            label={label}
            displayEmpty
            {...otherProps}
          >
            {placeholder && (
              <MenuItem value="" disabled>
                {placeholder}
              </MenuItem>
            )}
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {helperText && <FormHelperText>{helperText}</FormHelperText>}
        </StyledFormControl>
      </ThemeProvider>
    );
  }
);

SelectInput.displayName = "SelectInput";

export default SelectInput;
