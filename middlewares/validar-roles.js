const { response, request } = require("express");

const esAdminRole = (req = request, res = response, next) => {

    func_err = 'esAdminRole(MW)';

    if (!req.usuario) {
        return res.status(500).json({
            msg: `No se envio el usuario en la request`,
            func_err
        });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROLE') {
        return res.status(401).json({
            msg: `El usuario ${nombre} no es Administrador`,
            func_err
        });
    }

    next();
}

const tieneRole = ( ...roles ) => {

    func_err = 'tieneRole(MW)';

    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: `No se envio el usuario en la request `,
                func_err
            });
        }

        if( !roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${roles}`,
                func_err
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
}