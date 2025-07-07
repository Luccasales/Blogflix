import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PostDetail = () => {
  const {id} = useParams()
  const [post, setPost] = useState('')
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(response.data)
      setLoading(false)

    } catch (error) {
      console.error('Erro ao buscar post:', error )
      setLoading(false)
    }
  };

  fetchPost()
  }, [id])

  if(loading) {
    return <p>Carregando...</p>
  }

  if (!post){
    return <p> Post não encontrado.</p>
  }

  return (
    <div className='max-w-2xl mx-auto mt-8 p-4 bg-gray-900 text-white rounded shadow'>
      <img src={post.imagem} alt= {post.titulo} className='w-full h-64 onject-cover rounded mb-4' />
      <h1 className='text-3xl font-bold mb-2'>{post.titulo}</h1>
      <p className='mb-4'>{post.descricao}</p>
      <p className='text-sm text-gray-400 mb-2'>Tags: {post.tags.join(', ')}</p>
      <p className='text-sm text-gray-500'>Criado por: {post.criadoPor}</p>
    </div>
  )
}

export default PostDetail