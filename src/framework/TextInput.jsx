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

const TextInput = React.forwardRef(
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
      type = "text",
      disabled = false,
      fullWidth = true,
      sx,
      color = "black",
      required = false,
      name,
      ...otherProps
    },
    ref
  ) => {
    return (
      <ThemeProvider theme={theme}>
        <StyledTextField
          id={id}
          ref={ref}
          name={name}
          label={label}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={error}
          helperText={helperText}
          placeholder={placeholder}
          type={type}
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
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
