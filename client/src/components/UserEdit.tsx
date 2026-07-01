import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApi from "./Api";
import { addUser, addToken } from "../redux/LoginSlice";
import { getMessage } from "../redux/MessageSlice";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import PersonIcon from "@mui/icons-material/Person";

export default function Edit() {
  const user = useSelector((state: any) => state.login.user);
  const dispatch = useDispatch();
  const { Api } = useApi();
  const message = useSelector((state: any) => state.message.message);
  const [useredit, setUserEdit] = useState({
    name: user.name,
    email: user.email,
    address: user.address,
    phoneNumber: user.phoneNumber,
  });
  const [error, setError] = useState({
    errName: false,
    errEmail: false,
    errAddress: false,
    errPhone: false,
  });

  const [errmessage, setErrmessage] = useState({
    errName: "",
    errEmail: "",
    errAddress: "",
    errPhone: "",
  });

  async function handleEdit() {
    if (!useredit.name) {
      setError((prev) => ({ ...prev, errName: true }));
      setErrmessage((prev) => ({
        ...prev,
        errName: "Name is required",
      }));
    } else {
      setError((prev) => ({ ...prev, errName: false }));
      setErrmessage((prev) => ({
        ...prev,
        errName: "",
      }));
    }

    if (!useredit.email) {
      setError((prev) => ({ ...prev, errEmail: true }));
      setErrmessage((prev) => ({
        ...prev,
        errEmail: "Email is required",
      }));
    } else {
      setError((prev) => ({ ...prev, errEmail: false }));
      setErrmessage((prev) => ({
        ...prev,
        errEmail: "",
      }));
    }

    if (!useredit.address) {
      setError((prev) => ({ ...prev, errAddress: true }));
      setErrmessage((prev) => ({
        ...prev,
        errAddress: "Address is required",
      }));
    } else {
      setError((prev) => ({ ...prev, errAddress: false }));
      setErrmessage((prev) => ({
        ...prev,
        errAddress: "",
      }));
    }

    if (!useredit.phoneNumber) {
      setError((prev) => ({ ...prev, errPhone: true }));
      setErrmessage((prev) => ({
        ...prev,
        errPhone: "Phone Number is required",
      }));
    } else if (useredit.phoneNumber.length !== 10) {
      setError((prev) => ({ ...prev, errPhone: true }));
      setErrmessage((prev) => ({
        ...prev,
        errPhone: "Phone Number must be 10 digits",
      }));
    } else {
      setError((prev) => ({ ...prev, errPhone: false }));
      setErrmessage((prev) => ({
        ...prev,
        errPhone: "",
      }));
    }

    if (
      !useredit.name ||
      !useredit.email ||
      !useredit.address ||
      !useredit.phoneNumber ||
      useredit.phoneNumber.length !== 10
    ) {
      console.log("Enter the values");
      return;
    } else {
      const response = await Api({
        method: "put",
        endpoint: `register/edit/${user.id}`,
        data: useredit,
      });

      console.log(response.data.user);
      dispatch(addToken(response.data.accesstoken));
      dispatch(addUser(response.data.user));
      dispatch(getMessage(response.data.message));

      localStorage.setItem("token", response.data.accesstoken);
    }
  }
  return (
    <>
      <Box sx={{ p: 10, display: "flex", justifyContent: "center" }}>
        <Paper
          elevation={3}
          sx={{ p: 2, bgcolor: "#EAECF0", borderRadius: "30px", width: 500 }}
        >
          <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="h5" sx={{ fontWeight: "100px" }}>
              Edit Profile
            </Typography>
          </Box>
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
                <TextField
                  fullWidth
                  variant="standard"
                  value={useredit.name}
                  error={error.errName}
                  helperText={errmessage.errName}
                  onChange={(e) => {
                    setUserEdit((prev) => ({ ...prev, name: e.target.value }));
                    setError((prev) => ({ ...prev, errName: false }));
                    setErrmessage((prev) => ({ ...prev, errName: "" }));
                  }}
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                <MailIcon sx={{ fontSize: 30, color: "#233D4D" }} />
                <TextField
                  fullWidth
                  variant="standard"
                  value={useredit.email}
                  error={error.errEmail}
                  helperText={errmessage.errEmail}
                  onChange={(e) => {
                    setUserEdit((prev) => ({ ...prev, email: e.target.value }));
                    setError((prev) => ({ ...prev, errEmail: false }));
                    setErrmessage((prev) => ({ ...prev, errEmail: "" }));
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                <HomeIcon sx={{ fontSize: 30, color: "#233D4D" }} />
                <TextField
                  fullWidth
                  variant="standard"
                  value={useredit.address}
                  error={error.errAddress}
                  helperText={errmessage.errAddress}
                  onChange={(e) => {
                    setUserEdit((prev) => ({
                      ...prev,
                      address: e.target.value,
                    }));
                    setError((prev) => ({ ...prev, errAddress: false }));
                    setErrmessage((prev) => ({ ...prev, errAddress: "" }));
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                <PhoneIcon sx={{ fontSize: 30, color: "#233D4D" }} />
                <TextField
                  fullWidth
                  variant="standard"
                  value={useredit.phoneNumber}
                  error={error.errPhone}
                  helperText={errmessage.errPhone}
                  onChange={(e) => {
                    setUserEdit((prev) => ({
                      ...prev,
                      phoneNumber: e.target.value,
                    }));
                    setError((prev) => ({ ...prev, errPhone: false }));
                    setErrmessage((prev) => ({ ...prev, errPhone: "" }));
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  p: 3,
                }}
              >
                <Button
                  variant="outlined"
                  sx={{ mr: 2, bgcolor: "#233D4D", color: "white" }}
                  onClick={handleEdit}
                >
                  Edit Profile
                </Button>
              </Box>
            </Box>
          </Stack>
        </Paper>
      </Box>
      <Snackbar
        open={Boolean(message)}
        autoHideDuration={3000}
        message={message}
        onClose={() => dispatch(getMessage(""))}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      />
    </>
  );
}
