const jwt = require('jsonwebtoken');
//modelo de usuario 
const Usuario =  require('../models/usuario')

//LOS MIDDLEWARE SE UTILIZAN PARA EJECUTAR FUNCIONES O ACCIONES ENTRE RUTAS: ES TODO LO QUE OCURRE ENTRE LA PETICION Y LA CARGA DE LA RUTA

const validarJWT = (req, res, next) => {

    // Leer el Token
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );
        req.uid = uid;

        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
 
}

//cuando uso el async y el await puedo trabajar con promesas
const validarAdminRole= async(req, res, next)=>{

    const uid = req.uid;
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if(usuarioDB.role !== 'ADMIN_ROLE'){
            return res.status(403).json({
                ok: false,
                msg: 'Usuario no es administrador'
            });
        }

        //si pasa todo lo anterior, significa que el user el adminitrador
        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adminitrador'
        })
    }
}


const validarAdminRoleOMismoUsuario= async(req, res, next)=>{

    const uid = req.uid;
    const id = req.params.id;

    //si uid === id significa que es el mismo usuario logueado el que quiere editar su propia info
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg: 'Usuario no existe'
            });
        }

        if(usuarioDB.role === 'ADMIN_ROLE' || uid === id){
            //si pasa todo lo anterior, significa que el user el adminitrador

            console.log(usuarioDB.role)
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'Usuario no es administrador'
            });
        }

        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el adminitrador'
        })
    }
}

module.exports = {
    validarJWT,
    validarAdminRole,
    validarAdminRoleOMismoUsuario
}