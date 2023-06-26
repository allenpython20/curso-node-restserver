const {response, request} = require('express')



const esAdminRole= async(req=request,res=response,next) => {
   
    if(!req.usuario){
        return res.status(500).json({
            msg: 'se quiere verificar el role sin validar el token'
        })
    }

    const {rol,nombre} = req.usuario;
    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: 'NO ES ADMIN ROLE'
        })
    }

    next();
    

}

const tieneRol = (...roles)=>{
    return (req=request,res=response,next) => {
        if(!req.usuario){
            return res.status(500).json({
                msg: 'se quiere verificar el role sin validar el token'
            })
        }

        if(!roles.includes(req.usuario.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de los roles ${roles}`
            })
        }

        next();

    }
}

module.exports = {
    esAdminRole,
    tieneRol
}