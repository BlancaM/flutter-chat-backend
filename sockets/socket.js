const {io} = require('../app');
const Band = require('../models/band');
const Bands = require('../models/bands');

console.log('Init server');

const bands = new Bands();

bands.addBand(new Band('Band 1'));
bands.addBand(new Band('Band 2'));
bands.addBand(new Band('Band 3'));
bands.addBand(new Band('Band 4'));

//* Mensajes de sockets
io.on('connection', client => {

    console.log('Cliente conectado');

    //* Envía el listado de bandas a todos los clientes conectados
    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    // client.on('message', (payload) => {
    //     console.log('New message from', payload);

    //     io.emit('message', {user: 'bmatango'});
    // });

    client.on('emit-message', (payload) => {
        client.broadcast.emit('new-message', payload);
    });

    //* Agrega votos
    client.on('add-vote', (payload) => {
        console.log('Vote: ', payload);
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    //* Agrega nueva banda
    client.on('add-band', (payload) => {
        console.log('Band: ', payload);
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    //* Elimina un banda
    client.on('delete-band', (payload) => {
        console.log('Band: ', payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
}
);