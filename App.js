const http = require('http');       //робить сервер не на експресі,а на хттп (це потрібно для сокетів)
const socketIO = require('socket.io');
const express = require('express');
const swaggerUI = require('swagger-ui-express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
require('dotenv').config()

const userRouter = require('./router/user.router');
const authRouter = require('./router/auth.router');
const configs = require('./config/configs');
const {cronRunner} = require("./cron");
const swaggerJSON = require("./swagger.json");

const app = express();
const server = http.createServer(app);      //будуємо сервер на основі апп

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(fileUpload());

const io = socketIO(server, {cors: 'http://localhost:80'});    //конекшн на бекенді,інформація про весь socket(всіх клієнтів)

io.on('connection', (socket) => {   //івент connection ,який спрацьовує тоді,коли хтось приєднався до серверу,
    console.log(socket);
    socket.on('disconnect', () => {
        console.log(`Socket ${socket.id} was disconnected`)
    })

    console.log(socket.id);     //socket-інформація про користувача
    console.log(socket.handshake.auth);
    console.log(socket.handshake.query.page);

    socket.on('message:send', (data) => {
        console.log(data.text);

        //відправити подію всім підключеним
        socket.emit('message:new', data.text);

        //відправити подію всім,крім відправника
        socket.broadcast.emit('message:new', data.text);

        //відправити подію всім
        io.emit('message:new', data.text);

    })

    socket.on('room:join', (roomInfo) => {
        socket.join(roomInfo.roomId)        //socket join room
        // socket.leave(roomInfo.roomId)       //socket leave room

        //send to all on room except new member
        // socket.to(roomInfo.roomId).emit('user:room:join', socket.id);

        //send to all room members
        io.to(roomInfo.roomId).emit('user:room:join', socket.id);

    })
});




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

server.listen(configs.PORT, async () => {       //сервер слухає порт
    await mongoose.connect('mongodb://127.0.0.1:27017/june2022');
    console.log(`Server listen ${configs.PORT}`);
    // cronRunner();
});
