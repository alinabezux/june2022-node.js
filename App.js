const express = require('express');
const userRouter = require('./router/user.router')
const config = require('./configs/config')
require('dotenv').config();

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/users', userRouter)

app.get('/', (req, res) => {
    res.json('WELCOME:)')
})

app.use((error, req, res, next) => {
    console.log(error);

    res.status(error.status || 500).json({
        message: error.message || 'unknown error',
        status: error.status || 500
    })
})

app.listen(config.PORT, () => {
    console.log(`server listen ${config.PORT}`)
})



