const express = require('express');
const bodyParser = require("body-parser");
const Users = require("../models/users");

const userRouter = express.Router();
userRouter.use(bodyParser.json());


userRouter.route("/")
.post((req, res, next)=>{
    Users.findOne(req.body)
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
    },(err)=>next(err))
    .catch((err) => next(err));
})
.put((req, res, next)=>{
    Users.findOneAndUpdate(req.body,{
        $set : req.body
    }, { new : true })
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
    },(err)=>next(err))
    .catch((err) => next(err));
});


userRouter.route("/createuser/")
.post((req, res, next)=>{
    console.log(req.body);
    Users.create(req.body)
    .then((user)=>{
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json(user);
    },(err)=>next(err))
    .catch((err) => next(err));
})


module.exports = userRouter;

