const { response }= require('express');
const Hospital = require('../models/hospital');

const getHospitales = async (req, res = response) =>{

    const hospitales = await Hospital.find()
                                        .populate('usuario', 'nombre')


    res.json({
        ok:true,
        hospitales
    })
}

const crearHospitales = async (req, res = response) =>{

    const uid = req.uid;
    const hospital = new Hospital({
                                    usuario: uid,
                                    ...req.body
                                });
    

    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok:true,
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el administrador'
        })
    }


    
}

const actualizarHospitales = async (req, res = response) =>{

    const id = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        //Verificamos si existe un hospital con el id 
        if(!hospital){
            return res.status(404).json({
                ok:true,
                msg:"Hospital no encontrado"
            });
        }

        //capturamos todos los cambios de req (lo que nos envia el front)
        const cambiosHospital = {
            ...req.body,
            usuario: uid
        }

        //{new:true} indica que traiga el ultimo documento actualizado
        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital, {new:true});

        res.json({
            ok:true,
            uid: uid,
            msg:"Hospital actualizado",
            hospital: hospitalActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        })
    }
    
}

const borrarHospitales = async (req, res = response) =>{

    const id = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        //Verificamos si existe un hospital con el id 
        if(!hospital){
            return res.status(404).json({
                ok:true,
                msg:"Hospital no encontrado por id"
            });
        }



        //{new:true} indica que traiga el ultimo documento actualizado
        await Hospital.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:"Hospital eliminado"
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
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}