const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const PORT = process.env.PORT || 3000;

http.createServer((request, response) => {
  if (request.url === '/index.html') {
    if (request.method === 'GET') {
      const filePath = path.join(__dirname, 'index.html');
      readStream = fs.createReadStream(filePath);
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      readStream.pipe(response);
    } else if (request.method === 'POST') {
      let data = ''
      request.on('data', (chunck) => data += chunck)
      request.on('end', () => {
        console.log(data)
        response.end(data)
      })
    }
  } else {
    response.setHeader('Content-Type', 'text/html');
    response.end('<h2>Hello World!</h2>');
  }
}).listen(PORT, 'localhost');

console.log('Listening', PORT);