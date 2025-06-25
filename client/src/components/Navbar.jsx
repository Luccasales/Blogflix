import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {

  const {user, logout} = useAuth();

  return (
    <nav className='bg-black p-6'>
      <div className='flex justify-between'>
        <div className='ml-30'>
        <Link to = "/" className='bg-blue-400 p-2 justify-center hover:bg-gray-800' >Inicio</Link>
      </div>
      <div>
            {!user ? (
              <div>
             <ul className='flex space-x-10 mr-30 justify-center align-center items-center'>
              <li className=''> <Link to = "/login" className='bg-green-400 p-2 justify-center hover:bg-gray-800'>Login</Link></li>
              <li className=' '><Link to ="/register" className='bg-blue-400 p-2 justify-center hover:bg-gray-800'>Register</Link></li>
             </ul>
              </div>
            ) : (
              <div className='flex items-center justify-around space-x-8 mr-20'>
              <span>Olá, {user.nome}</span>
              <Link to="/posts" className='bg-blue-400 p-2 justify-center'> Posts</Link>
              <Link to ="/dashboard" className=''>Dashboard</Link>
              <Link to= "/criarpost" className=''> Criar post </Link>
              <button onClick={logout} className='bg-red-500 p-2 cursor-pointer'>Sair</button>
              </div>
            )}
            
        </div>
      </div>
    </nav>
  )
}

export default Navbar