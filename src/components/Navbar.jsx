import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import CategoryIcon from "@mui/icons-material/Category";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../services/user-services";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../redux/store";
import { logout } from "../redux/authSlice";
import CustomTooltip from "../framework/CustomTooltip.jsx";
import shopAppLogo from "../assets/shop-app-logo-png_seeklogo-502749.png";
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function MiniDrawer({ open, onDrawerOpen, onDrawerClose }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const profileMenuOpen = Boolean(anchorEl);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const getCartDetails = () => {
    nevigate("/cart");
  };

  const mainMenuItems = [
    {
      label: "Home",
      path: "/home",
      icon: <HomeIcon />,
    },
    {
      label: "Products",
      path: "/products",
      icon: <ShoppingBagIcon />,
    },
    {
      label: "Categories",
      path: "/categories",
      icon: <CategoryIcon />,
    },
    {
      label: "Wishlist",
      path: "/wishlist",
      icon: <FavoriteBorderIcon />,
    },
    {
      label: "Cart",
      path: "/cart",
      icon: <ShoppingCartIcon />,
    },
    {
      label: "My Orders",
      path: "/orders",
      icon: <ReceiptLongIcon />,
    },
    {
      label: "Track Order",
      path: "/track-order",
      icon: <LocalShippingIcon />,
    },
    {
      label: "Offers",
      path: "/offers",
      icon: <LocalOfferIcon />,
    },
  ];

  const accountMenuItems = [
    {
      label: "My Profile",
      path: "/profile",
      icon: <PersonIcon />,
    },
    {
      label: "My Addresses",
      path: "/addresses",
      icon: <LocationOnIcon />,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: <SettingsIcon />,
    },
  ];

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutExistinguser = async () => {
    try {
      await logoutUser({
        userId: user?.user?._id,
      });
      sessionStorage.removeItem("token");
      await persistor.purge();
      dispatch(logout());
      nevigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box className="app-layout">
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          top: 0,
          left: 0,
          backgroundColor: "#366466",
        }}
      >
        <Toolbar>
          {/* Left side */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div">
            ShopEase
          </Typography>

          {/* Push icons to right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Notification */}
          <CustomTooltip
            title="Notifications"
            variant="bootstrap"
            placement="bottom"
            disableHoverListener={open}
          >
            <IconButton color="inherit" size="large">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </CustomTooltip>

          <CustomTooltip
            title="Cart"
            variant="bootstrap"
            placement="bottom"
            disableHoverListener={open}
          >
            <IconButton color="inherit" size="large" onClick={getCartDetails}>
              <ShoppingCartIcon />
            </IconButton>
          </CustomTooltip>

          {/* User */}
          <CustomTooltip
            title="User"
            variant="bootstrap"
            placement="bottom"
            disableHoverListener={open}
          >
            <IconButton
              color="inherit"
              size="large"
              onClick={handleProfileMenuOpen}
            >
              <AccountCircle />
            </IconButton>
          </CustomTooltip>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={profileMenuOpen}
        onClose={handleProfileMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>

        {/* <MenuItem onClick={logoutExistinguser}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem> */}
      </Menu>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: open ? "space-between" : "center",
            minHeight: "64px",
            px: 2,
          }}
        >
          {open && (
            <Box
              component="img"
              src={shopAppLogo}
              alt="ShopEase"
              sx={{
                width: 240,
                height: 45,
                objectFit: "inherit",
                display: "block",
              }}
            />
          )}

          <IconButton onClick={onDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {mainMenuItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
              <CustomTooltip
                title={item.label}
                variant="bootstrap"
                placement="right"
                disableHoverListener={open}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      mr: open ? 3 : "auto",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.label}
                    sx={{
                      opacity: open ? 1 : 0,
                    }}
                  />
                </ListItemButton>
              </CustomTooltip>
            </ListItem>
          ))}
        </List>
        <Divider />

        <List>
          {accountMenuItems.map((item) => (
            <ListItem key={item.path} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                component={Link}
                to={item.path}
                sx={{
                  minHeight: 48,
                  px: 2.5,
                  justifyContent: open ? "initial" : "center",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    justifyContent: "center",
                    mr: open ? 3 : "auto",
                  }}
                >
                  {item.icon}
                </ListItemIcon>

                <ListItemText
                  primary={item.label}
                  sx={{
                    opacity: open ? 1 : 0,
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                px: 2.5,
                justifyContent: open ? "initial" : "center",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  justifyContent: "center",
                  mr: open ? 3 : "auto",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>

              <ListItemText
                primary="Logout"
                onClick={logoutExistinguser}
                sx={{
                  opacity: open ? 1 : 0,
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
