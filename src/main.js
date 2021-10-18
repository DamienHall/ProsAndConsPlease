import * as Engine from "./gameEngine";
import {Text} from "./gui";

let screen = new Engine.screen();
let graphics = new Engine.graphics(screen);

let menuText = new Text(10, 100, "Penis? More like PEEN SUS!!", 100, null, "Blue");

screen.add();

Engine.run(()=>{
  graphics.fillBackground("black");
  graphics.setColor("white");
  menuText.render(graphics);
})
