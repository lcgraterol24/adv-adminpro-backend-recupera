const { response } = require("express");
const path= require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');
const {actualizarImagen} = require('../helpers/actualizar-imagen');

const fileUploads = (req, res = response)=>{

    const tipo = req.params.tipo;
    const id = req.params.id;
    
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    //validar tipo
    if(!tiposValidos.includes(tipo)){
        return res.json({
            ok:false,
            msg: 'el tipo no es un usuario, medico u hospital'
        });
    }

    //validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg: 'No se ha cargado ningún archivo'
        });
    }

    //procesar la imagen 
    const file =req.files.imagen;
    
    //extraer extension del archivo
    const nombreCortado = file.name.split('.'); 
    const extensionArchivo = nombreCortado[nombreCortado.length -1]; //ya aca tenemosel jpg, png, etc

    //validar extension
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg: 'No es una extensión permitida'
        });
    }

    //generar el nombre del archivo
    const nombreArchivo = `${ uuidv4() }.${extensionArchivo}`;

    //path para guardar la imagen
    const pathRename  = (`./uploads/${tipo}/${nombreArchivo}`);

    // mover la imagen
    file.mv(pathRename, (err)=> {
        if (err){
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg:'Error al mover la imagen'
            });
        }

        //actualizamos base de datos
        actualizarImagen(tipo, id, nombreArchivo);
        
        res.json({
            ok: true,
            msg: 'Archivo subido',
            nombreArchivo
        });
    });

}

const retornaImagen = (req, res =response)=>{

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join( __dirname, `../uploads/${tipo}/${foto}`);

    //imagen por defecto
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        //no existe
        const pathImg = path.join( __dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

    
}


module.exports = {
    fileUploads,
    retornaImagen
}