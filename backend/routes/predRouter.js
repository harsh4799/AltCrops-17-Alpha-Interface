const express = require('express');
const bodyParser = require("body-parser");
const Soils = require("../models/soil");
const axios = require("axios");
const { default: Axios } = require('axios');
const Crops = require('../models/crops');

const predRouter = express.Router();
predRouter.use(bodyParser.json());

predRouter.route("/")
.post((req,res,next)=>{
    Soils.find(req.body.location)
    .then((soil)=>{
        if(soil != null){
            console.log(req.body);
            let month = new Date().getMonth();
            let season = (month < 9 && month >=5)?"kharif":(month <= 4 && month >=2)?"summer":"rabi";
            let rainfall_season = (season == "kharif") ? soil[0].rainfall_kharif:(season=="summer")?soil[0].rainfall_summer : soil[0].rainfall_rabi;
            let body1 = {
                rainfall : rainfall_season,
                n : soil[0].N,
                p : soil[0].P,
                oc: soil[0].OC,
                k : soil[0].K,
                season: season, 
            };
            let body2 ={
                n : soil[0].N,
                p : soil[0].P,
                k : soil[0].K,
                area: req.body.area
            };
            axios.post("https://predictoryield.herokuapp.com/predict_crop",body2)
            .then((response1) => {
                body1.crop = response1.data.crops;
                console.log(body1);
                axios.post("https://predictoryield.herokuapp.com/predict_yield",body1)
                .then((response2) => {
                    let crop_list = body1.crop;
                    let confidence = response2.data['confidence'];
                    let yield_ = response2.data['yield'];
                    console.log(confidence , yield_);
                    let list = [];
                    for (let j = 0; j < confidence.length; j++) 
                        list.push({'crop_list': crop_list[j], 'confidence': confidence[j]});
                
                    list.sort((a, b) => {
                        return ((a.confidence > b.confidence) ? -1 : ((a.confidence == b.confidence) ? 0 : 1));
                    });
                    console.log(list); 

                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(list);
                })
                .catch((error2)=>{
                    console.log(error2);
                    err = new Error("Error in second model model");
                    err.status = 404;
                    return next(error2);
                })
            })
            .catch((error1)=>{
                console.log(error1);
                err = new Error("Error in first model");
                err.status = 404;
                return next(error1);
            })

        }else{
            err = new Error("Soil data not found");
            err.status = 404;
            return next(err);
        }
    },(err)=>next(err))
    .catch((err) => next(err));
})

module.exports = predRouter;