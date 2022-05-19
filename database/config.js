const mongoose = require('mongoose');

//* Función encargada de hacer la conexión
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECTION);
        console.log('BD connected!');
    } catch (error) {
        console.log(error);
        throw new Error('Error con la base de datos');
    }
}




module.exports = {
    dbConnection
}