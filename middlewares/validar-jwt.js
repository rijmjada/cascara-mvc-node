
const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');


const validarJWT = async (req = request, res = response, next) => {

    const func_err = 'validarJWT(MW)';

    const token = req.header('x-token');

    if ( !token) {
        return res.status(400).json({
            msg: 'No se envio el token en el header',
            func_err
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.KEYSECRETJWT);

        const usuario = await Usuario.findById(uid);

        if( !usuario) {
            return res.status(401).json({
                msg: 'Usuario no existe en DB',
                func_err
            });
        }

        // Verificar si el usuario tiene el estado activo (true)
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario no activo',
                func_err
            });
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        return res.status(400).json({
            msg: error,
            func_err
        })
    }
}


module.exports = {
    validarJWT,
}