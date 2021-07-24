const io = require('socket.io');
const http = require('http');
const path = require('path');
const fs = require('fs');

const app = http.createServer((request, response) => {
  if (request.method === 'GET') {
    const filePath = path.join(__dirname, 'index.html');
    readStream = fs.createReadStream(filePath);
    readStream.pipe(response);
  } else if (request.method === 'POST') {
    let data = '';
    request.on('data', chunk => {
      data += chunk;
    });
    request.on('end', () => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
      response.writeHead(200, {
        'Content-Type': 'json'
      });
      response.end(data);
    });
  } else {
    response.statusCode = 405;
    response.end();
  }
});


const socket = io(app);

const createName = () => {
  var name = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
  name += possible.charAt(Math.floor(Math.random() * possible.length));

  return name;
}

socket.on('connection', function (socket) {
  console.log('New connection');
  const userName = createName()

  socket.broadcast.emit('NEW_CONN_EVENT', {
    msg: `The new client connected: ${userName}`
  });

  socket.on('CLIENT_MSG', (data) => {
    socket.emit('SERVER_MSG', {
      msg: `${userName}: ${data.msg}`
    });
  });
  socket.on('CLIENT_MSG', (data) => {
    socket.broadcast.emit('SERVER_MSG', {
      msg: `${userName}: ${data.msg}`
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
    socket.broadcast.emit('disconnect_MSG', {
      msg: `disconnect: ${userName}`
    });
  })
});


app.listen(3000, 'localhost');