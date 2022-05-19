const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');


const createUser = async ( req, res = response) => {

    //* Obtiene solo el email del body
    const { email, password } = req.body;

    try {
        
        //* Verifica si ya existe el email
        const emailExist = await User.findOne({ email });

        if (emailExist) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con el mismo email, verifique'
            });
        }

        //* Obtiene el body de la petición y lo pasa como parámetro al User
        const user = new User(req.body);

        //* Encriptar el password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        //* Almacena el user en la bd
        await user.save();

        //* Generar JWT
        const token = await generateJWT(user.id);
    
        //* Respuesta 
        res.json({
            ok: true,
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error, comuníquese con el Administrador'
        });
    }

}


const login = async (req, res = response) => {
    console.log(req.body);

    const { email, password} = req.body;

    console.log(email);

    try {

        const userDB = await User.findOne({ email }); //* Obtiene el User por Id

        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Usuario no encontrado'
            })
        }

        //* Validar password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(401).json({
                ok: false,
                msg: 'Contraseña incorrecta, verifique'
            });
        }

        //* Generar JWT
        const token  = await generateJWT(userDB.id);

        return res.status(200).json({
            ok: true,
            user: userDB,
            token
        });

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error, vuelva a intentar'
        });
    }

}


const renewToken = async (req, res = response) => {

    //* Recuperar uid
    const uid = req.uid;

    try {
        //* Generar un nuevo JWT
        const newToken = await generateJWT(uid);
    
        //* Obtener el User por uid
        const userDB = await User.findById(uid);

        return res.status(200).json({
            ok: true,
            user: userDB,
            token: newToken
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Ocurrió un error, vuelva a intentar'
        });
    }

}

//* Exporta el método
module.exports = {
    createUser,
    login,
    renewToken
}