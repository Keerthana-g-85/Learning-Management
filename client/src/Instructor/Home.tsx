import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../redux/SearchSlice";

import logo from "../assets/logo.png";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import LogoutIcon from "@mui/icons-material/Logout";
import SchoolIcon from "@mui/icons-material/School";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";

const drawerWidth = 240;

export default function Home() {
  const [open, setOpen] = useState<Boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const search = useSelector((state: any) => state.search.search);
  const name = useSelector((state: any) => state.login.user.name);
  console.log(search);

  const menuItems = [
    {
      text: "Courses",
      icon: <SchoolIcon sx={{ color: "white" }} />,
      path: "/courses",
    },
  ];

  const profileItems = [
    {
      text: "Profile",
      icon: <AccountCircleIcon sx={{ color: "white" }} />,
      path: "/profile",
    },
    { text: "Logout", icon: <LogoutIcon sx={{ color: "white" }} />, path: "" },
  ];

  function handleDelete() {
    localStorage.clear();
    navigate("/");
  }
  return (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: "#FFFAF3",
          width: "100%",
          height: "100vh",
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: "#233D4D",
          }}
        >
          <Toolbar>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mr: 15,
              }}
            >
              <Box
                component="img"
                src={logo}
                alt="LMS Logo"
                sx={{ width: 50, height: 50, borderRadius: "25px" }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: "#CBD5E1",
                  fontWeight: 700,
                  lineHeight: 1.2,
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "0.15em",
                  fontSize: "22px",
                }}
              >
                LMS
              </Typography>
            </Box>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search..."
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: "#CBD5E1" }} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                bgcolor: "rgba(255,255,255,0.15)",
                borderRadius: "30px",
                width: 600,
                border: "none",
                "& .MuiOutlinedInput-root": {
                  color: "white",
                  "& fieldset": { border: "none" }, // Remove default border
                },
              }}
              value={search}
              onChange={(e) => {
                dispatch(addSearch(e.target.value));
              }}
            ></TextField>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography
                variant="body2"
                sx={{ color: "#CBD5E1", fontWeight: 600, fontSize: "16px" }}
              >
                Welcome {name}
              </Typography>
              <Avatar
                sx={{ color: "white" }}
                src="/broken-image.jpg"
                onClick={() => {
                  navigate("/profile");
                }}
              />
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              bgcolor: "black",
              color: "white",
            },
          }}
        >
          <Toolbar />

          <Box sx={{ overflow: "auto" }}>
            <List>
              {menuItems.map((item) => (
                <ListItem key={item.text}>
                  <ListItemButton onClick={() => navigate(item.path)}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {profileItems.map((item) => (
                <ListItem key={item.text}>
                  <ListItemButton
                    onClick={() =>
                      item.text === "Logout"
                        ? setOpen(true)
                        : navigate(item.path)
                    }
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>

      <Dialog open={Boolean(open)} onClose={() => setOpen(false)}>
        <DialogTitle>Logout </DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to Logout</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            sx={{ bgcolor: "#626769", color: "white" }}
          >
            {" "}
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#ef5252",
              display: "flex",
              border: "1px solid #ef5252",
            }}
            onClick={handleDelete}
          >
            {" "}
            Logout
            <LogoutIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
