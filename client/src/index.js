import io from 'socket.io-client'
import VideoState from './utilities/VideoState'

const video = document.getElementById('video');
const videoTitle = document.getElementById('video-title');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

const socket = io();

var videoState = new VideoState();

let videoPlayedByCode = false;
let videoPausedByCode = false;
let videoSeekedByCode = false;
let videoRateChangedByCode = false;

//pode ser interessante trasnformar em metodos de um objeto video
function playVideo(){//https://cloudfour.com/thinks/detecting-if-an-event-was-triggered-by-a-user-or-by-javascript/
  // If the video's already playing, do nothing
  if (!video.paused) return;
  
  // Record that the video playing was triggered by code
  videoPlayedByCode = true;
  video.play().catch((error) => console.warn(error));
}
function pauseVideo(){
  if (video.paused) return;
  
  videoPausedByCode = true;
  video.pause();
}
function seekVideo(time){
  if (time === video.currentTime) return;

  videoSeekedByCode = true;
  video.currentTime = time;
}
function changeVideoRate(rate){
  if(rate === video.playbackRate) return;

  videoRateChangedByCode = true;
  video.playbackRate = rate;
}


//dom events handles
function handleChangeVideoState(){
  videoState = new VideoState(video);
  socket.emit('change-video-state', videoState);
}
function handleRateChange(){
  if(videoRateChangedByCode){
    videoRateChangedByCode = false;
    return;
  }
  handleChangeVideoState();
  console.log('video speed changed', videoState);
}
function handleSeeked(){
  if(videoSeekedByCode) {
    videoSeekedByCode = false;
    return;
  }
  handleChangeVideoState();
  console.log('seek end');
}
function handlePlay(){
  if(videoPlayedByCode) {
    videoPlayedByCode = false;
    return;
  }
  handleChangeVideoState();
  console.log('play video', videoState);
}
function handlePause(){
  if(videoPausedByCode){
    videoPausedByCode = false;
    return;
  }  
  handleChangeVideoState();
  console.log('pause video', videoState);
}
function handleClickNext(){
  socket.emit('next-video');
  console.log('next video');
}
function handleClickPrev(){
  socket.emit('prev-video');
  console.log('prev video');
}
function handleVisibilityChange(){
  if (document.hidden) {
    pauseVideo()
  } else {
    if(videoState.isPlaying){
      seekVideo(videoState.currentTime + (Date.now() - videoState.timestamp) / 1000);
      playVideo();
    }
  }
  console.log("visibility change");
}
function handleBodyClick(){
  //hack for chorome autoplay policy
  if(videoState.isPlaying !== !video.paused){
    seekVideo(videoState.currentTime + (Date.now() - videoState.timestamp) / 1000);
    playVideo();
  }
}
function videoClick(ev){
  //hack for chorome autoplay policy
  if(videoState.isPlaying !== !video.paused){
    ev.preventDefault();
  }
}
//add dom events
video.onplay = handlePlay
video.onpause = handlePause;
video.onratechange = handleRateChange;
video.onseeked = handleSeeked;
video.onclick = videoClick;

nextBtn.onclick = handleClickNext;
prevBtn.onclick = handleClickPrev;

document.addEventListener('visibilitychange', handleVisibilityChange);
document.body.addEventListener('click', handleBodyClick);

//sockets event handles
function handleConnection(currentVideo, newVideoState){
  videoTitle.textContent = currentVideo;
  video.src = `./videos/${currentVideo}`;
  console.log('start at video', currentVideo)
}
function handleChangeVideo(currentVideo){
  videoTitle.textContent = currentVideo;
  video.src = `./videos/${currentVideo}`;
  videoState = new VideoState(video);
  console.log('video changed', currentVideo);
}
function handleUpdateVideoState(newVideoState){
  videoState.update(newVideoState);

  if(videoState.isPlaying) playVideo();
  else pauseVideo();
  seekVideo(videoState.currentTime);
  changeVideoRate(videoState.speed);

  console.log('update video state', videoState);
}

//add sockets events
socket.on('connection', handleConnection);
socket.on('change-video', handleChangeVideo);
socket.on('update-video-state', handleUpdateVideoState);
