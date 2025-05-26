import React, { useState } from 'react'
import { Form, Link } from 'react-router-dom'
import FormInput from '../components/FormInput'

const Register = () => {

const [formData, setFormData] = useState({
  nome: '',
  email: '',
  password: '',
  confirmPassword: '',
  date: '',
})
  const handleSubmit = async (e) =>{
    e.preventDefault();

    const {password, confirmPassword,date} = formData
    const idade = calcularIdade(date);

    if(password !== confirmPassword){
      alert("As senhas precisam ser iguais")
    return;
    }

  if(idade < 18){
    alert("Você precisa ter no minimo 18 anos!")
    return
  }

  try {
    const response = await fetch("http://localhost:5000/api/register", {
      method:"POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })

    const data = await response.json();

    if(response.ok){
      alert("O cadastro foi realizado com sucesso.Seja bem vindo!")
    }else{
      alert(data.message || "Erro no cadastro,tente novamente mais tarde!")
    }

  } catch (error) {
    alert("Erro ao conectar com o servidor")
    console.log(error);
  }

  
}
  const calcularIdade = (dataNasc) =>{
    const hoje = new Date();
    const nascimento = new Date(dataNasc);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth() 
    if(mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())){
      idade--
    }
    return idade;
  }

  return (
    <>
    <div>
      <Link to= "/">Voltar</Link>
    </div>

    <div className='min-h-screen flex flex-col justify-center items-center '>
      <FormInput
      label="Nome"
      type="text"
      name='nome'
      value={formData.nome}
      onChange={(e) => setFormData({...formData, nome:e.target.value})}
    />
    <FormInput
    label="Email"
    type="text"
    name='email'
    value={formData.email}
    onChange={(e) => setFormData({...formData, email:e.target.value})}
    />
    <FormInput
    label="Senha"
    type="password"
    name='password'
    value={formData.password}
    onChange={(e) => setFormData({...formData, password:e.target.value})}
    />
    <FormInput
    label="Confirme sua senha"
    type="password"
    nome='confirmPassword'
    value={formData.confirmPassword}
    onChange={(e) => setFormData({...formData, confirmPassword:e.target.value})}
    />
    <FormInput 
    label="Data de nascimento"
    type="date"
    name='date'
    value={formData.date}
    onChange={(e) => setFormData({...formData, date:e.target.value})}
    />
    <button 
    onClick={handleSubmit}
    className='mt-4 bg-gray-400 p-1 cursor-pointer hover:bg-gray-700'>Confirmar</button>
    </div>
    </>
  )
}

export default Register