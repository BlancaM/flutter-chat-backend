const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid }

        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: '24h' //* Tiempo de expiración del token
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
}




module.exports = {
    generateJWT
};