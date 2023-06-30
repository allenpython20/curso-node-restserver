const {response,request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async(req,res= response) => {

    const {correo,password} = req.body;
    try{
        // verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg : 'Usuario / password no son correctos'
            })
        }

        //si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg : 'Usuario / password no son correctos - estado false'
            })
        }

        //validar contra
        const validarPassword =  bcryptjs.compareSync(password,usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg : 'Usuario / password no son correctos - password'
            })
        }

        //generar JWT
        const token = await generarJWT(usuario.id);

        res.status(500).json({
            usuario,
            token
           
        })


    }catch(error){
        res.status(500).json({
            msg:"Comuniquese",
           
        })
    }

    
}

const googleSignIn = async(req,res) => {
    const {id_token} = req.body;
  
    try {
        const {correo,nombre,img} = await googleVerify(id_token);

        let user = await Usuario.findOne({correo});

        if(!user){
            const data = {
                nombre,
                correo,
                password : 1,
                img,
                rol:'USER_ROLE',
                google:true
            }

            user = new Usuario(data);
            await user.save();
        }

        //si esta en db
        if(!user.estado){
            return res.json({
                msg:'No autorizado'
            })
        }

        //generar el jwt
        const token = await generarJWT(user.id);

        res.json({
            user,
            token
        })
  
   
    } catch (error) {
        res.json({
            error
        })
    }

}

module.exports = {
    login,
    googleSignIn
}