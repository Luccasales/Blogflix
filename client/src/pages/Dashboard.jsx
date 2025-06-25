import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditPostModal from '../components/EditPostModal'
import { useAuth } from '../Context/AuthContext';

const Dashboard = () => {

    const [posts, setPosts] = useState([])
    const [postSelecionado, setPostSelecionado] = useState();
    const [mostrarModal, setMostrarmodal] = useState(false);

    const {user} = useAuth()
    const nomeUsuario = user?.nome;
    
    //Carregar os posts
    useEffect(() => {
      const fetchPosts = async() => {
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
        setPosts(posts.filter(post => post._id !== id));
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
    const fecharModal = (post) => {
      setPostSelecionado()
      setMostrarModal(false)
    }

    //Atualizar post depois de editar

    const atualizarPost = (postAtualizado) => {
      setPosts(posts.map(post => (post._id === postAtualizado._id ? postAtualizado : post)))
      fecharModal()
    }

  return (
    <div>
        <h2>Meus posts</h2>

        {posts.map((post) => (
          <div key={post._id} className=''>
              <h2>{post.titulo}</h2>
              <p>{post.descricao}</p>

          <div>
            <button onClick={() => abrirModal(post)}>
                Editar
            </button>
            <button onClick={() => deletarPost(post._id)}>
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