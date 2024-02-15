import { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Stack,
  Typography,
  Switch,
  Menu,
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CircleNotificationsOutlinedIcon from "@mui/icons-material/CircleNotificationsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuIcon from "@mui/icons-material/Menu";

interface HeaderProps {
  drawerVisible: boolean;
  setDrawerVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ drawerVisible, setDrawerVisible }: HeaderProps) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showNotify, setNotify] = useState(false);
  const [showProfile, setProfile] = useState(false);
  const [isToggleSwitch, setToggleSwitch] = useState(false);

  const showNotifyMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
    setNotify(true);
  };

  const showProfileMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
    setProfile(true);
  };

  const closeNotifyMenu = () => {
    setAnchorEl(null);
    setNotify(false);
  };

  const closeProfileMenu = () => {
    setAnchorEl(null);
    setProfile(false);
  };


  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#ffffff",
        width: { tablet: "calc(100% - 250px)" },
        ml: { tablet: "250px" },
      }}
    >
      <Toolbar sx={{ minHeight: "80px" }}>
        <IconButton
          size="large"
          edge="start"
          aria-label="menu"
          sx={{ color: "#3E4248", "&:hover": { color: "#3E4248" }, mr: 2 }}
          className="hamburger_menu"
          onClick={() => setDrawerVisible(!drawerVisible)}
        >
          <MenuIcon />
        </IconButton>
        <TextField
          id="search"
          placeholder="Search"
          variant="outlined"
          size="small"
          fullWidth
          inputProps={{
            sx: { fontSize: "16px", color: "#3E4248", fontWeight: "500", padding: "12px 6px" },
            className: "serach",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{marginRight: "0"}}>
                <IconButton aria-label="search" edge="start" size="small">
                  <SearchIcon sx={{ color: "#989EA5" }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: "250px",
            marginRight: "auto",
            "& ::placeholder": { color: "#999CA0" },
          }}
          className="search_field"
        />
        {/* {location.pathname === "/manager-assign-goals" ? (
          <Box sx={{ padding: "0 16px" }}>
            <Stack flexDirection="row" alignItems="center" gap="16px">
              <Typography
                sx={{
                  fontWeight: isToggleSwitch ? "400" : "600",
                  color: isToggleSwitch ? "#C8CDD4" : "#F58A43",
                  fontSize: "14px",
                }}
              >
                My Team
              </Typography>
              <Switch
                className="manager_switch"
                onClick={() => setToggleSwitch(!isToggleSwitch)}
              />
              <Typography
                sx={{
                  fontWeight: isToggleSwitch ? "600" : "400",
                  color: isToggleSwitch ? "#F58A43" : "#C8CDD4",
                  fontSize: "14px",
                }}
              >
                Me
              </Typography>
            </Stack>
          </Box>
        ) : (
          ""
        )} */}

        <Box sx={{ padding: "0 16px" }}>
          <IconButton
            size="large"
            aria-label="notification"
            aria-controls="notification-appbar"
            aria-haspopup="true"
            onClick={showNotifyMenu}
            sx={{
              color: "#3E4248",
              "&:hover": { color: "#3E4248" },
              border: "2px solid #EAECEF",
            }}
          >
            <CircleNotificationsOutlinedIcon />
          </IconButton>
          <Menu
            id="notification-appbar"
            anchorEl={anchorEl}
            open={showNotify}
            onClose={closeNotifyMenu}
          >
            <MenuItem onClick={closeNotifyMenu}>Notice 1</MenuItem>
            <MenuItem onClick={closeNotifyMenu}>Notice 2</MenuItem>
          </Menu>
        </Box>
        <Box>
          <IconButton
            size="large"
            aria-label="profile"
            aria-controls="profile-appbar"
            aria-haspopup="true"
            onClick={showProfileMenu}
            sx={{
              color: "#3E4248",
              "&:hover": { color: "#3E4248" },
              border: "2px solid #EAECEF",
            }}
          >
            <AccountCircleOutlinedIcon />
          </IconButton>
          <Menu
            id="profile-appbar"
            anchorEl={anchorEl}
            open={showProfile}
            onClose={closeProfileMenu}
          >
            <MenuItem onClick={closeProfileMenu}>Profile</MenuItem>
            <MenuItem onClick={closeProfileMenu}>Sign Out</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
