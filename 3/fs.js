const fs = require('fs');
const util = require('util');
const path = require('path');

let data;

// data = fs.readFileSync('lorem.txt', 'utf8');
// console.log(data);

// fs.readFile('lorem.txt', 'utf8', (err, data) => {
//   if (err) {
//     throw err;
//   } else {
//     console.log(data);
//   }
// })

// const rfPromise = util.promisify(fs.readFile);

// rfPromise('lorem.txt', 'utf8')
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err))

// (async () => {
//   try {
//     data = await rfPromise('lorem.txt', 'utf8')
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// })()

// fs.mkdir(path.join(__dirname, '2021'), err => {
//   if (err) {
//     if (err.code === 'EEXIST') {
//       console.log('папка существует');
//     } else throw err;
//   }
// })