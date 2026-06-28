import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getMessage } from "../redux/MessageSlice";

import useApi from "../components/Api";
import useDebounce from "../components/Debounce";
import usePagination from "../components/Pagination";

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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

interface Users {
  id: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: string | null;
}

export default function User() {
  const [user, setUser] = useState<Users[]>([]);
  const [edit, setEdit] = useState<Users | null>(null);
  const [open, setOpen] = useState<string>("");
  const [filter, setFilter] = useState<string[]>([]);
  const [searchdata, setSearchdata] = useState<Users[]>([]);
  const [filterdata, setFilterdata] = useState<Users[]>([]);

  const dispatch = useDispatch();
  const message = useSelector((state: any) => state.message.message);

  const role = ["student", "instructor"];
  const { page, setPage, total_page, currentData, handleChange } =
    usePagination(user, 6);

  const { Api } = useApi();

  const search = useSelector((state: any) => state.search.search);
  const debounce = useDebounce(search);

  const getUsers = async () => {
    try {
      const response = await Api({ method: "get", endpoint: "/register/get" });
      console.log(response);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  async function handleSave() {
    if (edit === null) {
      return;
    }
    const response = await Api({
      method: "put",
      endpoint: `/register/update/${edit?.id}`,
      data: edit,
    });
    console.log(response);
    dispatch(getMessage(response.data.message));
    getUsers();
    setEdit(null);
  }

  async function handleDelete(id: String) {
    const response = await Api({
      method: "delete",
      endpoint: `/register/delete/${id}`,
    });
    console.log(response);
    dispatch(getMessage(response.data.message));
    getUsers();
  }

  const searchUser = async () => {
    try {
      if (debounce.trim() !== "") {
        const response = await Api({
          method: "get",
          endpoint: `/register/getsearch/${debounce}`,
        });
        console.log("search", response.data);
        const data = response.data.users;
        setSearchdata(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  function handleFilter(data: string) {
    if (filter.includes(data)) {
      const filtered = filter.filter((item) => item !== data);
      setFilter(filtered);
    } else {
      setFilter([...filter, data]);
    }
  }

  const filterUser = async () => {
    const response = await Api({
      method: "get",
      endpoint: `/register/filter/${filter.join(",")}`,
    });
    console.log(response.data.users);
    setFilterdata(response.data.users);
  };

  useEffect(() => {
    searchUser();
    setPage(1);
  }, [debounce]);

  useEffect(() => {
    if (filter.length > 0) {
      filterUser();
      setPage(1);
    }
  }, [filter]);

  useEffect(() => {
    if (debounce && filter.length > 0) {
      const common = searchdata.filter((course) =>
        filterdata.some((filter) => filter.id === course.id),
      );
      setUser(common);
    } else if (debounce) {
      setUser(searchdata);
    } else if (filter.length > 0) {
      setUser(filterdata);
    } else {
      getUsers();
    }
  }, [filterdata, searchdata, debounce, filter]);

  return (
    <>
      <Box sx={{ display: "flex", height: "80px", justifyContent: "right" }}>
        {role.map((data, index) => (
          <>
            <FormGroup key={index}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filter.includes(data)}
                    onChange={() => handleFilter(data)}
                  />
                }
                label={data}
              />
            </FormGroup>
          </>
        ))}
      </Box>
      <Paper
        elevation={6}
        sx={{
          mt: 0,
          borderRadius: 2,
          boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
        }}
      >
        <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <PeopleIcon sx={{ color: "#0ea5e9" }} />

          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            Users
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
                <StyledTableCell align="right">Role</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentData.map((row: Users) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell component="th" scope="row">
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccountCircleIcon
                        sx={{ fontSize: 20, color: "#0ea5e9" }}
                      />
                      {row.name}
                    </Box>
                  </StyledTableCell>

                  <StyledTableCell align="right">{row.email}</StyledTableCell>

                  <StyledTableCell align="right">
                    {row.phoneNumber}
                  </StyledTableCell>

                  <StyledTableCell align="right">{row.address}</StyledTableCell>

                  <StyledTableCell align="right">
                    {edit?.id === row?.id ? (
                      <FormControl>
                        <Select
                          value={edit.role}
                          onChange={(e) =>
                            setEdit({ ...edit, role: e.target.value })
                          }
                        >
                          <MenuItem value={"instructor"}> Instructor</MenuItem>
                          <MenuItem value={"student"}>Student</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      row.role
                    )}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {edit?.id === row.id ? (
                      <SaveIcon onClick={() => handleSave()} />
                    ) : (
                      <EditIcon onClick={() => setEdit(row)} />
                    )}
                    <DeleteIcon
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(row.id);
                      }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
            <Stack spacing={2}>
              <Pagination
                count={total_page}
                page={page}
                onChange={handleChange}
                sx={{
                  "& .MuiPaginationItem-root": {
                    fontSize: "1rem",
                    height: "3rem",
                    minWidth: "3rem",
                  },
                }}
              />
            </Stack>
          </Box>
        </TableContainer>
      </Paper>
      <Dialog open={Boolean(open)} onClose={() => setOpen("")}>
        <DialogTitle>Delete User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Delete User
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            variant="contained"
            sx={{ bgcolor: "#626769", color: "white" }}
            onClick={() => setOpen("")}
          >
            {" "}
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#ef5252",
              display: "flex",
              border: "1px solid #ef5252",
            }}
            startIcon={<DeleteIcon />}
            onClick={() => handleDelete(open)}
          >
            {" "}
            "Delete"
          </Button>
        </DialogActions>
      </Dialog>
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
