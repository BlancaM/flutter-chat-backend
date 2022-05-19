const { response } = require('express');
const jwt =  require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    //* Read token
    const token = req.header('Authorization');
    console.log(token);

    if (!token) {
        return response.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    } 

    try {
        //* Validar token
        const { uid } = jwt.verify(token, process.env.JWT_KEY);

        req.uid = uid;
        
        next();

    } catch (error) {
        return response.status(401).json({
            ok: false,
            msg: 'Token NO válido'
        });
    }
}



module.exports = {
    validateJWT
}