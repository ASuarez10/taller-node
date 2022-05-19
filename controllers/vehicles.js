const Vehicle = require('../models/vehicles')
const User = require("../models/users")

exports.create = async (req, res)=> {
    let vehicle = new Vehicle ({
        brand: req.body.brand,
        type: req.body.type,
        model: req.body.model,
        year: req.body.year,
        plate: req.body.plate,
        owner: req.body.owner
    })

    vehicule.save (err => {
        if (err)
            return next(err)
        res.send({status: "OK", message: "Vehicle created succesfully"})
    })

    const owner = await User.findById({_id: vehicle.owner})
    owner.vehicles.push(vehicle)
    await owner.save()
}

exports.index = (req, res, next) => {
    Vehicle.find({}, (err, vehicles)=>{
        if (err)
            return next(err) 
        res.send(vehicles)       
    } )
}

exports.show = (req, res, next) => {
    // Vehicle.findById(req.params.id, (err, Vehicle) => {
    //     if (err)
    //         return next(err) 
    //     res.send(Vehicle)
    // } )
    Vehicle.findById(req.params.id)
         .then(vehicle => {
             if(vehicle == null){
                 res.status(404).send({error: "Vehicle not found"})
             }else{
                 res.send(vehicle)
             }
         }).catch (error => {
             res.status(500).send({error: error.message})
         })
}

exports.update = (req, res, next) => {
    Vehicle.findByIdAndUpdate(req.params.id, {$set: req.body}, (err)=>{
        if (err)
            return next(err) 
        res.send({status: "OK", message: "Vehicle updated succesfully"})
    } )
}

exports.delete = (req, res, next) => {
    Vehicle.findByIdAndRemove(req.params.id,(err)=>{
        if (err)
            return next(err) 
        res.send({status: "OK", message: "Vehicle deleted succesfully"})
    })
}