const express = require('express');
const {fileServices} = require('./services/file.services')
const fs = require("fs/promises");
const path = require("path");

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.listen(5000, () => {
    console.log('server listen 5000')
})

app.get('/', (req, res) => {
    res.json('WELCOME:)')
})

app.get('/users', async (req, res) => {
    // const users = await fileServices.reader();
    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    console.log(users);
    res.json(users)
})

app.post('/users', async (req, res) => {
    const userInfo = req.body;

    // if (userInfo.name.length < 2 || typeof userInfo.name !== 'string') {
    //     return res.status(400).json('enter another name')
    // }
    //
    // if (userInfo.age < 1 || Number.isNaN(+userInfo.age)) {
    //     return res.status(400).json('enter another age')
    // }

    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());
    // const users = await fileServices.reader()

    const newUser = {
        id: users[users.length - 1].id + 1,
        name: userInfo.name,
        age: userInfo.age
    };
    users.push(newUser)

    await fs.writeFile(path.join(__dirname, 'DataBase', 'users.json'), JSON.stringify(users))
    // await fileServices.writer(users);

    console.log(newUser);
    res.status(201).json(newUser)
})


app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());
    // const users = await fileServices.reader()

    const user = users.find((u) => u.id === +userId);

    if (!user) {
        return res.status(404).json(`User with id ${userId} not found`);
    }

    res.json(user);
})

app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const newUserInfo = req.body;

    const buffer = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer.toString())
    // const users = await fileServices.reader()

    const index = users.findIndex((u) => u.id === +userId);
    if (index === -1) {
        return res.status(404).json(`user with id ${userId} doesn't exist!`)
    }

    users[index] = {...users[index], ...newUserInfo};

    await fs.writeFile(path.join(__dirname, 'DataBase', 'users.json'), JSON.stringify(users))
    // await fileServices.writer(users);

    res.status(201).json(users[index])
})

app.delete('/users/:userId', async (req, res) => {
    const {userId} = req.params;

    const buffer_del = await fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
    const users = JSON.parse(buffer_del.toString())
    // const users = fileServices.reader()

    const index = users.findIndex((u) => u.id === +userId);
    if (index === -1) {
        return res.status(404).json(`user with id ${userId} doesn't exist!`)
    }
    users.splice(index, 1);


    await fs.writeFile(path.join(__dirname, 'DataBase', 'users.json'), JSON.stringify(users))
    // await fileServices.writer(users)

    res.status(204)

})
