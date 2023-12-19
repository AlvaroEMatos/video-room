import io from 'socket.io-client'

const video = document.getElementById('video');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
//const socket = io()

var videoTitle = '';
var videoState = {
  isPlaying: false,
  startTime: 0,
  currentTime: 0,
};

video.addEventListener('timeupdate', (ev)=>{
  videoState.currentTime = ev.target.currentTime;
  console.log('video state update', videoState);
});

video.addEventListener('play', (ev)=>{
  videoState.isPlaying = true;
  videoState.startTime = Date.now();
  console.log('video state update', videoState);
});

video.addEventListener('pause', (ev)=>{
  videoState.isPlaying = false;
  videoState.currentTime = ev.target.currentTime;
  console.log('video state update', videoState);
});

nextBtn.addEventListener('click', ()=>{
  console.log('next video');
});

prevBtn.addEventListener('click', ()=>{
  console.log('prev video');
});