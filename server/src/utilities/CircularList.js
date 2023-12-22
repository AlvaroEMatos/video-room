export default class CircularList{
  constructor(list = [], currentIdx = 0){
    this.list = list;
    this.currentIdx = currentIdx;
  }
  next(){
    this.currentIdx = Math.abs((this.list.length + this.currentIdx + 1) % this.list.length);
  }
  prev(){
    this.currentIdx = Math.abs((this.list.length + this.currentIdx - 1) % this.list.length);
  }
  getCurrent(){
    return this.list[this.currentIdx];
  }
  has(value){
    for(let i = 0; i < this.list; i++){
      if(this.list[i] === value) {
        return true;
      }
    }
    return false;
  }
  find(value){
    for(let i = 0; i < this.list; i++){
      if(this.list[i] === value) {
        this.currentIdx = i;
        return true;
      }
    }
    return false;
  }
}