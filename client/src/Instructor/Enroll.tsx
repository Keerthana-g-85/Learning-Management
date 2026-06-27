import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import useApi from "../components/Api";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, Box, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router";

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
  const nav = useNavigate();
  const location = useLocation();
  const course = location.state.data;
  console.log(location.state.data);
  const { Api } = useApi();
  const [enroll, setEnroll] = useState([]);

  const getEnroll = async () => {
    try {
      const response = await Api({
        method: "get",
        endpoint: `enroll/getcourse/${course.id}`,
      });
      const data = response.data.course_student;
      setEnroll(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getEnroll();
  }, []);

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
            {" "}
            {enroll.length}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {enroll.map((row: Course) => (
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
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}
