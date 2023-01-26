// ruta: /api/todo/:busqueda

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { getTodo,getDocumentosColeccion } = require('../controllers/busquedas');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();


router.get( '/:busqueda', validarJWT , getTodo ); //busquedas por parametros en todas las colecciones
router.get( '/coleccion/:tabla/:busqueda', validarJWT , getDocumentosColeccion ); //busquedas en una coleccion especifica

module.exports = router;