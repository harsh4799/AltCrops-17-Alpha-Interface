var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

const mongoose = require("mongoose");
const dbConfig = require("./db-credentials");
const indexRouter = require('./routes/index');
const userRouter = require('./routes/userRouter');
const cropRouter = require('./routes/cropRouter');
const soilRouter = require('./routes/soilRouter');
const predRouter = require('./routes/predRouter');


const url = `mongodb+srv://${dbConfig.dbuser}:${dbConfig.dbpass}@cluster0.v4iwv.mongodb.net/${dbConfig.dbname}?retryWrites=true&w=majority`;
const connect = mongoose.connect(
    url,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex:true,
        useFindAndModify: false,
    }
);
connect.then((db)=>{
    console.log("Connected correctly to server")
}, (err)=> console.log(err));

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

    app.use(function(req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', ['*']);
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.header('Access-Control-Allow-Credentials', true);
        return next();
    });
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', userRouter);
app.use('/crops', cropRouter);
app.use('/soil', soilRouter);
app.use('/predict', predRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
