import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from '../src/pages/Home'
import Login from '../src/pages/Login'
import Register from '../src/pages/Register'
import Navbar from './components/Navbar'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost'
import PostDetail from './pages/PostDetail'
import Dashboard from './pages/Dashboard'
import { SearchProvider } from './Context/SearchContext'

function App() {


  return (
    <BrowserRouter>
      <SearchProvider>
      <Navbar />
      <Routes>
        <Route path = "/" element = {<Home />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
        <Route path="/posts" element = {<Posts />} />
        <Route path="/criarpost" element = {<CreatePost />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path='/dashboard' element = {<Dashboard />} />
      </Routes>
      </SearchProvider>
    </BrowserRouter>
     
    
  )
}

export default App
