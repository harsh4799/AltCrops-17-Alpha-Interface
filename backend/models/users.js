const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema= new Schema({
    state : {
        type : String,
        required: true,
    },
    district : {
        type : String,
        required: true,
    }
});

const labourSchema= new Schema({
    animal_labour : {
        type : Number,
        required: true,
    },
    human_labour : {
        type : Number,
        required: true,
    },
    machine_labour:{
        type : Number,
        required: true,
    }
});

const plotSchema = new Schema({
    location : locationSchema,
    crop :{
        type: String,
        required: true,
    },
    water_availability:{
        type: Number,
        required: true,
    },
    irrigation_available:{
        type: Boolean,
        required:true,
        default: false,
    },
});


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    name : {
        type: String,
        required: true,
    },
    family_members: {
        type: Number,
        required: true,
        default: 4,
    },
    labour: labourSchema,
    plots: [ plotSchema ],
},{
    timestamps:true,
});

var Users = mongoose.model("User",userSchema);
module.exports = Users ;
