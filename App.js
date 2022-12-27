const express = require('express');
const mongoose = require('mongoose')
mongoose.set('strictQuery', false);
require('dotenv').config();

const {userRouter, carRouter} = require('./router')
const configs = require('./configs/configs')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.json('welcome')
});

app.use('/users', userRouter);
app.use('/cars', carRouter);

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message || 'unknown message',
        status: error.status || 500
    });
});

app.listen(configs.PORT, async () => {
    await mongoose.connect(configs.MONGO_URL);
    console.log(`Server listen port ${configs.PORT}.`);
});