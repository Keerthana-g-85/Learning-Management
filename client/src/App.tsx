import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./components/Home"
import { BrowserRouter , Routes , Route } from 'react-router'
import {Provider} from 'react-redux'
import {store} from './redux/Store.ts'

export default function App(){
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
      <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
      </Routes>
      </BrowserRouter>
    </Provider>
    </>
  )
}