import { useState } from "react";
import { useNavigate, Link } from "react-router";
import useApi from "./Api";
import {
  TextField,
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  Snackbar,
} from "@mui/material";
import axios from "axios";
import image3 from "../assets/image3.png";
import { useDispatch } from "react-redux";
import { addToken, addUser } from "../redux/LoginSlice";
import { jwtDecode } from "jwt-decode";
import LockIcon from "@mui/icons-material/Lock";
import MailIcon from "@mui/icons-material/Mail";
import { useMutation } from "@tanstack/react-query";

interface Login {
  email: string;
  password: string;
}

export default function Login() {
  const [login, setLogin] = useState<Login>({ email: "", password: "" });

  const [error, setError] = useState({
    errEmail: false,
    errPassword: false,
    error: false,
  });
  const { Api } = useApi();

  const [errmessage, setErrmessage] = useState({
    errEmail: "",
    errPassword: "",
    error: "",
  });

  const dispatch = useDispatch();
  const nav = useNavigate();

  function handleLogin() {
    if (!login.email) {
      setError((prev) => ({ ...prev, errEmail: true }));
      setErrmessage((prev) => ({ ...prev, errEmail: "Email is required" }));
    } else {
      setError((prev) => ({ ...prev, errEmail: false }));
      setErrmessage((prev) => ({ ...prev, errEmail: "" }));
    }

    if (!login.password) {
      setError((prev) => ({ ...prev, errPassword: true }));
      setErrmessage((prev) => ({
        ...prev,
        errPassword: "Password is required",
      }));
    } else {
      setError((prev) => ({ ...prev, errPassword: false }));
      setErrmessage((prev) => ({ ...prev, errPassword: "" }));
    }

    if (!login.email || !login.password) {
      console.log("Enter the values");
      return;
    } else {
      loginMutation.mutate(login);
    }
  }

  const loginUser = async (login: Login) => {
    const response = await Api({
      method: "post",
      endpoint: "/register/login",
      data: login,
    });
    return response.data;
  };

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.accesstoken);
      dispatch(addToken(data.accesstoken));
      console.log("decoded");
      const decoded = jwtDecode(data.accesstoken);
      dispatch(addUser(decoded));
      nav("/courses");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log("login", error);
        setError((prev) => ({ ...prev, error: true }));
        setErrmessage((prev) => ({
          ...prev,
          error: error.response?.data.message,
        }));
      }
    },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: `url(${image3})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            p: 5,
            mt: 5,
            borderRadius: 3,
            width: 500,
            backgroundColor: "rgba(252, 249, 249, 0.51)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(217, 209, 209, 0.3)",
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
            Login
          </Typography>
          <Stack spacing={4}>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, p: 0 }}>
              <MailIcon />
              <TextField
                fullWidth
                id={error.errEmail ? "standard-error" : "standard-basic"}
                variant="standard"
                label="Email*"
                type="text"
                error={error.errEmail}
                value={login.email}
                helperText={errmessage.errEmail}
                onChange={(e) => {
                  setLogin({ ...login, email: e.target.value });
                  setError((prev) => ({ ...prev, errEmail: false }));
                  setErrmessage((prev) => ({ ...prev, errEmail: "" }));
                }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2, p: 0 }}>
              <LockIcon sx={{ width: 30, mb: 0.5 }} />
              <TextField
                fullWidth
                id={error.errPassword ? "standard-error" : "standard-basic"}
                variant="standard"
                label="Password*"
                type="text"
                value={login.password}
                error={error.errPassword}
                helperText={errmessage.errPassword}
                onChange={(e) => {
                  setLogin({ ...login, password: e.target.value });
                  setError((prev) => ({ ...prev, errPassword: false }));
                  setErrmessage((prev) => ({ ...prev, errPassword: "" }));
                }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="outlined"
                  sx={{
                    mr: 2,
                    bgcolor: "#233D4D",
                    color: "white",
                    width: "200px",
                  }}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Box>
            </Box>
            <Box
              sx={{ gap: 3, alignItems: "center", justifyContent: "center" }}
            >
              <Link to="/forgotpassword">
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mb: 0,
                  }}
                >
                  Forgot Password? Reset Password
                </Typography>
              </Link>
              <Link to="/register">
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Not an existing user? Register
                </Typography>
              </Link>
            </Box>
          </Stack>
        </Paper>
      </Box>
      <Snackbar
        open={error.error}
        autoHideDuration={3000}
        message={errmessage.error}
        onClose={() => setError((prev) => ({ ...prev, error: false }))}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      />
    </>
  );
}
