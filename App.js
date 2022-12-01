const express = require('express');
const {fileServices} = require('./services')

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
    const users = await fileServices.reader();
    res.json(users)
})

app.post('/users', async (req, res) => {
    const userInfo = req.body;

    if (userInfo.name.length < 2 || typeof userInfo.name !== 'string') {
        return res.status(400).json('enter another name')
    }

    if (userInfo.age < 1 || typeof userInfo.age !== 'number') {
        return res.status(400).json('enter another age')
    }

    const users = await fileServices.reader()

    const newUser = {
        id: users[users.length - 1].id + 1,
        name: userInfo.name,
        age: userInfo.age
    };
    users.push(newUser)

    await fileServices.writer(users)

    res.status(201).json(newUser)
})

app.get('/users/:userId', async (req, res) => {
        const {userId} = req.params;

        const users = await fileServices.reader();

        const user = users.find((u) => u.id === +userId)

        if (!user) {
            console.log('error');
            return res.status(404).json(`user with id ${userId} doesn't exist!`)
        }

        res.json(user)
    }
)

app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const newUserInfo = req.body;

    const users = await fileServices.reader()

    const index = users.findIndex((u) => u.id === +userId);
    if (index === -1) {
        return res.status(404).json(`user with id ${userId} doesn't exist!`)
    }

    users[index] = {...users[index], ...newUserInfo};

    await fileServices.writer(users)
    res.status(201).json(users[index])
})

app.delete('users/:userId', async (req, res) => {
    const {userId} = req.params;

    const users = fileServices.reader()

    const index = users.findIndex((u) => u.id === +userId);
    if (index === -1) {
        return res.status(404).json(`user with id ${userId} doesn't exist!`)
    }
    users.splice(index, 1);

    await fileServices.writer(users)

    res.status(204)

})
