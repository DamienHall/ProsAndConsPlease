// screen class
export class Screen {
  // initialization
  constructor() {
    // create a canvas element
    this.canvas = document.createElement("canvas");
    // get the drawing context of that canvas element
    this.context = this.canvas.getContext("2d");
    // style the document so that the canvas sits in it properly
    document.body.style = "margin:0px; padding:0px; overflow:hidden";
  }
  // add the screen to the document
  add(width, height) {
    // append the screen to the document
    document.body.appendChild(this.canvas);
    // style the canvas
    this.canvas.width = (width!==undefined)?width:window.innerWidth;
    this.canvas.height = (height!==undefined)?height:window.innerHeight;
    this.canvas.style = "border:none";
  }
  // allow auto resizing
  autoResize(arg) {
    if (arg) {
      window.addEventListener("resize", _=>{
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      });
    }
  }
  // set the size of the screen
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
  // get function to get the inner canvas
  getCanvas() {
    return this.canvas;
  }
  // get function to get width
  getWidth() {
    return this.canvas.width;
  }
  // get function to get height
  getHeight() {
    return this.canvas.height;
  }
  // get function to get the context of canvas
  getContext() {
    return this.context;
  }
}

// graphics class used to draw to the screen
export class Graphics {
  // initialization
  constructor(screen) {
    this.screen = screen;
    this.context = screen.getContext();
  }
  // save the current context
  saveContext() {
    this.context.save();
  }
  // restore the previously saved context
  restoreContext() {
    this.context.restore();
  }
  // set the global composition operation
  setGCO(operation) {
    this.context.globalCompositeOperation = operation;
  }
  // set the fillstyle/strokestyle color
  setColor(color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = color;
  }
  // clear a portion of the screen
  clear(x, y, width, height) {
    this.context.clearRect(x, y, width, height);
  }
  // clear the entire screen
  clearScreen() {
    this.clear(0, 0, this.screen.getWidth(), this.screen.getHeight());
  }
  // draw the background
  fillBackground(color) {
    this.saveContext()
    this.setGCO("destination-over");
    this.setColor(color);
    this.rectangle(0, 0, this.screen.getWidth(), this.screen.getHeight());
    this.fill();
    this.restoreContext();
  }
  // draw a rectangle
  rectangle(x, y, width, height) {
    this.beginPath();
    this.context.rect(x, y, width, height);
    this.stroke();
  }
  // draw a square
  square(x, y, size) {
    this.beginPath();
    this.rectangle(x, y, size, size);
    this.stroke();
  }
  // draw a circle
  circle(x, y, radius) {
    this.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    this.stroke();
  }
  // draw a point
  point(x, y, radius) {
    this.circle(x, y, radius);
    this.context.fill();
  }
  // draw a line
  line(...args) {
    switch(args.length) {
      case 1:
        if (typeof args[0] === "object") {
          this.beginPath();
          this.context.moveTo(args[0][0], args[0][1]);
          this.context.lineTo(args[0][2], args[0][3]);
          this.stroke();
        }
        break;
      case 2:
        if (typeof args[0] === "object" && typeof args[1] === "object") {
          this.beginPath();
          this.context.moveTo(args[0][0], args[0][1]);
          this.context.lineTo(args[1][0], args[1][1]);
          this.stroke();
        }
        break;
      case 4:
        this.beginPath();
        this.context.moveTo(args[0], args[1]);
        this.context.lineTo(args[2], args[3]);
        this.stroke();
        break;
      default:
        console.log("hello");
    }
  }
  // set the size of the line
  setLineSize(size) {
    this.context.lineWidth = size;
  }
  // fill the drawing
  fill(region) {
    this.context.fill(region);
  }
  // begin drawing path
  beginPath() {
    this.context.beginPath();
  }
  // stroke path
  stroke() {
    this.context.stroke();
  }
  // draw an image
  image(src, ...args) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      console.log(img.naturalHeight);
      console.log("hi");
      this.context.drawImage(
        img,
        (args[0]!==undefined)?args[0]:0,
        (args[1]!==undefined)?args[1]:0,
        (args[2]!==undefined)?args[2]:img.naturalWidth,
        (args[3]!==undefined)?args[3]:img.naturalHeight,
        (args[4]!==undefined)?args[4]:0,
        (args[5]!==undefined)?args[5]:0,
        (args[6]!==undefined)?args[6]:img.naturalWidth,
        (args[7]!==undefined)?args[7]:img.naturalHeight
      )
    }
  }
  // draw text
  text(x = 0, y = 0, text = "", size = 10, color = "White", font = "Arial") {
    this.saveContext();
    this.setColor(color);
    this.context.font = `${size}px ${font}`;
    this.context.fillText(text, x, y);
    this.restoreContext();
  }
  // measure text
  measureText(text) {
    return this.context.measureText(text);
  }
  // set the alignment of the text
  alignText(alignment) {
    this.context.textAlign = alignment;
  }
  // set the font
  setFont(font) {
    this.context.font = font;
  }
  // get function to get the context of canvas
  getContext() {
    return this.context;
  }
}

