const { v4: uuidV4} = require('uuid');

class Band {
    constructor(name = 'No name'){
        this.id = uuidV4(); //* Crea un identificar único
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;