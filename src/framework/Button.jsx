import React, { useCallback } from "react";
import ButtonMUI from "@mui/material/Button";
import { createTheme, ThemeProvider, styled } from "@mui/material";
import Badge from "@mui/material/Badge";
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
    warn: {
      main: "#FDCE57",
      contrastText: "#000000",
      color: "black",
      boxShadow: "-4px 4px 0px 0px rgb(253,206,87, 0.8)",
    },
    error: {
      main: "#F24326",
      contrastText: "#000000",
      color: "white",
      boxShadow: "-4px 4px 0px 0px rgb(242,67,38, 0.8)",
    },
    success: {
      main: "#149E52",
      contrastText: "#000000",
      color: "white",
      boxShadow: "-4px 4px 0px 0px rgb(20, 158, 82, 0.8)",
    },
    info: {
      main: "#434DF9",
      contrastText: "#000000",
      color: "white",
      boxShadow: "-4px 4px 0px 0px rgb(67,77,249, 0.8)",
    },
    purpleLight: {
      main: "#DED8FE",
      contrastText: "#000000",
      color: "white",
      boxShadow: "-4px 4px 0px 0px rgb(222,216,254, 0.8)",
    },
    lightGrey: {
      main: "#B0B0B0",
      contrastText: "#000000",
      color: "white",
      boxShadow: "-4px 4px 0px 0px rgb(224,224,224, 0.8)",
    },
    red: {
      main: "#df1414",
      contrastText: "#000000",
      color: "white",
      boxShadow: "-4px 4px 0px 0px rgb(224,224,224, 0.8)",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "32px !important",
          overflow: "hidden",
          justifyContent: "flex-start",
          padding: "0 10px",
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          left: 20,
          height: 16,
          padding: "0 5px",
          color: "#FFFFFF",
          backgroundColor: "#FF274E",
          borderRadius: 4,
        },
      },
    },
  },
});
const StyledButton = styled(ButtonMUI)(({ theme, color }) => ({
  border: `2px solid ${theme.palette[color].main}`,
  color: `${theme.palette[color].color}`,
  boxShadow: "none",
  ":hover": {
    color: `${theme.palette[color].contrastText}`,
    backgroundColor: "white",
    boxShadow: `${theme.palette[color].boxShadow}`,
  },
  ":focus": {
    color: "black",
    backgroundColor: "white",
    border: `2px solid ${theme.palette[color].main}`,
    boxShadow: `${theme.palette[color].boxShadow}`,
  },
}));
const Button = React.forwardRef(
  (
    {
      id,
      startIcon,
      endIcon,
      sx,
      label='Test',
      style,
      type,
      disableRipple = true,
      variant = "contained",
      color = "black",
      onClick = () => {},
      badgeContent,
      invisible = true,
      markers,
      fullWidth = true,
      disabled,
      isAccessible = true,
      onFocus = () => {},
    },
    ref
  ) => {
    const clickHandler = useCallback(
      (event) => {
        if (!isAccessible || disabled) return;
        onClick(event);
        event.target.blur();
      },
      [disabled, isAccessible, onClick]
    );
    return (
      <ThemeProvider theme={theme}>
        <Badge
          badgeContent={badgeContent}
          invisible={invisible}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <StyledButton
            id={id}
            ref={ref}
            startIcon={startIcon}
            endIcon={endIcon}
            sx={{
              borderRadius: "5px",
              fontSize: "16px",
              fontWeight: 700,
              whiteSpace: "nowrap",
              height: "32px",
              maxWidth: "100%",
              color: disabled ? "rgba(255, 255, 255, 0.36)" : "#fff", 
              display: isAccessible ? "inline-flex" : "none",
              ...sx,
            }}
            size="small"
            style={style}
            type={type}
            onClick={clickHandler}
            onFocus={onFocus}
            variant={variant}
            color={color}
            disableRipple={disableRipple}
            data-markers={markers}
            fullWidth={fullWidth} 
          >
            {label}
          </StyledButton>
          {disabled && ( 
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "rgba(255, 255, 255, 0.25)",
                borderRadius: "4px",
                cursor: "not-allowed",
              }}
              onClick={(e) => e.stopPropagation()}
            />
          )}
        </Badge>
      </ThemeProvider>
    );
  }
);
export default Button;
