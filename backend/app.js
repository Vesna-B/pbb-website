const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/users');

const app = express();

mongoose.connect('mongodb+srv://MyMDBUser:myuser20@projekat-335ya.mongodb.net/pbb-website?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!')
    });

app.use(bodyParser.json());

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, PATCH, DELETE, OPTIONS'
    );
    next();
});


app.use("/users", userRoutes);


module.exports = app;