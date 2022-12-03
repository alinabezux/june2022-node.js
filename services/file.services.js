const fs = require('fs/promises')
const path = require('path')


const pathToDB = path.join(process.cwd(), 'DataBase', 'users.json')

module.exports = {
    reader: async () => {
        const buffer = await fs.readFile(pathToDB);
        return JSON.parse(buffer.toString());
    },
    writer: async (users) => {
        await fs.writeFile(pathToDB, JSON.stringify(users));
    },
};