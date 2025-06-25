import express from 'express'
import { createPost, deletePost, getPosts, getUserPosts, updatePost, getPostById } from '../controllers/postController.js'

const router = express.Router()

//Rota para criar post
router.post('/' , createPost);

// Rota para pegar todos os posts
router.get('/', getPosts)


//Rota para pegar os posts de um usuario especifico
router.get('/user/:nomeUsuario', getUserPosts)


//  Buscar post por id
router.get('/:id', getPostById)
//Deletar um post por ID
router.delete('/:id', deletePost)

//Atualizar um post por id
router.put('/:id', updatePost)
export default router;