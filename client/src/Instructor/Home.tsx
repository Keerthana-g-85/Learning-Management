import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SchoolIcon from "@mui/icons-material/School";
import Avatar from '@mui/material/Avatar';

import { Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

export default function Home() {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Courses", icon: <SchoolIcon />, path: "/courses" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,
            bgcolor: '#0ea5e9'
          }}>
          <Toolbar>
            <Typography variant="h6" noWrap>
              Learning Management System
            </Typography>
            <Avatar sx={{color:'white'}}src="/broken-image.jpg" />
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{ width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },}}>
        <Toolbar />

        <Box sx={{ overflow: "auto"}}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} >
                <ListItemButton
                  onClick={() => navigate(item.path)}>
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>

      <Box component="main"sx={{
          flexGrow: 1,
          p: 3, }}>
        <Toolbar />

        {/* Page content changes here */}
        <Outlet /> 
      </Box>
    </Box>
  );
}