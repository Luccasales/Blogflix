import express from "express"
import cors from "cors" // Importa o CORS, que permite que seu frontend (React) acesse a API mesmo estando em portas diferentes (como 3000 e 5000).
import dotenv from "dotenv" //  Importa o dotenv, que permite usar variáveis de ambiente definidas em um arquivo .env (ex: porta, string de conexão com MongoDB).
import connectDB from "./config/db.js"

dotenv.config() // Ativa o uso do .env, ou seja, carrega as variáveis que você definir lá (ex: PORT=5000).
connectDB() // conexão com o mongoDB

const app = express() //Cria uma instância do servidor Express. A partir de app, você consegue criar rotas, middlewares, etc.

app.use(cors()) // Aplica o middleware cors para permitir que seu frontend (React) faça requisições para o backend sem erro de bloqueio.
app.use(express.json()) //Middleware do Express que permite o backend ler dados em JSON que vêm do frontend

// Cria uma rota GET para o caminho raiz /.
//Se você acessar http://localhost:5000/, vai ver a mensagem "API BlogFlix está rodando...".
app.get("/" , (req, res) => {
    res.send( "API BlogFlix está rodanddo...")
})

// Faz o servidor começar a escutar requisições na porta especificada.
//E imprime no terminal uma mensagem dizendo que o servidor está funcionando.

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))