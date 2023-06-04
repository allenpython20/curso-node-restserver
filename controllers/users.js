const {response,request} = require('express')

const usuariosGet = (req=request,res=response)=>{

    const {q,nombre="No name"} = req.query;

    res.json({
        msg:'Get',
        q,
        nombre
    })
}

const usuariosPut = (req,res)=>{
    const {id} = req.params;

    res.status(500).json({
        msg:'put ',
        id
    })
}

const usuariosPost = (req,res)=>{

    const body = req.body;

    res.status(201).json({
        msg:'post',
        body
    })
}

const usuariosDelete = (req,res)=>{
    res.status(500).json({
        msg:'delete'
    })
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

