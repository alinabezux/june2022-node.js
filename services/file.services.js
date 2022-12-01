const fs = require('fs/promises')
const path = require('path')


module.exports = {
    reader: async () => {
        const buffer = fs.readFile(path.join(__dirname, 'DataBase', 'users.json'));
        return JSON.parse(buffer.toString());
    },
    writer: async (users) => {
        await fs.writeFile(path.join(__dirname, 'DataBase', 'users.json'), JSON.stringify(users));
    }
}