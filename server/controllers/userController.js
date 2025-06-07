import User from "../models/user.js";


//@desc Registrar um novo usuario
//@Route POST/api/users/register
//@acess public

export const loginUser = async (req,res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});

        if (!user){
            return res.status(400).json({message: "Usuário não encontrado"})
        }

        if (user.password !== password){
            return res.status(400).json({message: "Senha incorreta"})
        }

        //Retorna os dados do usuário (sem a senha)
        res.status(200).json({
            _id: user.id,
            nome: user.nome,
            email: user.email,
        })
    } catch (error) {
        res.status(500).json({message: "Erro ao fazer login"})
    }
}

export const registerUser = async (req, res) => {
    const {nome, email, password, date} = req.body;


try {
    //Verifica se usuario ja existe
    const userExists = await User.findOne({email});
    if (userExists){
        return res.status(400).json({message: "Usuario ja existe"})
    }

    const user = await User.create ({nome, email, password, date})

    res.status(201).json({
        _id: user.id,
        nome: user.nome,
        email: user.email,
    })
} catch (error) {
    res.status(500).json({message: "Erro ao registrar usuário"})
}

}