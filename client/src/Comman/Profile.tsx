import { Typography, Box, Paper, Stack } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useSelector } from "react-redux";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";
export default function Profile() {
  const user = useSelector((state: any) => state.login.user);

  console.log(user);
  return (
    <>
      <Box sx={{ p: 10, display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          sx={{ p: 2, bgcolor: "#EAECF0", borderRadius: "30px", width: 500 }}
        >
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccountCircleIcon sx={{ fontSize: 250, color: "#233D4D" }} />
            </Box>

            <Box sx={{ alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                <PersonIcon sx={{ fontSize: 30, color: "#233D4D" }} />
                <Typography variant="h5">{user.name}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                <MailIcon sx={{ fontSize: 30, color: "#233D4D" }} />
                <Typography variant="h5">{user.email}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                <HomeIcon sx={{ fontSize: 30, color: "#233D4D" }} />
                <Typography variant="h5">{user.address}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                <PhoneIcon sx={{ fontSize: 30, color: "#233D4D" }} />
                <Typography variant="h5">{user.phoneNumber}</Typography>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Box>
    </>
  );
}
