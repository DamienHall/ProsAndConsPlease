import {Screen, Graphics, Keyboard, Mouse} from "./gameEngine";
import {Text, Button} from "./gui";

let keyboard = new Keyboard();
let mouse = new Mouse();
let r = window.innerWidth/2+100;

let gameplay = {
  mainPage:function(graphics) {
    graphics.clearScreen();
    graphics.fillBackground("blue");
    if (this.transition) {
      graphics.saveContext();
      graphics.setGCO("destination-in");
      graphics.beginPath();
      graphics.getContext().arc(window.innerWidth/2, window.innerHeight/2, r, 0, 2 * Math.PI);
      graphics.fill();
      graphics.restoreContext();
      let a = r/20;
      r-=r-(a<5?5:a)<=0?0:(a<5?5:a);
      if (r === 0) {
        this.transitionComplete = true;
      }
    }
  },
  transition: false,
  transitionComplete: false
}

export {gameplay}
