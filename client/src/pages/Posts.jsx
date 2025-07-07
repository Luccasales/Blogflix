import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {useSearch} from '../Context/SearchContext'

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useSearch()

   useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/posts');
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error('Erro ao buscar os posts', error)
      }
    };

    fetchPosts();
  }, []);

  //Filtra os posts com base no terno de busca
  const filteredPosts = posts.filter((post) => 
    post.titulo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3'>
      {filteredPosts.map((post) => (
        <Link
          key={post._id}
          to={`/posts/${post._id}`}
          className='bg-gray-900 shadow p-4 rounded block hover:bg-gray-800 transition'
        >
          <img
            src={post.imagem} 
            alt={post.titulo} 
            className='w-full h-48 object-cover mb-2 rounded' />
          <h2 className='text-xl font-bold text-white'>{post.titulo}</h2>
          <p className='text-gray-300'>
            {post.descricao.substring(0, 100)}...
          </p>
          <p className='text-sm text-gray-400 mt-2'>
            Tags: {post.tags.join(', ')}
          </p>
          <p className='text-gray-500'>
            Criado por: {post.criadoPor}
          </p>
        </Link>
      ))}

      {filteredPosts.length === 0 && (
        <p className='text-white col-span-full text-center'>Nenhum post foi encontrado</p>
      )}
    </div>
  );
};

export default Posts;
