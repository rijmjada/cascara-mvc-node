const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrpytjs = require('bcryptjs');



const users_Get = async (req, res = response) => {

    let { limite } = req.query;

    if (isNaN(limite)) limite = 3;

    const usuarios = await Usuario.find().limit(limite);

    res.status(200).json({
        usuarios
    })
}

const users_Post = async (req, res = response) => {

    const { nombre, correo, password, rol } = req.body;
    const user = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcrpytjs.genSaltSync();
    user.password = bcrpytjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    res.status(200).json({
        message: "POST API - Controller",
        user
    })
}


const users_Put = async (req, res = response) => {
    const { id } = req.params;
    const { password, google, ...resto } = req.body;

    if (password) {
        // Encriptar la contraseña
        const salt = bcrpytjs.genSaltSync();
        resto.password = bcrpytjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.status(200).json({
        message: "PUT API - Controller",
        id
    })
}


const users_Delete = async (req, res = response) => {

    const { id } = req.params;

    // Si quisiera eliminarlo fisicamente de la db
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false});
    //const usuarioAutenticado = req.usuario;

    res.status(200).json({
        message: `Se elimino al usuario: `,
        usuario,
        //usuarioAutenticado
    })

}

module.exports = {
    users_Get,
    users_Post,
    users_Put,
    users_Delete
};