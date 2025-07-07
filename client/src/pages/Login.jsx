import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import FormInput from '../components/FormInput'
import { useAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [formData,setFormData] = useState({
    email:'',
    password:'',
  });

  const {login} = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login",{
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        login(data);
        alert("Login realizado com sucesso");
        navigate("/");
      } else {
        alert(data.message || "Erro ao fazer o login")
      }

    } catch (error) {
      console.error("Erro de conexão: ",error)
      alert("Ocorreu um erro,tente novamente mais tarde!")
    }
  }

  return (
    <>
    <div className='min-h-screen flex flex-col items-center justify-center p-10'>
      <form onSubmit={handleSubmit}>
      <FormInput
    label= "Email ou Nome"
    name="email"
    type="text"
    value={formData.email}
    onChange={handleChange}
    className= ''
    />

    <FormInput
    label="Senha"
    name="password"
    type="password"
    value={formData.password} 
    onChange={handleChange} 
    className = ''
    />

    <button
    type='submit'
    className='mt-4 bg-green-600 py-1 cursor-pointer hover:bg-green-700 transition rounded px-45'>Entrar</button>
      <p>Voce não tem conta? <Link to={"/register"} className='bg-blue-400 hover:bg-blue-700 transition'>Clique aqui para registar</Link></p>
      </form>
    </div>
    
    </>
    
  )
}

export default Login