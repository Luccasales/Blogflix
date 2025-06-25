import Post from '../models/post.js';

// Criar post
export const createPost = async (req, res) => {
  const { titulo, imagem, descricao, tags, criadoPor } = req.body;

  if (!titulo || !imagem || !descricao || !tags || !criadoPor) {
    return res.status(400).json({ message: "Todos os campos precisam ser preenchidos!" });
  }

  try {
    const novoPost = await Post.create({ titulo, imagem, descricao, tags, criadoPor });
    res.status(201).json(novoPost);
  } catch (error) {
    console.error("Erro ao criar novo post:", error);
    res.status(500).json({ message: "Erro no servidor ao criar post" });
  }
};

// Buscar todos os posts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar posts' });
  }
};

// Buscar posts de um usuário
export const getUserPosts = async (req, res) => {
  const { nomeUsuario } = req.params;

  try {
    const posts = await Post.find({ criadoPor: nomeUsuario }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts do usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar posts do usuário' });
  }
};

// Deletar post
export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Post não encontrado" });
    }

    await post.deleteOne();
    res.status(200).json({ message: 'Post deletado com sucesso!' });
  } catch (error) {
    console.error('Erro ao deletar o post:', error);
    res.status(500).json({ message: 'Erro no servidor ao deletar o post' });
  }
};

// Atualizar post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { titulo, imagem, descricao, tags } = req.body;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    if (titulo) post.titulo = titulo;
    if (imagem) post.imagem = imagem;
    if (descricao) post.descricao = descricao;
    if (tags) post.tags = tags;

    const postAtualizado = await post.save();
    res.status(200).json(postAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar o post', error);
    res.status(500).json({ message: 'Erro no servidor ao atualizar post' });
  }
};

// Buscar post por ID
export const getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado.' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Erro ao buscar o post', error);
    res.status(500).json({ message: 'Erro no servidor ao buscar o post' });
  }
};
