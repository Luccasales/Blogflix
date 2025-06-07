import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import Navbar from './components/Navbar'
import Posts from './pages/Posts'

function App() {


  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
        <Route path="/posts" element = {<Posts />} />
      </Routes>
    </BrowserRouter>
     
    
  )
}

export default App
