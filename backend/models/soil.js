const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const soilSchema = new Schema({
    state : {
        type: String,
        required: true, 
    },
    district :{
        type: String,
        required: true,
    },
    N:{
        type: Number,
        required: true,
    },
    OC:{
        type: Number,
        required: true,
    },
    P:{
        type: Number,
        required: true,
    },
    K:{
        type: Number,
        required: true,
    },
    rainfall_kharif:{
        type: Number,
        required: true,
    },
    rainfall_rabi:{
        type: Number,
        required: true,
    },
    rainfall_summer:{
        type: Number,
        required: true,
    },
},{timestamps: true});

var Soils = mongoose.model("Soil",soilSchema);
module.exports = Soils ;
