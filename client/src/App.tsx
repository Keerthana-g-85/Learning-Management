import Register from "./components/register"
import Login from "./components/login"
import Home from "./components/home"
import { BrowserRouter , Routes , Route } from 'react-router'
export default function App(){
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}