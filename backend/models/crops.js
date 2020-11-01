const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cropSchema = new Schema({
    name:{
        type: String,
        required: true,
    },
    season: {
        type: String,
        required: true,
    },
    growth_duration:{
        type: Number,
        required: true,
    },
    N:{
        type: Number,
    },
    p:{
        type: Number,
    },
    K:{
        type: Number,
    },
    seed_cost:{
        type: Number,
    },
    moisture_percent:{
        type: Number,
    },
    water_requirement:{
        type: Number,
    },
    depth:{
        type: Number,
    },
    area:{
        type: Number,
    },
    water_requirement:{
        type: Number,
    }
},{timestamps: true});

var Crops = mongoose.model("Crop",cropSchema);
module.exports = Crops ;