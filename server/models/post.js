import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    titulo:{
        type: String,
        required: true,
    },

    imagem: {
        type: String,
        required:true,
    },

    descricao: {
        type: String,
        required: true,
    },

    tags: {
        type: [String],
        required: true,
    },

    criadoPor: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);
export default Post