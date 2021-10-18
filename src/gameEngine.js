// screen class
export class screen {
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
export class graphics {
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
    this.clearRect(0, 0, this.screen.getWidth(), this.screen.getHeight());
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
  text(x, y, text, size, color, font) {
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
}

export function run(func) {
  let lastTime = 0;
  let timer = 0;
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
