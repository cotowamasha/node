const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const PORT = process.env.PORT || 3000;

const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
}

const isHtml = fileName => {
  fn = fileName.split('.')
  if (fn[1] === 'html' || !fn[1])
    return true

  return false
}

http.createServer((request, response) => {
  if (request.url !== '/') {
    if (request.url !== '/favicon.ico' && request.url !== '/service-worker.js') {
      let dataHtml = ''
      fn = request.url.slice(1)
      if (isFile(fn)) {
        const filePath = path.join(__dirname, fn).filter(isHtml);
        fs.readFile(filePath, 'utf8', (err, data) => {
          response.setHeader('Content-Type', 'text/html');
          response.end(data);
        })
      } else {
        const filePath = path.join(__dirname, fn);
        let list = fs.readdirSync(filePath).filter(isHtml);
        list = list.map(el => `<li><a href='/${fn}/${el}'>${el}${!isFile(fn + '/' + el) ? ' (dir)' : ''}</a></li>`)
        list = list.join('')
        response.setHeader('Content-Type', 'text/html');
        response.end(`<ul>${list}</ul>`);
      }
    }
  } else {
    let list = fs.readdirSync(__dirname).filter(isHtml);
    list = list.map(el => `<li><a href='${el}'>${el}${!isFile(el) ? ' (dir)' : ''}</a></li>`)
    list = list.join('')
    response.setHeader('Content-Type', 'text/html');
    response.end(`<ul>${list}</ul>`);
  }
}).listen(PORT, 'localhost');

console.log('Listening', PORT);