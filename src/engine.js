export class screen {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    document.body.style = "margin: 0px; padding: 0px; overflow: hidden";
  }
  //create and add the game area to the page
  create(width, height) {
    document.body.appendChild(this.canvas);
    this.canvas.width = width !== undefined ? width : window.innerWidth;
    this.canvas.height = height !== undefined ? height : window.innerHeight;
    this.canvas.style.border = "1px solid black";
  }
  //screen sizing options
  autoResize(arg) {
    if (arg === true) {
      window.addEventListener("resize", _ => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
      });
    }
  }
  resize(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
  }
  //clear the screen
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  //return the canvas
  get() {
    return this.canvas;
  }
}

export class graphics {
  constructor(screen) {
    this.screen = screen;
    this.context = screen.context;
  }
  //basic shapes
  rectangle(x, y, width, height) {
    this.context.beginPath();
    this.context.rect(x, y, width, height);
    this.context.stroke();
  }
  square(x, y, size) {
    this.rectangle(x, y, size, size);
  }
  circle(x, y, radius) {
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, 2 * Math.PI);
    this.context.stroke();
  }
  point(x, y, size) {
    this.circle(x, y, size);
  }
  line(from, to) {
    this.context.beginPath();
    this.context.moveTo(from.x, from.y);
    this.context.lineTo(to.x, to.y);
    this.context.stroke();
  }
  polyLine(points, fill) {
    this.context.beginPath();
    let x, y;
    points.forEach(point => {
      this.context.moveTo(x, y);
      this.context.lineTo(point.x, point.y);
    });
    this.context.moveTo(points[0].x, points[0].y);
    this.context.lineTo(
      points[points.length - 1].x,
      points[points.length - 1].y
    );
    if (fill === true) {
      this.context.fill();
    }
    this.context.stroke();
  }

  //trans
  translate(x, y) {
    this.context.translate(x, y);
  }
  rotateFrom(x, y, degrees) {
    this.translate(x, y);
    this.setRotation(degrees);
    this.translate(-x, -y);
  }

  //set params
  setRotation(degrees) {
    this.context.rotate((degrees * Math.PI) / 180);
  }
  setColor(color) {
    this.context.fillStyle = color;
    this.context.strokeStyle = color;
  }
  setLineSize(size) {
    this.context.lineWidth = size;
  }
  setBackground(color) {
    this.setColor(color);
    this.rectangle(0, 0, this.screen.get().width, this.screen.get().height);
    this.fill();
  }
  fill() {
    this.context.fill();
  }

  //get
  get() {
    return this.context;
  }
  getRandomColor(...rgbMax) {
    rgbMax = rgbMax.map(function(cur) {
      return cur === undefined ? 256 : Math.floor(Math.random() * cur);
    });
    return `rgb(${rgbMax[0]},${rgbMax[1]},${rgbMax[2]})`;
  }
  getColorByRGB(...rgb) {
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }
  createImg(dir) {
    //create and bundle up the information
    var image = new Image();
    image.src = dir;
    let bundle = {
      dir: dir,
      scope: {
        x: 0,
        y: 0,
        width: image.naturalWidth,
        height: image.naturalHeight
      },
      data: {
        x: 0,
        y: 0,
        width: image.naturalWidth,
        height: image.naturalHeight
      }
    };
    //return that info
    return bundle;
    //let a = graphics.createImg("lmfao.jpg");
  }
  drawImg(image) {
    var img = new Image();
    img.src = image.dir;
    if (image.data.width === 0) {
      image.data.width = img.naturalWidth;
    }
    if (image.data.height === 0) {
      image.data.height = img.naturalHeight;
    }
    if (image.scope.width === 0) {
      image.scope.width = img.naturalWidth;
    }
    if (image.scope.height === 0) {
      image.scope.height = img.naturalHeight;
    }
    this.context.drawImage(
      img,
      image.scope.x,
      image.scope.y,
      image.scope.width,
      image.scope.height,
      image.data.x,
      image.data.y,
      image.data.width,
      image.data.height
    );
  }

  //for update functions
  update() {
    arguments.forEach(_ => _(this));
  }

  //text stuff
  text(text, x, y, fontSize, font) {
    return {
      text: text,
      x: x,
      y: y,
      fontSize: fontSize,
      width: this.context.measureText(text).width,
      font: font === undefined ? "Arial" : font
    };
    //let ppText = graphics.text("dl;fkaj",ect...);
  }

  drawText(text) {
    this.context.font = `${text.fontSize}px ${text.font}`;
    this.context.fillText(text.text, text.x, text.y);
  }
}

