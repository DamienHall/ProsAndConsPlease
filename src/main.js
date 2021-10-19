import * as Engine from "./gameEngine";
import {mainMenu} from "./mainMenu";
import {gameplay} from "./gameplay";

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
        if (mainMenu.transitionComplete) {
          state+=1;
        }
        break;
      case 1:
        gameplay.mainPage(graphics);
        break;
    }

  })

}
