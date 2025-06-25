import { Link } from "react-router-dom"

const Home = () =>{
    return(
      <div className="min-h-screen flex flex-col items-center justify-center text-center">
        <div>
          <h1 className="text-4x1 mb-4 font-bold text-3xl">BLOGFLIX</h1>
          <p className="text-lg">Seja bem vindo ao BlogFlix e compartilhe os seus pensamentos</p>
        </div>
      <div className="space-x-4 mt-4">
        <Link to= "/login" 
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">Fazer Login</Link>
        <Link to= "/register"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Cadastrar</Link>
        <Link to= '/Posts'>posts</Link>
      </div>
    </div>
    )
}

export default Home