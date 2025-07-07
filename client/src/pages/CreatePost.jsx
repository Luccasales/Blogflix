import React, { useState } from 'react'
import FormInput from '../components/FormInput'
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../Context/AuthContext'


const CreatePost = () => {

  const [form, setFormData] = useState({
    titulo: '',
    imagem: '',
    descricao: '',
    tags: '',
    criadoPor: '',
  });

  const navigate = useNavigate();
  const { user } = useAuth();

  const handleChange = (e) => {
    const {name,value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const postData = {
        ...form,
        tags: form.tags.split(',').map(tag => tag.trim()),
        criadoPor: user.nome,
      };
      
      const response = await fetch('http://localhost:5000/api/posts', {
        method:'POST',
        headers: {'Content-Type' : 'application/json' },
        body: JSON.stringify(postData),
      });

      if (response.ok){
        alert('Post criado com sucesso');
        navigate('/posts');
      }else{
        alert('Ocorreu um erro ao criar o post.')
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro na conexão com o servidor');
    }
  }

  const handleClean = () => {
   setFormData({
     titulo: '',
    imagem: '',
    descricao: '',
    tags: '',
   });
  }

  return (
    <div className='min-h-screen justify-center align-center flex-col flex items-center gap-y-2 p-3 '>
      <FormInput 
      label= 'Titulo do post'
      name='titulo'
      type='text'
      value={form.titulo}
      onChange={handleChange}
      />

      <FormInput 
      label= 'Link da imagem'
      name='imagem'
      type= 'text'
      value={form.imagem}
      onChange={handleChange}
      />

      <FormInput
      label= 'Descrição do post'
      name='descricao'
      type='text'
      value={form.descricao}
      onChange={handleChange}
      />

      <FormInput
      label= 'Tags'
      name='tags'
      type='text'
      value={form.tags}
      onChange={handleChange}
      />

      <div className='flex gap-4'>
        <button onClick={handleSubmit} className='cursor-pointer bg-green-400 p-1 w-30 rounded hover:bg-green-600'>Criar post</button>
        <button onClick={handleClean} className='cursor-pointer bg-gray-400 p-1 w-30 rounded hover:bg-gray-600'>Limpar</button>
      </div>
      
    </div>
  )
}

export default CreatePost