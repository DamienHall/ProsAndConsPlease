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
    let metrics = graphics.measureText(this.settings.textContent);
    let left = (metrics.actualBoundingBoxLeft * -1);
    let right = metrics.actualBoundingBoxRight;
    let top = (metrics.actualBoundingBoxAscent * -1);
    let bottom = metrics.actualBoundingBoxDescent;
    let width = this.settings.textContent.trim() === this.settings.textContent ? right - left : metrics.width;
    let height = bottom - top;
    let halfLine = graphics.getContext().lineWidth / 2;
    graphics.rectangle(left+this.settings.position.x-, right, top, bottom);
  }
}

export class Button {
  constructor(...args) {

  }
}

export class Panel {
  constructor(...args) {

  }
}
