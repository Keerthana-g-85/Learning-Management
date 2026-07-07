import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { addToken, addUser } from "./redux/LoginSlice";
import { Navigate } from "react-router";

import ProtectedRouter from "./Routes/ProtectedRouter";
import PublicRoute from "./Routes/PublicRouter";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./Comman/Profile";

import Home from "./Comman/Home";
import Course from "./Comman/Courses";
import Students from "./Admin/Students";
import User from "./Admin/Users";
import Enroll from "./Admin/Enroll";
import Instructor from "./Admin/Instructor";

import AddCourse from "./Instructor/AddCourse";
import UpdateCourse from "./Instructor/UpdateCourse";

import StudentEnroll from "./Students/Enroll";
import Cart from './Students/Cart'
import Edit from "./Comman/UserEdit";
import Resetpassword from "./Comman/ResetPassword";

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
  console.log(user);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgotpassword" element={<Resetpassword />} />
          </Route>
          <Route element={<ProtectedRouter />}>
            <Route element={<Home />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/edit" element={<Edit />} />
              <Route path="/resetpassword" element={<Resetpassword />} />
              <Route path="/courses" element={<Course />} />
              <Route path="/students" element={<Students />} />
              <Route path="/instructors" element={<Instructor />} />
              <Route path="/user" element={<User />} />
              <Route path="/courses/enroll/:id" element={<Enroll />} />
              <Route path="/update/:id" element={<UpdateCourse />} />
              <Route path="/addcourse" element={<AddCourse />} />
              <Route path="/enroll" element={<StudentEnroll />} />
              <Route path='/cart' element={<Cart/>} />
              <Route path="*" element={<Navigate to="/courses" replace />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
