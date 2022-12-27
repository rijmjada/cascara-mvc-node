
const json = require("superagent/lib/node/parsers/json");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res) => {

    let retorno = { msg: 'Login exitoso', status: 200 };

    const { correo, password } = req.body;
    const Usuario = require('../models/Usuario');

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            retorno.msg = '  No existe un usuario con ese correo  ';
            retorno.status = 400;
        }
        else {

            // Si el usuarios esta activo (estado=True)
            if (!usuario.estado) {
                retorno.msg = '  El usuario no esta activo  ';
                retorno.status = 400;
            }

            // Verificar la contrseña
            const validPw = bcryptjs.compareSync(password.toString(), usuario.password);
            if (!validPw) {
                retorno.msg = '  El password no es correcto ';
                retorno.status = 400;
            }
        }

        if (retorno.status == 200) {
            // Generar JWT
            retorno.token = await generarJWT(usuario.id);
        }


        // Envio Respuesta 
        res.status(retorno.status).json({usuario, retorno});

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }

}


module.exports = {
    login
}