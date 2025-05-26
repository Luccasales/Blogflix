import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormInput from '../components/FormInput'

const Login = () => {
  const [formData,setFormData] = useState({
    email:'',
    senha:'',
  });

  const handleChange = (e) =>{
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}))
  }

  return (
    <>
    <div>
      <Link to= "/">Voltar</Link>
    </div>
    <div className='min-h-screen flex flex-col items-center justify-center p-10'>
      <FormInput
    label= "Email ou Nome"
    name="nome"
    type="text"
    value={formData.nome}
    onChange={handleChange}
    />

    <FormInput
    label="Senha"
    name="senha"
    type="password"
    value={formData.passoword} 
    onChange={handleChange} 
    />

    <button
    type='submit'
    className='mt-4 bg-gray-400 p-3 cursor-pointer hover:bg-gray-700 transition'>Entrar</button>
    <p>Voce não tem conta? <Link to={"/register"} className='bg-blue-400 hover:bg-blue-700 transition'>Clique aqui para registar</Link></p>
    </div>
    
    </>
    
  )
}

export default Login