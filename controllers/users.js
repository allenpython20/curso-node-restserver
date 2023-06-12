const {response,request} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async(req=request,res=response)=>{

    // const {q,nombre="No name"} = req.query;
    const {limite = 5,desde=0} = req.query;
    const query = {estado:true};

    // const usuarios = await Usuario.find(query)
    //     .skip(Number(desde))
    //     .limit(Number(limite))

    // const total = await Usuario.countDocuments(query);

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    })
}

const usuariosPut = async(req,res)=>{
    const {id} = req.params;
    const {_id,password,google,correo,...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password)
    }

    const usuario = await Usuario.findByIdAndUpdate(id,resto)

    res.status(500).json({
        msg:'put ',
        id
    })
}

const usuariosPost = async (req,res)=>{


    const {nombre,correo,password,rol} = req.body;
    const usuario = new Usuario({nombre,correo,password,rol});

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt)


    //guardar en db
    await usuario.save()

    res.status(201).json({
        msg:'post',
        usuario
    })
}

const usuariosDelete = async(req,res)=>{

    const {id} = req.params;

    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});

    res.json(usuario)


   
}

const usuariosPatch = (req,res)=>{
    res.status(500).json({
        msg:'patch '
    })
}

module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch
}

