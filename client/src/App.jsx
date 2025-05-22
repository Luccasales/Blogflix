import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
      </Routes>
    </BrowserRouter>
     
    
  )
}

export default App
