const { v4: uuidv4 } = require('uuid')

class Tarea {
    id = "";
    des = "";
    completadoEn = null;

    constructor( desc ) {
        this.id = uuidv4();
        this.des = desc;
        // completadoEn = null;
    }
}

module.exports = Tarea;