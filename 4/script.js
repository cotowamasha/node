#!/usr/bin/env node

// console.log(process.env);

// const fs = require('fs')

// fs.readFile('./access.log', 'utf8', (err, data) => {
//   console.log(data);
// })

// const yargs = require('yargs')

// const options = yargs
//   .usage('Usage: -p <path>')
//   .option('p', {
//     alias: 'path',
//     describe: 'Path to file',
//     type: 'string',
//     demandOption: true
//   })
//   .argv;

// const yargs = require('yargs')
// const fs = require('fs')
// const path = require('path')

// const options = yargs
//   .usage('Usage: -p <path>')
//   .option('p', {
//     alias: 'path',
//     describe: 'Path to file',
//     type: 'string',
//     demandOption: true
//   })
//   .argv;

// const filePath = path.join(__dirname, options.path)

// fs.readFile(filePath, 'utf8', (err, data) => {
//   console.log(data);
// })

// const rl = require('readline').createInterface({
//   input: process.stdin,
//   output: process.stdout
// })

// rl.question('введите имя файла: ', (filePath) => {
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     console.log(data);
//   })
// })

// rl.on('line', (line) => {
//   if (line == 'quit') {
//     rl.close()
//   } else {
//     console.log(`command: ${line}`);
//   }
// })

// const fileName = fileName => {
//   return fs.lstatSync(fileName).isFile()
// }

// const list = fs.readdirSync(__dirname).filter(isFile)

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");

const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
}

const list = fs.readdirSync(__dirname).filter(isFile);

inquirer.prompt([{
  name: "fileName",
  type: "list",
  message: "Choose file:",
  choices: list,
}]).then((answer) => {
  console.log(answer.fileName);
  const filePath = path.join(__dirname, answer.fileName);
  fs.readFile(filePath, 'utf8', (err, data) => {
    console.log(data);
  });
});