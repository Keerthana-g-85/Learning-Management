import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";

import { getMessage } from "../redux/MessageSlice";
import useApi from "../components/Api";

import Paper from "@mui/material/Paper";
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
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";

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
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: string | null;
}
export default function Students() {
  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.message.message);

  const { Api } = useApi();

  const getStudent = async () => {
    const response = await Api({
      method: "get",
      endpoint: "/register/getstudent",
    });
    console.log(response.data);
    dispatch(getMessage(studentData?.message));
    return response.data;
  };

  const { data: studentData } = useQuery({
    queryKey: ["student"],
    queryFn: getStudent,
  });

  const student = studentData?.students;
  

  return (
    <>
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

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
            }}
          >
            Students
          </Typography>
        </Box>

        <TableContainer component={Paper} sx={{ p: 2, borderRadius: 1 }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Address</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student?.map((row: Students) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <PersonIcon sx={{ fontSize: 20, color: "#0ea5e9" }} />
                      {row.name}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.email}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.phoneNumber}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.address}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
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