export class sprite {
  constructor(x, y, width, height) {
    this.data = {
      x: x,
      y: y,
      width: width,
      height: height
    };
    this.states = [];
  }
  setSpriteSheet(dir) {
    this.dir = dir;
  }
  createState(x, y, width, height) {
    this.states.push({ x: x, y: y, width: width, height: height });
  }
  setState(state) {
    this.scope = this.states[state];
  }
  update(graphics) {
    graphics.drawImg(this);
  }
  get() {
    return this;
  }
}

export class controller {
  constructor() {
    this.keyboard = {
      keys: [],
      keyFunctions: [],
      onKey: function(key, func) {
        this.keyFunctions[key.charCodeAt(0)] = func;
      }
    };
    this.mouse = {
      x: undefined,
      y: undefined,
      state: undefined,
      onClick: undefined,
      onMouseDown: undefined,
      onMouseUp: undefined,
      onMouseDrag: undefined
    };
    this.touch = {
      x: undefined,
      y: undefined,
      onTouch: undefined,
      touching: false
    };
    this.device = {
      alpha: undefined, //rotation Z
      beta: undefined, //rotation Y
      gamma: undefined, //rotation X
      type: undefined
    };
  }

  getKeyboard() {
    document.addEventListener("keydown", e => {
      this.keyboard.keys[e.key.charCodeAt(0)] = true;
      this.keyboard.keyFunctions[e.key.charCodeAt(0)]();
    });
    document.addEventListener("keyup", e => {
      this.keyboard.keys[e.key.charCodeAt(0)] = false;
    });
  }

  getMouse() {
    document.addEventListener("mousemove", e => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    document.addEventListener("click", e => {
      this.mouse.onClick();
    });
    document.addEventListener("mousedown", e => {
      this.mouse.onMouseDown();
    });
    document.addEventListener("mouseup", e => {
      this.mouse.onMouseUp();
    });
    document.addEventListener("drag", e => {
      this.mouse.onMouseDrag();
    });
  }

  getTouch() {
    document.addEventListener("touchstart", e => {
      this.touch.touching = true;
      this.touch.x = e.touches[0].clientX;
      this.touch.y = e.touches[0].clientY;
      this.touch.onTouch();
    });
    document.addEventListener("touchend", e => {
      this.touch.touching = false;
    });
  }

  getDevice() {
    window.addEventListener("deviceorientation", e => {
      this.device.gamma = e.gamma;
      this.device.beta = e.beta;
      this.device.alpha = e.alpha;
    });
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      this.device.type = "mobile";
    }
  }
}

export class collisionCheck {
  constructor() {
    this.collisionPointX;
    this.collisionPointY;
  }

  circleCollision(circle, object) {
    if (object.radius !== undefined) {
      let distanceX = object.x - circle.x;
      let distanceY = object.y - circle.y;
      let radii = circle.radius + object.radius;
      this.collisionPointX =
        (circle.x * object.radius + object.x * circle.radius) /
        (circle.radius + object.radius);
      this.collisionPointY =
        (circle.y * object.radius + object.y * circle.radius) /
        (circle.radius + object.radius);
      if (distanceX * distanceX + distanceY * distanceY < radii * radii) {
        return true;
      } else {
        return false;
      }
    } else {
      if (object.pointA !== undefined) {
        let dist;
        const v1x = object.pointB.x - object.pointA.x;
        const v1y = object.pointB.y - object.pointA.y;
        const v2x = circle.x - object.pointA.x;
        const v2y = circle.y - object.pointA.y;
        const u = (v2x * v1x + v2y * v1y) / (v1y * v1y + v1x * v1x);
        if (u >= 0 && u <= 1) {
          dist =
            (object.pointA.x + v1x * u - circle.x) ** 2 +
            (object.pointA.y + v1y * u - circle.y) ** 2;
        } else {
          dist =
            u < 0
              ? (object.pointA.x - circle.x) ** 2 +
                (object.pointA.y - circle.y) ** 2
              : (object.pointB.x - circle.x) ** 2 +
                (object.pointB.y - circle.y) ** 2;
        }
        return dist < circle.radius * circle.radius;
      }
    }
  }
}

export function run(func) {
  let step = 0,
    lastRender = 0;
  function loop(timestamp) {
    step = timestamp - lastRender;
    lastRender = timestamp;
    func(Math.floor(1000 / step));
    window.requestAnimationFrame(loop);
  }
  lastRender = 0;
  window.requestAnimationFrame(loop);
}
