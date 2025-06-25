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
    <div>
      <img src={post.imagem} alt= {post.titulo} />
      <h1>{post.titulo}</h1>
      <p>{post.descricao}</p>
      <p>Tags: {post.tags.join(', ')}</p>
      <p>Criado por: {post.criadoPor}</p>
    </div>
  )
}

export default PostDetail