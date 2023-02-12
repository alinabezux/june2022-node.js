const S3 = require('aws-sdk/clients/s3');
const {S3_BUCKET_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME, S3_BUCKET_URL} = require("../config/configs");
const path = require('node:path');
const uuidV1 = require('uuid').v1;

const s3Bucket = new S3({
    region: S3_BUCKET_REGION,
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY
});


async function uploadPublicFile(fileToUpload, itemType, itemId) { //завант. файлу

    return s3Bucket.upload({             //повертаємо відро з параметрами
        ContentType: fileToUpload.mimeType,     //MIME-type
        ACL: "public-read",                     //access control list(права доступу)
        Body: fileToUpload.data,
        Bucket: S3_BUCKET_NAME,
        Key: buildFileName(fileToUpload.name, itemType, itemId)     // сам об'єкт
    }).promise()
}

async function updatePublicFile(url, file) {
    return s3Bucket.putObject({
        ContentType: file.mimeType,
        ACL: "public-read",
        Bucket: S3_BUCKET_NAME,
        Key: url.split(S3_BUCKET_URL).pop(),
        Body: file.data
    })
}

async function deletePublicFile(url) {
    return s3Bucket.deleteObject({
        Bucket: S3_BUCKET_NAME,
        Key: url.split(S3_BUCKET_URL).pop()
    }).promise()
}


function buildFileName(fileName, itemType, itemId) { //будуємо ім'я файлу,якS3_BUCKET_URLий заливатимемо на aws
    const ext = path.extname(fileName); //дістаємо розширення файлу з .
    return `${itemType}/${itemId}/${uuidV1()}${ext}`;
}

module.exports = {
    uploadPublicFile,
    deletePublicFile,
    updatePublicFile
}