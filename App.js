const fs = require('node:fs');
const builder = require('./stude/createStudent')


//
// fs.readFile('./text.txt', (err, data) => {
//     console.log(err,'ERR');
//     console.log(data.toString());
// })
//
// fs.appendFile('./text.txt', 'HELLO CHAT \n', (err) => {
//     console.log(err, 'ERR');
// })
//
// fs.writeFile('./text.txt', 'WRITE FILE', (err) => {
//     console.log(err);
// })
//
// fs.readFile('./text.txt', (err, data) => {
//     fs.writeFile('./copy.txt', data, () => {
//     })
// })
//
// fs.mkdir('./students', (err) => {
//     console.log(err);
// })
//
// fs.appendFile('./students/data.json', JSON.stringify({name: 'Dima'}), (err) => {
//     console.log(err);
// })
//
// fs.unlink('./copy.txt', (err) => {
//     console.log(err);
// })
//
// fs.rmdir('./students', {recursive: true}, err => {
//     console.log(err);
// })
//
// fs.rename('./text.txt', './stude/users.json', err => {
//     console.log(err);
// })
//
// fs.copyFile('./users.json', './copy.json', err => {
//     console.log(err);
// })
//

let student1 = builder.studentBuilder('Sonya', 15);
console.log(builder);
console.log(student1.name);