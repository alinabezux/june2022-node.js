function studentBuilder(name, age) {
    return {
        name,
        age,
        sleep: () => {
            console.log('No sleep,I am a student :(')
        }
    }
}

module.exports = {
    studentBuilder
}

// module.exports = {
//     creator: (name, age) => {
//         return {
//             name,
//             age,
//             sleep: () => {
//                 console.log('No sleep,I am a student :(')
//             }
//         }
//     },
//     lesson:'FS'
// }