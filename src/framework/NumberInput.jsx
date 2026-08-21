import React from "react";
import TextField from "@mui/material/TextField";
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

const StyledTextField = styled(TextField)(({ theme, color = "black" }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "5px",
    fontSize: "13px",
    fontWeight: 700,
    backgroundColor: "#e8f4f7",
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
      backgroundColor: "#e8f4f7",
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

const NumberInput = React.forwardRef(
  (
    {
      id,
      label,
      value,
      onChange,
      onBlur,
      error,
      helperText,
      placeholder,
      disabled = false,
      fullWidth = true,
      sx,
      color = "black",
      required = false,
      name,
      min,
      max,
      ...otherProps
    },
    ref,
  ) => {
    const handleChange = (e) => {
      const inputValue = e.target.value;
      // Only allow numbers (including decimals)
      if (inputValue === "" || /^\d*\.?\d*$/.test(inputValue)) {
        // Check min/max constraints
        const numValue = parseFloat(inputValue);
        if (
          inputValue === "" ||
          (!isNaN(numValue) &&
            (!min || numValue >= min) &&
            (!max || numValue <= max))
        ) {
          onChange(e);
        }
      }
    };

    const handleKeyDown = (e) => {
      // Prevent non-numeric characters
      if (
        !/[0-9]/.test(e.key) &&
        ![
          "Backspace",
          "Delete",
          "Tab",
          "Escape",
          "Enter",
          ".",
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
        ].includes(e.key) &&
        !(e.ctrlKey || e.metaKey) // Allow Ctrl/Cmd + A, C, V, etc.
      ) {
        e.preventDefault();
      }
    };

    return (
      <ThemeProvider theme={theme}>
        <StyledTextField
          id={id}
          ref={ref}
          name={name}
          label={label}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          type="text"
          inputMode="numeric"
          disabled={disabled}
          fullWidth={fullWidth}
          required={required}
          color={color}
          variant="outlined"
          sx={{
            ...sx,
          }}
          {...otherProps}
        />
      </ThemeProvider>
    );
  },
);

NumberInput.displayName = "NumberInput";

export default NumberInput;
