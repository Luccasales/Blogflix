import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const EditPostModal = ({ post, fecharModal, atualizarPost }) => {
  const [formData, setFormData] = useState({
    titulo: post.titulo,
    imagem: post.imagem,
    descricao: post.descricao,
    tags: post.tags.join(', ')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postAtualizado = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };

      const response = await axios.put(`http://localhost:5000/api/posts/${post._id}`, postAtualizado);
      atualizarPost(response.data);
    } catch (error) {
      console.error('Erro ao atualizar o post', error);
      alert('Erro ao atualizar o post');
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.9 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-gray-800 p-6 rounded shadow-md w-full max-w-xl"
          initial={{ scale: 0.8, y: -50, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.8, y: -50, opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold mb-4">Editar post</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="font-medium">Título</label>
              <input
                type="text"
                name="titulo"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="font-medium">Imagem</label>
              <input
                type="text"
                name="imagem"
                value={formData.imagem}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>
            <div>
              <label className="font-medium">Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows="4"
                required
              />
            </div>
            <div>
              <label className="font-medium">Tags (separadas por vírgula)</label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
              />
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <button
                type="button"
                onClick={fecharModal}
                className="bg-gray-400 px-4 py-2 rounded hover:bg-gray-600 text-white"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-700 text-white"
              >
                Salvar
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default EditPostModal;
