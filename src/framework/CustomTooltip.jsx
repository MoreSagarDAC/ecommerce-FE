import * as React from "react";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} describeChild classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 11,
  },
}));

const BootstrapTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} describeChild arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },

  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 12,
  },
}));

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} describeChild classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const tooltipVariants = {
  light: LightTooltip,
  bootstrap: BootstrapTooltip,
  html: HtmlTooltip,
};

const CustomTooltip = ({ variant = "light", children, ...props }) => {
  const TooltipComponent = tooltipVariants[variant] || LightTooltip;

  return <TooltipComponent {...props}>{children}</TooltipComponent>;
};

export default CustomTooltip;
