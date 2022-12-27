

const ValidarCampos = require('../middlewares/validar-campos');
const ValidarRoles = require('../middlewares/validar-roles')
const ValidarJWT = require('../middlewares/validar-jwt');


module.exports = {
    
    ...ValidarCampos,
    ...ValidarRoles,
    ...ValidarJWT
}