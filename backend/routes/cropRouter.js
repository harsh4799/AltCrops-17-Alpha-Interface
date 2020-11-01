const express = require('express');
const bodyParser = require("body-parser");
const Crops = require("../models/crops");

const cropRouter = express.Router();
cropRouter.use(bodyParser.json());


cropRouter.route("/")
.get((req,res,next)=>{
    Crops.find({})
    .then((crops)=>{
        if(crops != null){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(crops);
        }else{
            err = new Error("Crops not found");
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err) => next(err));
})
.post((req, res, next)=>{
    console.log(req.body);
    Crops.create(req.body)
    .then((crop)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(crop);
    },(err)=>next(err))
    .catch((err) => next(err));
})

cropRouter.route("/searchbyname")
.post((req, res, next)=>{
    Crops.find(req.body)
    .then((crop)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(crop[0].growth_duration);
    },(err)=>next(err))
    .catch((err) => next(err));
})

cropRouter.route("/:cropId")
.get((req,res,next)=>{
    Crops.findById(req.params.cropId)
    .then((crop)=>{
        if(crop != null){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(crop);
        }else{
            err = new Error("Crop "+ req.params.cropId+" not found");
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err) => next(err));
})

// cropRouter.route("/setCrop")
// .put((req,res,next)=>{
//     Crops.updateMany(
//         { name: req.body.cropname },
//         {
//             depth:req.body.depth,
//             area :req.body.area,
//             water_requirement: req.body.water_requirement,
//         })
//     .then((crop)=>{
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(crop);
//     },(err)=>next(err))
//     .catch((err) => next(err));
// })

module.exports = cropRouter;