// keyboard class used to get keyboard input
export class Keyboard {
  constructor() {
    this.keys = [];
    document.addEventListener("keydown", e => {
      if (typeof this.keys[e.key.charCodeAt(0)] !== "object") {
        this.keys[e.key.charCodeAt(0)] = new Key(e.key.charCodeAt(0));
      }
      this.keys[e.key.charCodeAt(0)].pressed = true;
      this.keys[e.key.charCodeAt(0)].released = false;
      this.keys[e.key.charCodeAt(0)].presses++;
      this.keys[e.key.charCodeAt(0)].action.press();
    });
    document.addEventListener("keyup", e => {
      if (typeof this.keys[e.key.charCodeAt(0)] !== "object") {
        this.keys[e.key.charCodeAt(0)] = new Key(e.key.charCodeAt(0));
      }
      this.keys[e.key.charCodeAt(0)].pressed = false;
      this.keys[e.key.charCodeAt(0)].released = true;
      this.keys[e.key.charCodeAt(0)].releasses++;
      this.keys[e.key.charCodeAt(0)].action.release();
    });
  }

  onPress(character, func) {
    if (typeof this.keys[character.charCodeAt(0)] !== "object") {
      this.keys[character.charCodeAt(0)] = new Key(character.charCodeAt(0));
    }
    this.keys[character.charCodeAt(0)].onPress(func);
  }

  onRelease(character, func) {
    if (typeof this.keys[character.charCodeAt(0)] !== "object") {
      this.keys[character.charCodeAt(0)] = new Key(character.charCodeAt(0));
    }
    this.keys[character.charCodeAt(0)].onRelease(func);
  }
}

// key class used for managing Key presses
export class Key {
  constructor(charCode = 0) {
    this.pressed = false;
    this.released = false;
    this.presses = 0;
    this.releases = 0;
    this.action = {
      press:function() {},
      release:function() {}
    };
    this.charCode = charCode;
  }
  onPress(func = () => {}) {
    this.action.press = func;
  }
  onRelease(func = () => {}) {
    this.action.release = func;
  }
}

// mouse class used for getting mouse input
export class Mouse {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.action = {
      onMove:function(){},
      onClick:function(){},
      onMouseDown:function(){},
      onMouseUp:function(){},
      onMouseDrag:function(){}
    };
    document.addEventListener("mousemove", e => {
      this.x = e.clientX;
      this.y = e.clientY;
      this.action.onMove();
    });
    document.addEventListener("click", e => {
      this.action.onClick();
    });
    document.addEventListener("mousedown", e => {
      this.action.onMouseDown();
    });
    document.addEventListener("mouseup", e => {
      this.action.onMouseUp();
    });
    document.addEventListener("drag", e => {
      this.action.onMouseDrag();
    });
  }
  onMove(func) {
    this.action.onMove = func;
  }
  onClick(func) {
    this.action.onClick = func;
  }
  onMouseDown(func) {
    this.action.onMouseDown = func;
  }
  onMouseUp(func) {
    this.action.onMouseUp = func;
  }
  onMouseDrag(func) {
    this.action.onMouseDrag = func;
  }
}

export function run(func) {
  let lastTime = 0;
  let timer = 0;
  let fps = 0;
  function loop(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    fps = Math.floor(deltaTime);
    if (timer > (1000 / 60)) {
        func(fps);
    } else {
      timer += deltaTime;
    }
    window.requestAnimationFrame(loop);
  }
  window.requestAnimationFrame(loop);
}
