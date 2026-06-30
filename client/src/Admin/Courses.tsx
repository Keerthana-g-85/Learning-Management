import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";

import { getMessage } from "../redux/MessageSlice";
import useApi from "../components/Api";
import useDebounce from "../components/Debounce";

import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CoPresentIcon from "@mui/icons-material/CoPresent";

interface Courses {
  id: string;
  title: string;
  description: string;
  instructor_name: string;
  duration: string;
  thumbnail: string;
  level: string;
  name: string;
}

export default function Courses() {
  const [course, setCourse] = useState<Courses[]>([]);
  const [filter, setFilter] = useState<string[]>([]);
  const [instructor, setInstructor] = useState<string[]>([]);
  const [open, setOpen] = useState<string>("");
  const [enroll, setEnroll] = useState<string[]>([]);

  const { Api } = useApi();

  const nav = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: any) => state.login.user);
  const search = useSelector((state: any) => state.search.search);
  const message = useSelector((state: any) => state.message.message);
  const id = useSelector((state: any) => state.login.user.id);
  const debounce = useDebounce(search);

  // Getting all the course
  const [page, setPage] = useState(1);
  const [total_page, setTotalPage] = useState(1);
  const per_page = 6;
  const getCourse = async () => {
    try {
      const response = await Api({
        method: "get",
        endpoint: `course/get?search=${debounce}&filter=${filter.join(",")}&page=${page}&per_page=${per_page}`,
      });
      const data = response.data.Data;
      setCourse(data);
      dispatch(getMessage(response.data.message));
      setTotalPage(response.data.pagination.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCourse();
  }, [debounce, filter, page]);

   useEffect(() => {
    setPage(1);
    }, [debounce, filter]);

  // delete the course
  async function handleDelete(id: string) {
    console.log(id);
    try {
      const deleteResponse = await Api({
        method: "delete",
        endpoint: "/course/delete/" + `${id}`,
      });
      console.log("/course/delete/" + `${id}`);
      getCourse();
      dispatch(getMessage(deleteResponse.data.message));
      setOpen("");
    } catch (error) {
      console.log(error);
    }
  }

  if (user.role === "student") {
    const getEnroll = async () => {
      try {
        const response = await Api({
          method: "get",
          endpoint: `enroll/getstudent/${id}`,
        });
        const data = response.data.student_course.map(
          (item: any) => item.course.id,
        );
        setEnroll(data);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(() => {
      getEnroll();
    }, []);
  }

  async function handleEnroll(id: string) {
    console.log(id);
    try {
      const response = await Api({
        method: "post",
        endpoint: `enroll/create/`,
        data: { register: `${user.id}`, course: `${id}` },
      });
      console.log(response);
      setEnroll((prev) => [...prev, id]);
      dispatch(getMessage(response.data.message));
      setOpen("");
    } catch (error) {
      console.log(error);
    }
  }

  // Instructor name fetching for filter
  const instructorName = async () => {
    const response = await Api({
      method: "get",
      endpoint: "/register/getinstructor",
    });
    console.log(response.data.instructor);
    const name = response.data.instructor.map((data: Courses) => data.name);
    console.log(name);
    setInstructor(name);
  };

  useEffect(() => {
    instructorName();
  }, []);

  function handleFilter(data: string) {
    if (filter.includes(data)) {
      const filtered = filter.filter((item) => item !== data);
      setFilter(filtered);
    } else {
      setFilter([...filter, data]);
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography
            sx={{
              fontWeight: 700,
              color: "#233D4D",
              minWidth: "90px",
            }}
          >
            Instructor
          </Typography>
          {instructor.map((data, index) => (
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
        {user.role === "instructor" ? (
          <Button
            variant="contained"
            sx={{ mr: 2, bgcolor: "#233D4D" }}
            onClick={() => nav("/addcourse")}
          >
            <AddIcon />
            Add Course
          </Button>
        ) : null}
      </Box>

      <Box sx={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
       {course.length >0 ?(course.map((data: Courses) => {
          return (
            <div key={data.id}>
              <Card
                sx={{
                  width: 450,
                  position: "relative",
                  borderRadius: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                  background: "#010102",
                  border: "1px solid #1e2224",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                  },
                  color: "white",
                }}
              >
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="180"
                  sx={{ p: 1, borderRadius: 5 }}
                  image={data.thumbnail}
                />
                {user.role === "student" ? null : (
                  <Button
                    variant="contained"
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      borderRadius: 3,
                      textTransform: "none",
                      fontSize: "1 rem",
                      fontWeight: 700,
                      bgcolor: "#fefefe",
                      color: "#0ea5e9",
                    }}
                    onClick={() => {
                      nav(`/courses/enroll/${data.id}`, { state: { data } });
                    }}
                  >
                    Enroll
                  </Button>
                )}

                <CardContent sx={{ pl: 2, pt: 1 }}>
                  <Chip
                    label={data.level.toUpperCase()}
                    sx={{
                      bgcolor: "#0ea5e9",
                      color: "white",
                      fontWeight: 700,
                      mb: 1,
                    }}
                  />

                  <Typography
                    sx={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      fontFamily: "Outfit, sans-serif",
                      mb: 1,
                    }}
                  >
                    {data.title}
                  </Typography>

                  <Typography
                    sx={{
                      color: "#94a3b8",
                      fontSize: "1rem",
                      lineHeight: 1.6,
                      minHeight: 70,
                    }}
                  >
                    {data.description}
                  </Typography>

                  <Divider sx={{ color: "grey" }} />

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 600,
                        display: "flex",
                        flex: 1,
                        alignItems: "center",
                        gap: 1,
                        color: "#94a3b8",
                      }}
                    >
                      <CoPresentIcon />
                      {data.instructor_name}
                    </Typography>

                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        bgcolor: "rgba(255, 255, 255, 0.63)",
                        size: "large",
                      }}
                    />
                    <Typography
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flex: 1,
                        gap: 1,
                        fontWeight: 600,
                        color: "#94a3b8",
                      }}
                    >
                      <AccessTimeIcon sx={{ color: "#0ea5e9" }} />
                      {data.duration}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    {user.role === "admin" ? (
                      <Button
                        variant="outlined"
                        sx={{
                          color: "#ef5252",
                          display: "flex",
                          flex: 1,
                          alignItems: "center",
                          gap: 1,
                          border: "1px solid #ef5252",
                        }}
                        startIcon={<DeleteIcon />}
                        onClick={(e) => {
                          e.preventDefault();
                          setOpen(data.id);
                        }}
                      >
                        Delete
                      </Button>
                    ) : user.role === "instructor" ? (
                      <>
                        <Button
                          variant="outlined"
                          sx={{
                            display: "flex",
                            flex: 1,
                            alignItems: "center",
                            gap: 1,
                            bgcolor: "#0ea5e9",
                            color: "white",
                          }}
                          onClick={() => {
                            nav(`/update/${data.id}`, { state: { data } });
                          }}
                          startIcon={<EditIcon />}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="outlined"
                          sx={{
                            color: "#ef5252",
                            display: "flex",
                            flex: 1,
                            alignItems: "center",
                            gap: 1,
                            border: "1px solid #ef5252",
                          }}
                          startIcon={<DeleteIcon />}
                          onClick={(e) => {
                            e.preventDefault();
                            setOpen(data.id);
                          }}
                        >
                          Delete
                        </Button>{" "}
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outlined"
                          sx={{
                            display: "flex",
                            flex: 1,
                            alignItems: "center",
                            gap: 1,
                            bgcolor: "#0ea5e9",
                            color: "white",
                            "&.Mui-disabled": {
                              bgcolor: "#49514f",
                              color: "white",
                              opacity: 1,
                            },
                          }}
                          disabled={enroll.includes(data.id)}
                          onClick={() => setOpen(data.id)}
                        >
                          {enroll.includes(data.id) ? "Enrolled" : "Enroll"}
                        </Button>
                      </>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </div>
          );
        })
      ):(
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              minHeight: "5px",
              fontWeight:'500px'
            }}
          >
            <Typography variant="h4">Not found</Typography>
          </Box>
        )}
      </Box>

      <Dialog open={Boolean(open)} onClose={() => setOpen("")}>
        <DialogTitle>
          {user.role === "student" ? "Enroll Course" : "Delete Course"}{" "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {user.role === "student"
              ? "Are you sure you want to Enroll course?"
              : "Are you sure you want to Delete course"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen("")}
            sx={{ bgcolor: "#626769", color: "white" }}
          >
            Cancel
          </Button>
          {user.role === "student" ? (
            <Button
              variant="contained"
              sx={{ bgcolor: "#0ea5e9" }}
              onClick={() => {
                handleEnroll(open);
              }}
            >
              Enroll
            </Button>
          ) : (
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
              "Delete"
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
        <Stack spacing={2}>
          <Pagination
            count={total_page}
            page={page}
            onChange ={(event, value) => {
              event.preventDefault()
              setPage(value)}
            }
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "1rem",
                height: "4rem",
                minWidth: "4rem",
              },
            }}
          />
        </Stack>
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
