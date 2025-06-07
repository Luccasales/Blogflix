import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext';

const Navbar = () => {

  const {user, logout} = useAuth();

  return (
    <nav>
      <div>
        <Link to = "/" >Inicio</Link>
      </div>
      <div>
            {!user ? (
              <>
              <Link to = "/login">Login</Link>
              <Link to ="/register">Register</Link>
              </>
            ) : (
              <>
              <span>Olá, {user.nome}</span>
              <Link to="/posts"> Posts</Link>
              <button onClick={logout}>Sair</button>
              </>
            )}
            
        </div>
    </nav>
  )
}

export default Navbar