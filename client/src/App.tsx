import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./Dashboard/Home"
import Course from './Dashboard/Courses'
import Students from "./Dashboard/Students"
import AddCourse from "./Dashboard/AddCourse"
import UpdateCourse from "./Dashboard/UpdateCourse"
import User from "./Dashboard/Users"
import Enroll from "./Dashboard/Enroll"
import { BrowserRouter , Routes , Route } from 'react-router'
import { useDispatch} from 'react-redux'
import { addToken,addUser } from './redux/LoginSlice'
import { jwtDecode } from "jwt-decode";
import Instructor from "./Dashboard/Instructor"

export default function App(){
  const dispatch = useDispatch()
    const token = localStorage.getItem('token');

    if (token) {
        dispatch(addToken(token));
        const decoded = jwtDecode(token);
        dispatch(addUser(decoded));
    }
  
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route element={<Home />}>
                <Route path="/home" element={<Home />} />
                <Route path="/courses" element={<Course />}/>
                <Route path='/update/:id' element={<UpdateCourse/>} />
                <Route path="/addcourse" element={<AddCourse/>} />
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