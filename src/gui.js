import {Graphics} from "./gameEngine";

export class Text {
  constructor(x = 0, y = 0, textContent = "", fontSize = 10, font = "Arial", color = "White") {
    this.settings = {
      position: {
        x: x,
        y: y
      },
      textContent: textContent,
      fontSize: fontSize,
      font: font,
      color: color,
      border: {
        left:null,
        right:null,
        top:null,
        bottom:null
      }
    }
  }
  setX(x) {
    this.settings.position.x = x;
  }
  setY(y) {
    this.settings.position.y = y;
  }
  setPos(x, y) {
    this.setX(x);
    this.setY(y);
  }
  render(graphics) {
    graphics.text(
      this.settings.position.x,
      this.settings.position.y,
      this.settings.textContent,
      this.settings.fontSize,
      this.settings.color,
      this.settings.font
    );
  }
}

export class Button {
  constructor(x = 0, y = 0, width = 0, height = 0, text = "", color = "White") {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.color = color;
  }
  render(graphics) {
    graphics.saveContext();
    graphics.setColor(this.color);
    graphics.setLineSize(10);
    graphics.rectangle(
      this.x-(this.width/2),
      this.y-(this.height/2),
      this.width,
      this.height
    );
    graphics.alignText("center");
    graphics.setColor("white");
    graphics.text(this.x, this.y+35, this.text, 100);
    graphics.restoreContext();
  }
  getBounds() {
    return [
      this.x-(this.width/2),
      this.y-(this.height/2),
      this.x+(this.width/2),
      this.y+(this.height/2)
    ];
  }
  setColor(color) {
    this.color = color;
  }
}

export class Panel {
  constructor(...args) {

  }
}
