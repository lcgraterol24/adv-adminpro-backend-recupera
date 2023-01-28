const { response }= require('express');
const hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getMedicos = async (req, res = response) =>{

    const medicos = await Medico.find()
                                    .populate('usuario', 'nombre')
                                    .populate('hospital', 'nombre')
                                    


    res.json({
        ok:true,
        medicos
    })
}

const crearMedicos = async (req, res = response) =>{
    
    const uid = req.uid;

    const medico= new Medico({
                            usuario: uid,
                            ...req.body
                        });


    try {

        const medicoDB = await medico.save();

        res.json({
            ok:true,
            medico: medicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarMedicos = async (req, res = response) =>{

    const id = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        //Verificamos si existe un medico con el id 
        if(!medico){
            return res.status(404).json({
                ok:true,
                msg:"Medico no encontrado"
            });
        }

        //capturamos todos los cambios de req (lo que nos envia el front)
        const cambiosMedico = {
            ...req.body,
            usuario: uid
        }

        //{new:true} indica que traiga el ultimo documento actualizado
        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico, {new:true});

        res.json({
            ok:true,
            msg:"Medico actualizado",
            medico: medicoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }

    
}

const borrarMedicos = async (req, res = response) =>{

    const id = req.params.id;

    try {

        const medico = await Medico.findById(id);

        //Verificamos si existe un medico con el id 
        if(!medico){
            return res.status(404).json({
                ok:true,
                msg:"Medico no encontrado por id"
            });
        }



        //{new:true} indica que traiga el ultimo documento actualizado
        await Medico.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:"Medico eliminado"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
}

module.exports = {
    getMedicos,
    crearMedicos,
    actualizarMedicos,
    borrarMedicos
}