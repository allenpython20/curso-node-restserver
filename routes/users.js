const { Router } = require("express")
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require("../controllers/users")
const { check } = require("express-validator")
const { validarCampos } = require("../middlewares/validar-campos")
const { esRoleValido, emailExiste, existeUsuarioPorId } = require("../helpers/db-validators")
const router = Router()

router.get('/',usuariosGet)

router.put('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRoleValido ),
    validarCampos
],
usuariosPut)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y debe tener más de 6 letras').isLength({min:6}),
    check('correo').custom( emailExiste ),
    check('rol').custom( esRoleValido ),
    // check('correo','El correo no es válido').isEmail(),
    //check('rol').custom( (rol) => esRoleValido(rol) ),
    // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    validarCampos
],usuariosPost)

router.delete('/:id',[
    check('id','No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
],usuariosDelete)

router.patch('/',usuariosPatch)

module.exports = router;