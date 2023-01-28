const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const {googleVerify}=require('../helpers/google-verify');


const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT( usuarioDB.id );


        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }


}

const googleSingIn = async( req, res = response ) => {

    try {
        const {email, name, picture} = await googleVerify(req.body.token);

        //verifico si el email existe
        const UsuarioDB = await Usuario.findOne({email});
        let usuario

        if(!UsuarioDB){
            usuario = new Usuario({
                nombre: name,
                email:email,
                password:'@@@',
                img: picture,
                google: true
            })
        }else{
            usuario = UsuarioDB;

            usuario.google = true;

        }

        //guardar usuario
        await usuario.save();

        //generamos JWT
        const token = await generarJWT(usuario.id);

        

        res.json({
            ok: true,
            email, name, picture,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'token de google no es correcto'
        })
    }

    

    

}

const renewToke= async (req, res = response)=>{

    const uid = req.uid;

    //generamos JWT
    const token = await generarJWT(uid);

    res.json({
        ok:true,
        token
    })
}


module.exports = {
    login,
    googleSingIn,
    renewToke
}
