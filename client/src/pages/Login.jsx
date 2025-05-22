import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import FormInput from '../components/FormInput'

const Login = () => {
  const [form,setFormData] = useState({
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
    <div>
      <FormInput
    label= "Email ou Nome"
    name="nome"
    type="text"
    value={FormData.nome}
    onChange={handleChange} />
    <FormInput
    label="Senha"
    name="senha"
    type="password"
    value={FormData.passoword} 
    onChange={handleChange} />

    <button>Entrar</button>
    </div>
    
    </>
    
  )
}

export default Login