import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditPostModal from '../components/EditPostModal'
import { useAuth } from '../Context/AuthContext';

const Dashboard = () => {

    const [posts, setPosts] = useState([])
    const [postSelecionado, setPostSelecionado] = useState();
    const [mostrarModal, setMostrarModal] = useState(false);

    const {user} = useAuth()
    const nomeUsuario = user?.nome;
    
    //Carregar os posts
    useEffect(() => {
      const fetchPosts = async() => {
        if (!nomeUsuario) return;
        try {
          const response = await axios.get(`http://localhost:5000/api/posts/user/${nomeUsuario}`);
          setPosts(response.data);
        } catch (error) {
          console.error('Erro ao buscar posts', error)
        }
      };

      fetchPosts();
    }, [nomeUsuario]);
    

    //Deletar post
    const deletarPost = async (id) => {
      try {
        await axios.delete(`http://localhost:5000/api/posts/${id}`);
        setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id))
      } catch (error) {
        console.error('Erro ao deletar o post: ' , error)
      }
    };

    //abrir modal de edião
    const abrirModal = (post) => {
      setPostSelecionado(post)
      setMostrarModal(true)
    };

    //Fechar modal
    const fecharModal = () => {
      setPostSelecionado()
      setMostrarModal(false)
    };

    //Atualizar post depois de editar

    const atualizarPost = (postAtualizado) => {
      setPosts(posts.map(post => (post._id === postAtualizado._id ? postAtualizado : post)))
      fecharModal()
    }

  return (
    <div className='max-w-4xl mx-auto p-4 '>
        <h2 className='text-2xl font-bold mb-6 text-center text-white  '>Meus posts</h2>

        
        {posts.map((post) => (
          <div key={post._id} className='bg-gray-800 text-white rounded-lg shadow-md p-4 mb-6 '>
              <h2 className='text-xl font-semibold mb-2'>{post.titulo}</h2>
              <img src={post.imagem} alt={post.titulo} className='w-full h-64 object-cover rounded mb-4' />
              <p className='text-gray-300 mb-4'>{post.descricao}</p>

          <div className='flex space-x-4'>
            <button onClick={() => abrirModal(post)}
              className='bg-blue-500  rounded hover:bg-blue-600 text-white px-4 py-2 cursor-pointer '
              >
                Editar
            </button>
            <button onClick={() => deletarPost(post._id)}
              className='bg-red-500 p-1 rounded hover:bg-red-600 cursor-pointer px-4 py-2'
              >
               Excluir
            </button>
          </div>
          </div>
        ))}
    
    {mostrarModal && (
      <EditPostModal
        post={postSelecionado}
        fecharModal={fecharModal}
        atualizarPost={atualizarPost}
      />
    )}
    </div>
  )
}

export default Dashboard