var fs = require('fs');
var lineReader = require('readline')
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
  const rl = lineReader.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('введите искомый ip: ', (ip) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      const rl1 = lineReader.createInterface({
        input: fs.createReadStream(filePath, 'utf8')
      });
      rl1.on('line', (line) => {
        if (line.includes(ip)) {
          console.log(line)
        }
      })
    })
    rl.close()
  })
});