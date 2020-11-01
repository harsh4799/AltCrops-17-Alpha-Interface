const express = require('express');
const bodyParser = require("body-parser");
const Soils = require("../models/soil");
const Crops = require('../models/crops');

const soilRouter = express.Router();
soilRouter.use(bodyParser.json());

soilRouter.route("/")
.post((req,res,next)=>{
    Soils.find(req.body)
    .then((soil)=>{
        if(soil != null){
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(soil);
        }else{
            err = new Error("Soil data not found");
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err) => next(err));
})

soilRouter.route("/putrainfalls/")
.put((req,res,next)=>{
    console.log(req.body);
    Soils.updateMany({ state: req.body.state },
        {
            rainfall_kharif:req.body.rainfall_kharif,
            rainfall_rabi: req.body.rainfall_rabi,
            rainfall_summer:req.body.rainfall_summer,
        })
    .then((soil)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(soil);
    },(err)=>next(err))
    .catch((err) => next(err));
})

// soilRouter.route("/createSoil/")
// .post((req,res,next)=>{
//     Soils.create(req.body)
//     .then((soil)=>{
//         res.statusCode = 200;
//         res.setHeader("Content-Type", "application/json");
//         res.json(soil);
//     },(err)=>next(err))
//     .catch((err) => next(err));
// })

module.exports = soilRouter;