const jwt = require("jsonwebtoken");
const {response, request} = require('express')

const Usuario = require('../models/usuario');

const validarJWT = async(req=request,res=response,next) => {
   
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: "No hay token"
        })
    }

    try{

        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
      

        //leer usuario qie corresponde al uid
        const usuario = await Usuario.findById(uid);
        if(!usuario){
            return res.status(401).json({
                msg: "No hay token - usuario no existe"
            })
        }


        //verificar si el uid tiene estaod true
        if(!usuario.estado){
            return res.status(401).json({
                msg: "No hay token - usuario false"
            })
        }

       //req.uid = uid;/*el req se pasa por referencia y por lo tanto es el mismo para todo la función que se encuentra routes/users.js router.delete()*/
        req.usuario = usuario;
        next();

    }catch(err){
        res.status(401).json({
            msg: "token no válido"
        })
    }


}

module.exports = {
    validarJWT
}