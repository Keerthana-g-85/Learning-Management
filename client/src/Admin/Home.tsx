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
import PeopleIcon from "@mui/icons-material/People";
import CoPresentIcon from '@mui/icons-material/CoPresent';
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar';
import { Outlet, useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const drawerWidth = 240;

export default function Home() {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Courses", icon: <SchoolIcon  sx={{color:'white'}}/>, path: "/courses" },
    { text: "Users" , icon:< PeopleIcon sx={{color:'white'}}/> ,path:"/user"},
    { text: "Students", icon: <PeopleIcon sx={{color:'white'}}/>, path: "/students" },
    { text: "Instructors", icon:<CoPresentIcon sx={{color:'white'}}/> , path:"/instructors"},
  ];
  const profileItems =[
    { text: "Profile", icon: <AccountCircleIcon sx={{color:'white'}} />, path: "/profile" },
  ]

  return (
    <Box sx={{ display: "flex" , bgcolor:'#FFFAF3' , width:'100%' , height:'100vh' , }}>
      <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1,
           bgcolor:'#233D4D',
          }}>
          <Toolbar>
            <Typography variant="h6" noWrap >
              Learning Management System
            </Typography>
            <TextField
      variant="outlined"
      size="small"
      placeholder="Search..."
      sx={{
        bgcolor: 'rgba(255,255,255,0.15)',
        borderRadius: 1,
        width:600,
        border:'none',
        '& .MuiOutlinedInput-root': {
          color: 'white',
          '& fieldset': { border: 'none' }, // Remove default border
        },
      }}></TextField>
            <Box sx={{ flexGrow: 1 }} />
            
            <Box sx={{display:'flex' , alignItems:'right' }}>
              <Avatar sx={{color:'white',}}src="/broken-image.jpg" onClick={()=>{navigate('/profile')}} />
            </Box>
        
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          sx={{ width: drawerWidth,
            
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
               bgcolor: 'black',
               color:'white'
            },}}>
        <Toolbar />

        <Box sx={{ overflow: "auto" ,}}>
          <List>
            {menuItems.map((item) => (
              <ListItem key={item.text} >
                <ListItemButton
                  onClick={() => navigate(item.path)}>
                  <ListItemIcon >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText  primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {profileItems.map((item) => (
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