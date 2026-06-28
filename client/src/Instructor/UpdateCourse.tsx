import { useState } from "react";
import { useSelector , useDispatch  } from "react-redux";
import { getMessage } from '../redux/MessageSlice';
import axios from "axios";
import useApi from "../components/Api";
import {
  TextField,
  Box,
  Paper,
  Typography,
  Stack,
  Button,
  FormHelperText,
  Snackbar,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation, useNavigate } from "react-router";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function UpdateCourse() {
  const location = useLocation();
  const nav = useNavigate();
  const data = location?.state?.data;
  console.log(data);
  const { Api } = useApi();

  const [course, setCourse] = useState({
    title: data.title,
    description: data.description,
    instructor_name: data.instructor_name,
    duration: data.duration,
    level: data.level,
    thumbnail: data.thumbnail,
  });
  const [error, setError] = useState({
    title: false,
    description: false,
    instructor_name: false,
    duration: false,
    level: false,
    thumbnail: false,
  });
  const [errmessage, setMessage] = useState({
    title: "",
    description: "",
    instructor_name: "",
    duration: "",
    level: "",
    thumbnail: "",
  });
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  const message = useSelector((state:any)=>state.message.message)

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault();
    if (!course.title) {
      setError((prev) => ({ ...prev, title: true }));
      setMessage((prev) => ({ ...prev, title: "Title is required" }));
    }
    if (!course.description) {
      setError((prev) => ({ ...prev, description: true }));
      setMessage((prev) => ({
        ...prev,
        description: "Description is required",
      }));
    }
    if (!course.instructor_name) {
      setError((prev) => ({ ...prev, instructor_name: true }));
      setMessage((prev) => ({
        ...prev,
        instructor_name: "Instuctor Name is required",
      }));
    }
    if (!course.duration) {
      setError((prev) => ({ ...prev, duration: true }));
      setMessage((prev) => ({ ...prev, duration: "Duration is required" }));
    }
    if (!course.level) {
      setError((prev) => ({ ...prev, level: true }));
      setMessage((prev) => ({ ...prev, level: "Level is required" }));
    }
    if (!course.thumbnail) {
      setError((prev) => ({ ...prev, thumbnail: true }));
      setMessage((prev) => ({ ...prev, thumbnail: "Thumbnail is required" }));
    }
    if (
      !course.title ||
      !course.description ||
      !course.instructor_name ||
      !course.duration ||
      !course.level ||
      !course.thumbnail
    ) {
      return;
    } else {
      setOpen(true);
    }
  }

  async function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    try {
      const response = await Api({
        method: "put",
        endpoint: `/course/update/${data.id}`,
        data: course,
      });
      console.log(response);
      dispatch((getMessage(response.data.message)))
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        console.log(error.response?.data.message);
      }
    }
    console.log(course);
    setCourse({
      title: "",
      description: "",
      instructor_name: "",
      duration: "",
      level: "",
      thumbnail: "",
    });
    nav("/courses");
  }

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "90vh",
          p: 0,
          margin: 0,
          overflow: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start", p: 4 }}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#233D4D",
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Paper
            elevation={4}
            sx={{
              p: 3,
              mt: 3,
              bgcolor: "#EAECF0",
              borderRadius: 3,
              width: "100%",
              maxWidth: 800,
              height: "600px",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(217, 209, 209, 0.3)",
            }}
          >
            <form>
              <Stack spacing={4}>
                <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                  Update Course
                </Typography>
                <TextField
                  id={error ? "outlined-error" : "outlined-basic"}
                  fullWidth
                  label="Title"
                  variant="outlined"
                  error={error.title}
                  sx={{}}
                  value={course.title}
                  helperText={errmessage.title}
                  onChange={(e) => {
                    setCourse({ ...course, title: e.target.value });
                    setError({ ...error, title: false });
                    setMessage((prev) => ({ ...prev, title: "" }));
                  }}
                />

                <TextField
                  id="outlined-multiline-flexible"
                  fullWidth
                  label="Description"
                  multiline
                  maxRows={4}
                  sx={{}}
                  value={course.description}
                  error={error.description}
                  helperText={errmessage.description}
                  onChange={(e) => {
                    setCourse({ ...course, description: e.target.value });
                    setError({ ...error, description: false });
                    setMessage((prev) => ({ ...prev, description: "" }));
                  }}
                />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 3,
                  }}
                >
                  <TextField
                    id="outlined-basic"
                    fullWidth
                    label="Instructor Name"
                    variant="outlined"
                    disabled
                    value={course.instructor_name}
                    error={error.instructor_name}
                    helperText={errmessage.instructor_name}
                    onChange={(e) => {
                      setCourse({ ...course, instructor_name: e.target.value });
                      setError({ ...error, instructor_name: false });
                      setMessage((prev) => ({ ...prev, instructor_name: "" }));
                    }}
                  />

                  <TextField
                    id="outlined-basic"
                    fullWidth
                    label="Duration"
                    variant="outlined"
                    sx={{}}
                    value={course.duration}
                    error={error.duration}
                    helperText={errmessage.duration}
                    onChange={(e) => {
                      setCourse({ ...course, duration: e.target.value });
                      setError({ ...error, duration: false });
                      setMessage((prev) => ({ ...prev, duration: "" }));
                    }}
                  />

                  <FormControl fullWidth>
                    <InputLabel error={error.level}>Level</InputLabel>
                    <Select
                      fullWidth
                      value={course.level}
                      label="Level"
                      error={error.level}
                      onChange={(e) => {
                        setCourse({ ...course, level: e.target.value });
                        setError({ ...error, level: false });
                        setMessage((prev) => ({ ...prev, level: "" }));
                      }}
                    >
                      <MenuItem value={"beginner"}> Beginner</MenuItem>
                      <MenuItem value={"intermediate"}>Intermediate</MenuItem>
                      <MenuItem value={"advanced"}>Advanced</MenuItem>
                    </Select>
                    <FormHelperText error={error.level}>
                      {errmessage.level}
                    </FormHelperText>
                  </FormControl>

                  <TextField
                    id="outlined-basic"
                    fullWidth
                    label="Thumbnail"
                    variant="outlined"
                    value={course.thumbnail}
                    error={error.thumbnail}
                    helperText={errmessage.thumbnail}
                    onChange={(e) => {
                      setCourse({ ...course, thumbnail: e.target.value });
                      setError({ ...error, thumbnail: false });
                      setMessage((prev) => ({ ...prev, thumbnail: "" }));
                    }}
                  />
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#233D4D",
                      borderRadius: 2,
                    }}
                    onClick={handleSubmit}
                  >
                    Update
                  </Button>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Box>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle> Update Course </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to update the changes?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpen(false)}
              sx={{ bgcolor: "#626769", color: "white" }}
            >
              {" "}
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ bgcolor: "#233D4D" }}
              onClick={handleClick}
            >
              {" "}
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      
      <Snackbar open={Boolean(message)}
                autoHideDuration={3000}
                message ={message}
                
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'}}/>
    </>
  );
}
