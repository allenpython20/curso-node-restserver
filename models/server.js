const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar
        this.conectarDB()

        //Middlewares
        this.middlewares()
        //Rutas de la pp
        this.routes()
    }

    async conectarDB(){
        await dbConnection();
    }


    middlewares(){

        //Cors
        this.app.use(cors())

        //lectura y parseo 
        this.app.use(express.json())

        this.app.use(express.static('public'))
      
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/users'))
    }

    listen(){
        this.app.listen(this.port,() => {

        });
    }
}

module.exports = Server