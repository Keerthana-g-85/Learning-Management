import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApi from "./Api";
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
import axios from "axios";

export default function Resetpassword() {
  const { Api } = useApi();
  const [data, setData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.message.message);
  async function handleReset() {
    try {
      const response = await Api({
        method: "put",
        endpoint: "/register/resetpassword",
        data: data,
      });
      console.log(response);
      dispatch(getMessage(response.data.message));
      setData({ email: "", oldPassword: "", newPassword: "" });
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        dispatch(getMessage(error.response?.data.message));
        // console.log(error.response?.data.message)
      }
    }
  }
  console.log(message);

  return (
    <>
      <Box
        sx={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{ p: 4, bgcolor: "#EAECF0", borderRadius: "30px", width: 500 }}
        >
          <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
            <Typography variant="h5" sx={{ fontWeight:'100px'}}> Reset Password</Typography>
          </Box>
          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Box>

            <Box sx={{ alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Email*"
                  value={data.email}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Old Password*"
                  value={data.oldPassword}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      oldPassword: e.target.value,
                    }))
                  }
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, p: 2 }}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="New Password*"
                  value={data.newPassword}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }))
                  }
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
                  onClick={handleReset}
                >
                  Reset Password
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
