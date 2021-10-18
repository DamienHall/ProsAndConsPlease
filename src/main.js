import * as Engine from "./gameEngine";
import {mainMenu} from "./mainMenu";

window.onload = () => {

  let screen = new Engine.Screen();
  let graphics = new Engine.Graphics(screen);
  let keyboard = new Engine.Keyboard();
  let mouse = new Engine.Mouse();

  // 0 = main menu
  // 1 = game state
  let state = 0;

  screen.add();

  Engine.run(()=>{

    switch(state) {
      case 0:
        mainMenu.mainPage(graphics);
        break;
    }

  })

}
