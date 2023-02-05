const express = require('express');
const swaggerUI = require('swagger-ui-express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config()

const userRouter = require('./router/user.router');
const authRouter = require('./router/auth.router');
const configs = require('./config/configs');
const {cronRunner} = require("./cron");
const swaggerJSON = require("./swagger.json");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.get('/', (req, res) => {
    res.json('WELOCME')
});

app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Unknown error',
        status: err.status || 500
    });
});

app.listen(configs.PORT, async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/june2022');
    console.log(`Server listen ${configs.PORT}`);
    // cronRunner();
});
