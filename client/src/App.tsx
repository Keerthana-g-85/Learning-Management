import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./Dashboard/Home"
import Course from './Dashboard/Courses'
import Students from "./Dashboard/Students"
import { BrowserRouter , Routes , Route } from 'react-router'
import { useDispatch} from 'react-redux'
import { addToken,addUser } from './redux/LoginSlice'
import { jwtDecode } from "jwt-decode";

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
                <Route path="/courses" element={<Course />} />
                <Route path="/students" element={<Students />} />
          </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}