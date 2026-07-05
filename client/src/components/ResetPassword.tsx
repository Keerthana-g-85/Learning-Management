import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useApi from "./Api";
import { getMessage } from "../redux/MessageSlice";
import image3 from "../assets/image3.png";
import {
  Box,
  Paper,
  Stack,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

interface ResetPassword {
  email: string;
  oldPassword: string;
  newPassword: string;
}

export default function Resetpassword() {
  const { Api } = useApi();
  const [data, setData] = useState<ResetPassword>({
    email: "",
    oldPassword: "",
    newPassword: "",
  });
  const [error, setError] = useState({
    errEmail: false,
    errOldPassword: false,
    errNewPassword: false,
  });

  const [errmessage, setErrmessage] = useState({
    errEmail: "",
    errOldPassword: "",
    errNewPassword: "",
  });
  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.message.message);
  const user = useSelector((state: any) => state.login.user);

  function handleReset() {
    if (!data.email) {
      setError((prev) => ({ ...prev, errEmail: true }));
      setErrmessage((prev) => ({
        ...prev,
        errEmail: "Email is required",
      }));
    } else {
      setError((prev) => ({ ...prev, errEmail: false }));
      setErrmessage((prev) => ({ ...prev, errEmail: "" }));
    }

    if (!data.oldPassword) {
      setError((prev) => ({ ...prev, errOldPassword: true }));
      setErrmessage((prev) => ({
        ...prev,
        errOldPassword: "Old Password is required",
      }));
    } else {
      setError((prev) => ({ ...prev, errOldPassword: false }));
      setErrmessage((prev) => ({ ...prev, errOldPassword: "" }));
    }

    if (!data.newPassword) {
      setError((prev) => ({ ...prev, errNewPassword: true }));
      setErrmessage((prev) => ({
        ...prev,
        errNewPassword: "New Password is required",
      }));
    } else if (data.newPassword.length < 8) {
      setError((prev) => ({ ...prev, errNewPassword: true }));
      setErrmessage((prev) => ({
        ...prev,
        errNewPassword: "Password must be at least 8 characters",
      }));
    } else {
      setError((prev) => ({ ...prev, errNewPassword: false }));
      setErrmessage((prev) => ({ ...prev, errNewPassword: "" }));
    }

    if (
      !data.email ||
      !data.oldPassword ||
      !data.newPassword ||
      data.newPassword.length < 8
    ) {
      console.log("Enter the values");
      return;
    } else {
      resetMutate.mutate(data);
    }
  }

  console.log(message);

  const resetPassword = async (data: ResetPassword) => {
    const response = await Api({
      method: "put",
      endpoint: "/register/resetpassword",
      data: data,
    });
    return response.data;
  };

  const resetMutate = useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      dispatch(getMessage(data.message));
      setData({
        email: "",
        oldPassword: "",
        newPassword: "",
      });
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        dispatch(getMessage(error.response?.data.message));
      }
    },
  });

  return (
    <>
      <Box
        sx={
          !user
            ? {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${image3})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width: "100%",
                height: "100vh",
              }
            : {
                minHeight: "90vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
              }
        }
      >
        <Paper
          elevation={4}
          sx={
            !user
              ? {
                  p: 3,
                  mt: 5,
                  borderRadius: 3,
                  width: 500,
                  backgroundColor: "rgba(252, 249, 249, 0.51)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(217, 209, 209, 0.3)",
                }
              : { p: 4, bgcolor: "#EAECF0", borderRadius: "30px", width: 500 }
          }
        >
          {!user ? (
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Login
            </Typography>
          ) : (
            <Box sx={{ p: 1, display: "flex", justifyContent: "center" }}>
              <Typography variant="h5" sx={{ fontWeight: "100px" }}>
                Reset Password
              </Typography>
            </Box>
          )}

          <Stack spacing={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></Box>

            <Box sx={{ alignItems: "center" }}>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", gap: 2, p: 2 }}
              >
                <MailIcon />
                <TextField
                  fullWidth
                  variant="standard"
                  label="Email*"
                  value={data.email}
                  error={error.errEmail}
                  helperText={errmessage.errEmail}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));

                    setError((prev) => ({
                      ...prev,
                      errEmail: false,
                    }));

                    setErrmessage((prev) => ({
                      ...prev,
                      errEmail: "",
                    }));
                  }}
                />
              </Box>

              <Box
                sx={{ display: "flex", alignItems: "flex-end", gap: 2, p: 2 }}
              >
                <LockIcon />
                <TextField
                  fullWidth
                  variant="standard"
                  label="Old Password*"
                  type="password"
                  value={data.oldPassword}
                  error={error.errOldPassword}
                  helperText={errmessage.errOldPassword}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      oldPassword: e.target.value,
                    }));

                    setError((prev) => ({
                      ...prev,
                      errOldPassword: false,
                    }));

                    setErrmessage((prev) => ({
                      ...prev,
                      errOldPassword: "",
                    }));
                  }}
                />
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", gap: 2, p: 2 }}
              >
                <LockIcon sx={{ width: 30, mb: 0.5 }} />
                <TextField
                  fullWidth
                  variant="standard"
                  label="New Password*"
                  type="password"
                  value={data.newPassword}
                  error={error.errNewPassword}
                  helperText={errmessage.errNewPassword}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }));

                    setError((prev) => ({
                      ...prev,
                      errNewPassword: false,
                    }));

                    setErrmessage((prev) => ({
                      ...prev,
                      errNewPassword: "",
                    }));
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
