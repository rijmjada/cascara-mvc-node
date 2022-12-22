const { Router } = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');

const { 
    esRolValido, 
    existeEmail,
    existeUsuarioPorId
 } = require('../helpers/db-validators');

const { 
    users_Get, 
    users_Post, 
    users_Put, 
    users_Delete } = require('../controllers/user-controller');

const router = Router();



router.get('/', users_Get);

router.post('/',[
    check('nombre', 'No ingreso un nombre valido !.').not().isEmpty().isAlpha(),
    check('password', 'El password debe tener al menos 6 letras !.').isLength({ min: 6 }),
    check('correo', 'El correo no es valido!.').isEmail(),
    check('correo').custom( existeEmail ),
    //check('rol', 'No es un rol valido!.').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
], users_Post);

router.put('/:id', [
    check('id', 'No es un ID valido.').not().isEmpty().isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos
], users_Put);

router.delete('/:id', [
    check('id', 'No es un ID valido.').not().isEmpty().isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
],
users_Delete);



// Exportar Modulo Router
module.exports = router;