import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getMessage } from "../redux/MessageSlice";
import useApi from "../components/Api";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import PeopleIcon from "@mui/icons-material/People";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Students {
  id: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  enroll_date: string;
  role: string | null;
}
interface Course {
  id: string;
  register: Students;
  enroll_date: string;
}

export default function Enroll() {
  const { Api } = useApi();

  const queryClient = useQueryClient();

  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.message.message);
  const user = useSelector((state: any) => state.login.user);

  const nav = useNavigate();
  const location = useLocation();
  const course = location.state.data;
  console.log(location.state.data);

  const getEnroll = async () => {
    const response = await Api({
      method: "get",
      endpoint: `enroll/getcourse/${course.id}`,
    });
    console.log(response);
    return response.data;
  };

  const { data: enrollData } = useQuery({
    queryKey: ["enroll", course.id],
    queryFn: getEnroll,
  });
  console.log(enrollData);
  const enroll = enrollData?.course_student;

  const getUnenroll = async () => {
    const response = await Api({
      method: "get",
      endpoint: `enroll/notenroll/${course.id}`,
    });
    return response.data;
  };

  const { data: notenrollData } = useQuery({
    queryKey: ["notenroll", course.id],
    queryFn: getUnenroll,
  });
  console.log(notenrollData);
  const notenroll = notenrollData?.notenroll;

  async function handleUnenroll(id: string) {
    const response = await Api({
      method: "delete",
      endpoint: `enroll/delete/${id}`,
    });
    return response.data;
  }

  const deleteMutation = useMutation({
    mutationFn: handleUnenroll,
    onSuccess: (data) => {
      console.log(data);
      dispatch(getMessage(data.message));
      queryClient.invalidateQueries({
        queryKey: ["notenroll"],
      });
      queryClient.invalidateQueries({
        queryKey: ["enroll"],
      });
    },
    onError: (error) => {
      console.log(error);
      dispatch(getMessage(error.message));
    },
  });

  async function handleEnroll(id: string) {
    const response = await Api({
      method: "post",
      endpoint: `enroll/create/`,
      data: { register: `${id}`, course: `${course.id}` },
    });
    return response.data;
  }

  const enrollingMutation = useMutation({
    mutationFn: handleEnroll,
    onSuccess: (data) => {
      console.log(data);
      dispatch(getMessage(data.message));
      queryClient.invalidateQueries({
        queryKey: ["notenroll", course.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["enroll", course.id],
      });
    },
    onError: (error) => {
      console.log(error);
      dispatch(getMessage(error.message));
    },
  });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "flex-start", p: 1 }}>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#0ea5e9",
            borderRadius: 2,
            width: "100px",
            gap: 1,
          }}
          onClick={() => nav("/courses")}
        >
          <ArrowBackIcon />
          Back
        </Button>
      </Box>
      <Paper
        elevation={6}
        sx={{
          mt: 2,
          borderRadius: 2,
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <PeopleIcon sx={{ color: "#0ea5e9" }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Enrolled Students
          </Typography>

          <Box
            sx={{
              px: 2,
              py: 0.5,
              bgcolor: "#0ea5e9",
              color: "white",
              borderRadius: 5,
              fontSize: "0.8rem",
              fontWeight: 600,
            }}
          >
            {enroll?.length}
          </Box>
        </Box>
        <TableContainer component={Paper} sx={{ p: 2, borderRadius: 1 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
                <StyledTableCell align="right">Enroll Date</StyledTableCell>
                {user.role === "admin" ? (
                  <StyledTableCell align="right">Action</StyledTableCell>
                ) : null}
              </TableRow>
            </TableHead>
            <TableBody>
              {enroll?.map((row: Course) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PersonIcon sx={{ fontSize: 20, color: "#0ea5e9" }} />
                      {row.register.name}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.register.email}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.register.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.register.address}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.enroll_date}
                  </StyledTableCell>
                  {user.role === "admin" ? (
                    <StyledTableCell align="right">
                      <Button
                        color="error"
                        variant="contained"
                        sx={{ gap: 1 }}
                        onClick={() => deleteMutation.mutate(row.id)}
                      >
                        <GroupRemoveIcon />
                        Unenroll
                      </Button>
                    </StyledTableCell>
                  ) : null}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
            <Stack spacing={2}>
              {/* <Pagination
                count={total_page}
                page={page}
                onChange={handleChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontSize: "1rem",
                    height: "3rem",
                    minWidth: "4rem",
                  },
                }}
              /> */}
            </Stack>
          </Box>
        </TableContainer>
      </Paper>
      <Divider />

      {user.role === "admin" ? (
        <Paper
          elevation={6}
          sx={{
            mt: 5,
            borderRadius: 2,
            boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
          }}
        >
          <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
            <PeopleIcon sx={{ color: "#0ea5e9" }} />

            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Not Enrolled Students
            </Typography>

            <Box
              sx={{
                px: 2,
                py: 0.5,
                bgcolor: "#0ea5e9",
                color: "white",
                borderRadius: 5,
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              {notenroll?.length}
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ p: 2, borderRadius: 1 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align="right">Email</StyledTableCell>
                  <StyledTableCell align="right">Phone Number</StyledTableCell>
                  <StyledTableCell align="right">Address</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {notenroll?.map((row: Students) => (
                  <StyledTableRow key={row.id}>
                    <StyledTableCell component="th" scope="row">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <PersonIcon sx={{ fontSize: 20, color: "#0ea5e9" }} />
                        {row.name}
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.email}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.phoneNumber}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {row.address}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <Button
                        sx={{ bgcolor: "#0ea5e9", gap: 1 }}
                        variant="contained"
                        onClick={() => enrollingMutation.mutate(row.id)}
                      >
                        <GroupAddIcon /> Enroll{" "}
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
              <Stack spacing={2}>
                {/* <Pagination
                count={notenrolltotalpage}
                page={notenrollpage}
                onChange={handleNotenrollchange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontSize: "1rem",
                    height: "3rem",
                    minWidth: "4rem",
                  },
                }} */}
                {/* /> */}
              </Stack>
            </Box>
          </TableContainer>
        </Paper>
      ) : null}
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
