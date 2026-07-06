import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../redux/SearchSlice";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { ThemeContext } from "../components/Theme";

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
import PeopleIcon from "@mui/icons-material/People";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { addToken, addUser } from "../redux/LoginSlice";

const drawerWidth = 240;

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff",
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff",
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { theme , setTheme } = useContext(ThemeContext)

  const user = useSelector((state: any) => state.login.user);
  const search = useSelector((state: any) => state.search.search);
  const name = useSelector((state: any) => state.login.user.name);
  console.log(search);

  let menuItems = [
    {
      text: "Courses",
      icon: <SchoolIcon sx={{ color: "white" }} />,
      path: "/courses",
    },
  ];

  const adminItems = [
    {
      text: "Users",
      icon: <PeopleIcon sx={{ color: "white" }} />,
      path: "/user",
    },
    {
      text: "Students",
      icon: <PeopleIcon sx={{ color: "white" }} />,
      path: "/students",
    },
    {
      text: "Instructors",
      icon: <CoPresentIcon sx={{ color: "white" }} />,
      path: "/instructors",
    },
  ];
  const studentItems = [
    {
      text: "Enrolled Courses",
      icon: <SchoolIcon sx={{ color: "white" }} />,
      path: "/enroll",
    },
  ];
  const profileItems = [
    {
      text: "Profile",
      icon: <AccountCircleIcon sx={{ color: "white" }} />,
      path: "/profile",
    },
    {
      text: "Edit Profile",
      icon: <EditIcon sx={{ color: "white" }} />,
      path: "/edit",
    },
    {
      text: "Reset Password",
      icon: <LockIcon sx={{ color: "white" }} />,
      path: "/resetpassword",
    },
    { text: "Logout", icon: <LogoutIcon sx={{ color: "white" }} />, path: "" },
  ];

  if (user.role === "admin") {
    menuItems = [...menuItems, ...adminItems];
  } else if (user.role === "student") {
    menuItems = [...menuItems, ...studentItems];
  }

  function handleLogout() {
    localStorage.clear();
    dispatch(addToken(""));
    dispatch(addUser(null));
    navigate("/", { replace: true });
  }
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp! <= Math.floor(Date.now() / 1000)) {
        handleLogout();
      }
    }
  }, []);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          bgcolor: theme==='light'? "#F1F0E8" : '#C5B3D3',
          width: "100%",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor:theme==='light'? "#819A91" : "#233D4D",
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
                bgcolor: theme==='light'? '#a5b7b0':"rgba(255,255,255,0.15)",
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
            <Box>
              <FormGroup>
                <FormControlLabel
                  control={<MaterialUISwitch sx={{ m: 1 }} 
                  checked = {theme === 'dark'}
                  onChange = {()=>{
                    setTheme(theme === 'dark' ?'light' :'dark')
                  }}
                   />}
                  label="Theme"
                />
              </FormGroup>
            </Box>

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
              bgcolor:theme==='light'?'#485e56':"black",
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
            onClick={handleLogout}
          >
            Logout
            <LogoutIcon />
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
