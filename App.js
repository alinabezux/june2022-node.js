const fs = require('fs/promises');
const path = require('path')

const sort = async (folder, toFolder, gender) => {
    const folderPath = path.join(__dirname, folder)

    const files = await fs.readdir(folderPath);

    for (const file of files) {
        const filePath = path.join(folderPath, file)
        const data = await fs.readFile(filePath);
        const user = JSON.parse(data);

        if (user.gender === gender) {
            await fs.rename(filePath, path.join(__dirname, toFolder, file))
        }
    }
}

sort('boys', 'girls', 'female');
sort('girls', 'boys', 'male');

