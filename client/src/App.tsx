import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { addToken, addUser } from "./redux/LoginSlice";
import { Navigate } from 'react-router'

import ProtectedRouter from "./components/ProtectedRouter";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";

import Home from "./Admin/Home";
import Course from "./Admin/Courses";
import Students from "./Admin/Students";
import User from "./Admin/Users";
import Enroll from "./Admin/Enroll";
import Instructor from "./Admin/Instructor";

import InstructorEnroll from "./Instructor/Enroll";
import AddCourse from "./Instructor/AddCourse";
import UpdateCourse from "./Instructor/UpdateCourse";
import InstructorCourse from "./Instructor/Courses";

import StudentCourse from "./Students/Courses";
import StudentEnroll from "./Students/Enroll";

export default function App() {
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      dispatch(addToken(token));
      const decoded = jwtDecode(token);
      dispatch(addUser(decoded));
    }
  }, []);

  const user = useSelector((state: any) => state.login.user);
  console.log(user)
  
  if(token){
  if (user.role === "admin") {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route element={<ProtectedRouter />}>
            <Route element={<Home />}>
              <Route path="*" element={<Navigate to="/courses" replace />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/courses" element={<Course />} />
              <Route path="/students" element={<Students />} />
              <Route path="/instructors" element={<Instructor />} />
              <Route path="/user" element={<User />} />
              <Route path="/courses/enroll/:id" element={<Enroll />} />
              <Route path='*' element={<Navigate to="/courses" replace />} />
            </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  } else if (user.role === "instructor") {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route element={<ProtectedRouter />}>
            <Route element={<Home />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/courses" element={<InstructorCourse />} />
              <Route path="/update/:id" element={<UpdateCourse />} />
              <Route path="/addcourse" element={<AddCourse />} />
              <Route
                path="/courses/enroll/:id"
                element={<InstructorEnroll />}
              />
            </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  } else if (user.role === "student") {
    return (
      <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route element={<ProtectedRouter />}>
            <Route element={<Home />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/courses" element={<StudentCourse />} />
              <Route path="/enroll" element={<StudentEnroll />} />
            </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </>
    );
  }
  } else {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
