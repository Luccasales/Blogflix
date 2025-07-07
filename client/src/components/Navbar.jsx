import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { Search, Menu, X } from 'lucide-react'; // ícones (instale com: npm install lucide-react)
import {useSearch} from '../Context/SearchContext'

const Navbar = () => {
  const { user, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const {search, setSearch} = useSearch()

  return (
    <nav className="bg-black text-white px-4 py-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Logo / Início */}
        <Link to="/" className="text-xl font-bold text-blue-400">
          Início
        </Link>

        {/* Barra de pesquisa */}
        <div className='hidden sm:flex items-center space-x-2'>
          <input
          type="text"
          placeholder='O que tu deseja encontrar?'
          className='bg-gray-800 text-white px-3 py-2 rounded'
          value={search}
          onChange={(e) => setSearch(e.target.value)} />
          <button className='cursor-pointer'><Search size={24} /></button>
        </div>

        {/* Botão hamburger (mobile) */}
        <button onClick={() => setMenuAberto(!menuAberto)} className="sm:hidden">
          {menuAberto ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu em telas grandes */}
        <div className="hidden sm:flex space-x-4 items-center">
          {!user ? (
            <>
              <Link to="/login" className="bg-green-500 px-4 py-2 rounded hover:bg-green-600">
                Login
              </Link>
              <Link to="/register" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                Registrar
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm">Olá, {user.nome}</span>
              <Link to="/posts" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                Posts
              </Link>
              <Link to="/dashboard" className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
                Dashboard
              </Link>
              <Link to="/criarpost" className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
                Criar Post
              </Link>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                Sair
              </button>
            </>
          )}
        </div>
      </div>

      {/* Menu mobile (colapsável) */}
      {menuAberto && (
        <div className="sm:hidden mt-4 space-y-2">
          {!user ? (
            <>
              <Link to="/login" className="block bg-green-500 px-4 py-2 rounded hover:bg-green-600">
                Login
              </Link>
              <Link to="/register" className="block bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                Registrar
              </Link>
            </>
          ) : (
            <>
              <p className="text-sm">Olá, {user.nome}</p>
              <Link to="/posts" className="block bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                Posts
              </Link>
              <Link to="/dashboard" className="block bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
                Dashboard
              </Link>
              <Link to="/criarpost" className="block bg-gray-700 px-4 py-2 rounded hover:bg-gray-600">
                Criar Post
              </Link>
              <button onClick={logout} className="w-full bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                Sair
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
