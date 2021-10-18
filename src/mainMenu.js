import {Screen, Graphics, Keyboard, Mouse} from "./gameEngine";
import {Text, Button} from "./gui";

let keyboard = new Keyboard();
let mouse = new Mouse();
let r = 100;

let title = new Text(
  window.innerWidth/2,
  window.innerHeight/4,
  "Pros and Cons Please",
  100
);

let startButton = new Button(
  (window.innerWidth/2),
  (window.innerHeight/2),
  300,
  100,
  "Start"
);

mouse.onClick(()=>{
  let b = startButton.getBounds();
  if (b[0]<=mouse.x&&mouse.x<=b[2]&&b[1]<=mouse.y&&mouse.y<=b[3]) {
    mainMenu.transition = true;
  }
});

let mainMenu = {
  mainPage:function(graphics) {
    graphics.clearScreen();
    graphics.fillBackground("black");
    graphics.alignText("center");
    title.render(graphics);
    let b = startButton.getBounds();
    if (b[0]<=mouse.x&&mouse.x<=b[2]&&b[1]<=mouse.y&&mouse.y<=b[3]) {
      startButton.setColor("Blue");
    } else {
      startButton.setColor("White");
    }
    startButton.render(graphics);
    if (this.transition) {
      graphics.saveContext();
      graphics.setGCO("destination-in");
      graphics.circle(window.innerWidth/2, window.innerHeight/2, r);
      graphics.fill();
      graphics.restoreContext();
    }
  },
  transition: false
}

export {mainMenu}
