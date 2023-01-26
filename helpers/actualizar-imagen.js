const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const borrarHospital = (path)=>{            
    if (fs.existsSync(path)) {
        // If old path exist delete it!
        fs.unlinkSync(path);
    }
}


const actualizarImagen= async (tipo, id, nombreArchivo)=>{

    switch (tipo) {
        case 'medicos':
            {//ponemos en llaves para que no de error de scope en const pathViejo
                const medico = await Medico.findById(id);    

                //buscamos el medico
                if(!medico){
                    console.log("No es un medico por ID");
                    return false;
                }


                //revisamos si tiene una imagen previamente asignada
                const pathViejo = `./uploads/medicos/${medico.img}`;
                
                borrarHospital(pathViejo);

                medico.img = nombreArchivo;
                await medico.save();

                return true;

                break;
            }
            
        case 'hospitales':
            {
                const hospital = await Hospital.findById(id); 

                //buscamos el hospital
                if(!hospital){
                    console.log("No es un hospital por ID");
                    return false;
                }


                //revisamos si tiene una imagen previamente asignada
                const pathViejo = `./uploads/hospitales/${hospital.img}`;
                
                borrarHospital(pathViejo);

                hospital.img = nombreArchivo;
                await hospital.save();

                return true;
                
                break;
            }
        case 'usuarios':
            {
                const usuario = await Usuario.findById(id);   

                //buscamos el usuario
                if(!usuario){
                    console.log("No es un usuario por ID");
                    return false;
                }


                //revisamos si tiene una imagen previamente asignada
                const pathViejo = `./uploads/usuarios/${usuario.img}`;
                
                borrarHospital(pathViejo);

                usuario.img = nombreArchivo;
                await usuario.save();

                return true;
                
                break;
            }
    
        default:
            break;
    }
}

module.exports ={
    actualizarImagen
}