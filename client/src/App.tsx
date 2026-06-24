import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./Admin/Home"
import InstructorHome from "./Instructor/Home"
import InstructorEnroll from "./Instructor/Enroll"
import Course from './Admin/Courses'
import Students from "./Admin/Students"
import AddCourse from "./Instructor/AddCourse"
import UpdateCourse from "./Instructor/UpdateCourse"
import User from "./Admin/Users"
import Enroll from "./Admin/Enroll"
import { BrowserRouter , Routes , Route } from 'react-router'
import { useDispatch , useSelector} from 'react-redux'
import { addToken,addUser } from './redux/LoginSlice'
import { jwtDecode } from "jwt-decode";
import Instructor from "./Admin/Instructor"
import {useEffect} from 'react'
import InstructorCourse from "./Instructor/Courses"

export default function App(){
  const dispatch = useDispatch()
  const token = localStorage.getItem('token');
  useEffect(()=>
    {if (token) {
        dispatch(addToken(token));
        const decoded = jwtDecode(token);
        dispatch(addUser(decoded));
    }
  }
  ,[])
  const user = useSelector((state:any)=>state.login.user)
  if (user.role === 'admin'){
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route element={<Home />}>
                <Route path="/courses" element={<Course />}/>
                <Route path="/students" element={<Students />} />
                <Route path="/instructors" element={<Instructor />} />
                <Route path="/user" element={<User/>} />
                <Route path="/courses/enroll/:id" element={<Enroll/>} />
          </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}
else if (user.role ==='instructor'){
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route element={<InstructorHome />}>
                <Route path="/instructorcourses" element={<InstructorCourse />}/>
                <Route path='/update/:id' element={<UpdateCourse/>} />
                <Route path="/addcourse" element={<AddCourse/>} /> 
                <Route path="/courses/enroll/:id" element={<InstructorEnroll/>} />
          </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}
else if (user.role ==='student'){
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route element={<InstructorHome />}>
                <Route path="/instructorcourses" element={<InstructorCourse />}/>
                <Route path='/update/:id' element={<UpdateCourse/>} />
                <Route path="/addcourse" element={<AddCourse/>} /> 
                <Route path="/courses/enroll/:id" element={<InstructorEnroll/>} />
          </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}
}