import express from 'express';
import {Server} from 'socket.io';
import http from 'http';
import path from 'path';
import appRoot from 'app-root-path';
import {listFiles} from './utilities/FSutilities.js';
import CircularList from './utilities/CircularList.js';

const PORT = 3000
const VIDEOS_DIR = path.join(appRoot.path, 'videos');
const PUBLIC_DIR = path.join(appRoot.path, 'public');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

//express
app.use(express.static(PUBLIC_DIR));
app.use('/videos', express.static(VIDEOS_DIR));

app.get('/videos', (req, res)=>{
  res.send(videoList)
});

//socket io
var videoList = new CircularList(listFiles(VIDEOS_DIR));
var videoState = {};


io.on('connection', (socket) => {
  //handles
  function handleChangeVideoState(newVideoState){
    videoState = newVideoState;
    socket.broadcast.emit('update-video-state', newVideoState);
    console.log('update video state', newVideoState);
  }
  function handleNextVideo(){
    videoList.next();
    videoState = {};
    io.emit('change-video', videoList.getCurrent());
    console.log('next video', videoList.getCurrent());
  }
  function handlePrevVideo(){
    videoList.prev();
    videoState = {};
    io.emit('change-video', videoList.getCurrent());
    console.log('prev video', videoList.getCurrent());
  }
  function handleDisconnect(){
    console.log("user disconnected");
  }
  
  //add events
  console.log("user connected");

  socket.emit('connection', videoList.getCurrent());
  socket.emit('update-video-state', videoState);

  socket.on('change-video-state', handleChangeVideoState);
  socket.on('next-video', handleNextVideo);
  socket.on('prev-video', handlePrevVideo);
  socket.on('disconnect', handleDisconnect);
});

server.listen(PORT, ()=>{
  console.log("listening on")
  console.log(`http://192.168.3.4:${PORT}`)
  console.log(`http://localhost:${PORT}`)
})