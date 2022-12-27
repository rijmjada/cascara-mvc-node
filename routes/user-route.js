const { Router } = require('express');
const { check } = require('express-validator');


// Middlewares Propios
const { 
    validarCampos,
    esAdminRole,
    tieneRole,
    validarJWT
} = require('../middlewares')


// Helpers
const {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
} = require('../helpers/db-validators');


// Controladores
const {
    users_Get,
    users_Post,
    users_Put,
    users_Delete } = require('../controllers/user-controller');

const router = Router();




//  -- GET 
router.get('/', users_Get);


//  -- POST
router.post('/', [
    check('nombre', 'No ingreso un nombre valido !.').not().isEmpty().isAlpha(),
    check('password', 'El password debe tener al menos 6 letras !.').isLength({ min: 6 }),
    check('correo', 'El correo no es valido!.').isEmail(),
    check('correo').custom(existeEmail),
    //check('rol', 'No es un rol valido!.').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRolValido),
    validarCampos
], users_Post);


//  -- PUT
router.put('/:id', [
    check('id', 'No es un ID valido.').not().isEmpty().isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], users_Put);


//  -- DELETE
router.delete('/:id', [
    validarJWT,
    //esAdminRole,
    tieneRole(`ADMIN_ROLE`,'USER_ROLE'),
    check('id', 'No es un ID valido.').not().isEmpty().isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],
    users_Delete);



// Exportar Modulo Router
module.exports = router;