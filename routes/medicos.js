/**
 * /api/medicos
 */

//ruta:/api/hospitales


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos,
    getMedicosById
} = require('../controllers/medicos')

const router = Router();


router.get( '/',validarJWT, getMedicos );

router.post( '/',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El hospital ID debe ser válido').isMongoId(),
        validarCampos
    ], 
    crearMedicos
);

router.put( '/:id',
    [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El nombre del hospital es necesario').not().isEmpty(),
        check('hospital', 'El hospital ID debe ser válido').isMongoId(),
        validarCampos 
    ],
    actualizarMedicos
);

router.delete( '/:id',
    [
        validarJWT,
    ],
    borrarMedicos
);

router.get( '/:id',
    [
        validarJWT,
    ],
    getMedicosById
);



module.exports = router;