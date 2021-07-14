var fs = require('fs');
var lineReader = require('readline')

const rl = lineReader.createInterface({
  input: fs.createReadStream('./access.log', 'utf8')
});

const writeStream1 = fs.createWriteStream('./89.123.1.41_requests.log', {
  flags: 'a',
  encoding: 'utf8'
});
const writeStream2 = fs.createWriteStream('./34.48.240.111_requests.log', {
  flags: 'a',
  encoding: 'utf8'
});

rl.on('line', (line) => {
  const ip1 = '89.123.1.41';
  const ip2 = '34.48.240.111';
  if (line.includes(ip1)) {
    writeStream1.write('\n');
    writeStream1.write(line);
  }
  if (line.includes(ip2)) {
    writeStream2.write('\n');
    writeStream2.write(line);
  }
})

rl.on('end', () => console.log('файлы записаны'));