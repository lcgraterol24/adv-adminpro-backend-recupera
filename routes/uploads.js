// ruta: /api/upload/

const { Router } = require('express');
const expressfileUpload = require('express-fileupload');
const { fileUploads, retornaImagen } = require('../controllers/uploads');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.use(expressfileUpload());

router.put( '/:tipo/:id' , fileUploads ); 
router.get( '/:tipo/:foto', retornaImagen ); //protegemos foto con JWT

module.exports = router;