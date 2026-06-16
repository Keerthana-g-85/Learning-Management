import Register from "./components/register"
import Login from "./components/login"
import { BrowserRouter , Routes , Route } from 'react-router'
export default function App(){
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}