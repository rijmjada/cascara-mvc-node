const Role = require('../models/Role');
const Usuario = require('../models/Usuario');


const esRolValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) {
        throw new Error(`El rol ${rol} no esta registrado en la Base de datos`);
    }
}

const existeEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error(`El correo ${correo} ya esta registrado`);
    }
}


const existeUsuarioPorId = async (id = '') => {
    const exiteUsuario = await Usuario.findById(id);
    if ( !exiteUsuario) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    esRolValido,
    existeEmail,
    existeUsuarioPorId
}

