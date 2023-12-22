export default class VideoState {
  constructor(video = {paused: true, currentTime: 0, playbackRate: 1}){
    this.isPlaying = !video.paused;
    this.currentTime = video.currentTime;
    this.speed = video.playbackRate;
    this.timestamp = Date.now(); //UTC in milliseconds 
  }
  update(newState = this){
   if(Object.keys(newState).length <= 0) newState = this;

    this.isPlaying =  newState.isPlaying;
    this.currentTime = newState.currentTime;
    this.speed = newState.speed;
    this.timestamp = newState.timestamp;
  }
}