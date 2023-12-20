const express = require('express');
const websocket = require('socket.io');
const http = require('http')
const path = require('path');
var appRoot = require('app-root-path');

PORT = 3000
VIDEOS_DIR = path.resolve(appRoot.path, '../videos');
CLIENT_DIST = path.resolve(appRoot.path, '../client/dist');


const app = express();
const io = websocket(http.createServer(app));


app.use(express.static(CLIENT_DIST));
app.use('/videos', express.static(VIDEOS_DIR));


app.listen(PORT, ()=>{
  console.log(`listening on localhost:${PORT}`)
})