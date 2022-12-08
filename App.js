const express = require('express');

const configs = require('./configs/configs')
const {PORT} = require('./configs/configs');
const userRouter = require('./router/user.router')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.json('welcome')
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        message: error.message || 'unknown message',
        status: express.status || 500
    });
});

app.listen(configs.PORT, () => {
    console.log(`Server listen port ${PORT}`)
});