import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONECTADO COM SUCESSO")
    } catch (error) {
        console.log("ERRO AO CONECTAR NO MONGODB" , error.message);
        process.exit(1)
    }
}

export default connectDB;