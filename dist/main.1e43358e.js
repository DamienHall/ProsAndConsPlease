// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/gameEngine.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Screen = exports.Mouse = exports.Keyboard = exports.Key = exports.Graphics = void 0;
exports.run = run;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// screen class
var Screen = /*#__PURE__*/function () {
  // initialization
  function Screen() {
    _classCallCheck(this, Screen);

    // create a canvas element
    this.canvas = document.createElement("canvas"); // get the drawing context of that canvas element

    this.context = this.canvas.getContext("2d"); // style the document so that the canvas sits in it properly

    document.body.style = "margin:0px; padding:0px; overflow:hidden";
  } // add the screen to the document


  _createClass(Screen, [{
    key: "add",
    value: function add(width, height) {
      // append the screen to the document
      document.body.appendChild(this.canvas); // style the canvas

      this.canvas.width = width !== undefined ? width : window.innerWidth;
      this.canvas.height = height !== undefined ? height : window.innerHeight;
      this.canvas.style = "border:none";
    } // allow auto resizing

  }, {
    key: "autoResize",
    value: function autoResize(arg) {
      var _this = this;

      if (arg) {
        window.addEventListener("resize", function (_) {
          _this.canvas.width = window.innerWidth;
          _this.canvas.height = window.innerHeight;
        });
      }
    } // set the size of the screen

  }, {
    key: "resize",
    value: function resize(width, height) {
      this.canvas.width = width;
      this.canvas.height = height;
    } // get function to get the inner canvas

  }, {
    key: "getCanvas",
    value: function getCanvas() {
      return this.canvas;
    } // get function to get width

  }, {
    key: "getWidth",
    value: function getWidth() {
      return this.canvas.width;
    } // get function to get height

  }, {
    key: "getHeight",
    value: function getHeight() {
      return this.canvas.height;
    } // get function to get the context of canvas

  }, {
    key: "getContext",
    value: function getContext() {
      return this.context;
    }
  }]);

  return Screen;
}(); // graphics class used to draw to the screen


exports.Screen = Screen;

var Graphics = /*#__PURE__*/function () {
  // initialization
  function Graphics(screen) {
    _classCallCheck(this, Graphics);

    this.screen = screen;
    this.context = screen.getContext();
  } // save the current context


  _createClass(Graphics, [{
    key: "saveContext",
    value: function saveContext() {
      this.context.save();
    } // restore the previously saved context

  }, {
    key: "restoreContext",
    value: function restoreContext() {
      this.context.restore();
    } // set the global composition operation

  }, {
    key: "setGCO",
    value: function setGCO(operation) {
      this.context.globalCompositeOperation = operation;
    } // set the fillstyle/strokestyle color

  }, {
    key: "setColor",
    value: function setColor(color) {
      this.context.fillStyle = color;
      this.context.strokeStyle = color;
    } // clear a portion of the screen

  }, {
    key: "clear",
    value: function clear(x, y, width, height) {
      this.context.clearRect(x, y, width, height);
    } // clear the entire screen

  }, {
    key: "clearScreen",
    value: function clearScreen() {
      this.clear(0, 0, this.screen.getWidth(), this.screen.getHeight());
    } // draw the background

  }, {
    key: "fillBackground",
    value: function fillBackground(color) {
      this.saveContext();
      this.setGCO("destination-over");
      this.setColor(color);
      this.rectangle(0, 0, this.screen.getWidth(), this.screen.getHeight());
      this.fill();
      this.restoreContext();
    } // draw a rectangle

  }, {
    key: "rectangle",
    value: function rectangle(x, y, width, height) {
      this.beginPath();
      this.context.rect(x, y, width, height);
      this.stroke();
    } // draw a square

  }, {
    key: "square",
    value: function square(x, y, size) {
      this.beginPath();
      this.rectangle(x, y, size, size);
      this.stroke();
    } // draw a circle

  }, {
    key: "circle",
    value: function circle(x, y, radius) {
      this.beginPath();
      this.context.arc(x, y, radius, 0, 2 * Math.PI);
      this.stroke();
      this.fill();
    } // draw a point

  }, {
    key: "point",
    value: function point(x, y, radius) {
      this.circle(x, y, radius);
      this.context.fill();
    } // draw a line

  }, {
    key: "line",
    value: function line() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      switch (args.length) {
        case 1:
          if (_typeof(args[0]) === "object") {
            this.beginPath();
            this.context.moveTo(args[0][0], args[0][1]);
            this.context.lineTo(args[0][2], args[0][3]);
            this.stroke();
          }

          break;

        case 2:
          if (_typeof(args[0]) === "object" && _typeof(args[1]) === "object") {
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
    } // set the size of the line

  }, {
    key: "setLineSize",
    value: function setLineSize(size) {
      this.context.lineWidth = size;
    } // fill the drawing

  }, {
    key: "fill",
    value: function fill(region) {
      this.context.fill(region);
    } // begin drawing path

  }, {
    key: "beginPath",
    value: function beginPath() {
      this.context.beginPath();
    } // stroke path

  }, {
    key: "stroke",
    value: function stroke() {
      this.context.stroke();
    } // draw an image

  }, {
    key: "image",
    value: function image(src) {
      var _this2 = this;

      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      var img = new Image();
      img.src = src;

      img.onload = function () {
        console.log(img.naturalHeight);
        console.log("hi");

        _this2.context.drawImage(img, args[0] !== undefined ? args[0] : 0, args[1] !== undefined ? args[1] : 0, args[2] !== undefined ? args[2] : img.naturalWidth, args[3] !== undefined ? args[3] : img.naturalHeight, args[4] !== undefined ? args[4] : 0, args[5] !== undefined ? args[5] : 0, args[6] !== undefined ? args[6] : img.naturalWidth, args[7] !== undefined ? args[7] : img.naturalHeight);
      };
    } // draw text

  }, {
    key: "text",
    value: function text() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      var _text = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";

      var size = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
      var color = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "White";
      var font = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "Arial";
      this.saveContext();
      this.setColor(color);
      this.context.font = "".concat(size, "px ").concat(font);
      this.context.fillText(_text, x, y);
      this.restoreContext();
    } // measure text

  }, {
    key: "measureText",
    value: function measureText(text) {
      return this.context.measureText(text);
    } // set the alignment of the text

  }, {
    key: "alignText",
    value: function alignText(alignment) {
      this.context.textAlign = alignment;
    } // set the font

  }, {
    key: "setFont",
    value: function setFont(font) {
      this.context.font = font;
    }
  }]);

  return Graphics;
}(); // keyboard class used to get keyboard input


exports.Graphics = Graphics;

var Keyboard = /*#__PURE__*/function () {
  function Keyboard() {
    var _this3 = this;

    _classCallCheck(this, Keyboard);

    this.keys = [];
    document.addEventListener("keydown", function (e) {
      if (_typeof(_this3.keys[e.key.charCodeAt(0)]) !== "object") {
        _this3.keys[e.key.charCodeAt(0)] = new Key(e.key.charCodeAt(0));

        _this3.keys[e.key.charCodeAt(0)].action.press();
      } else {
        _this3.keys[e.key.charCodeAt(0)].pressed = true;
        _this3.keys[e.key.charCodeAt(0)].released = false;
        _this3.keys[e.key.charCodeAt(0)].presses++;

        _this3.keys[e.key.charCodeAt(0)].action.press();
      }
    });
    document.addEventListener("keyup", function (e) {
      if (_typeof(_this3.keys[e.key.charCodeAt(0)]) !== "object") {
        _this3.keys[e.key.charCodeAt(0)] = new Key(e.key.charCodeAt(0));

        _this3.keys[e.key.charCodeAt(0)].action.release();
      } else {
        _this3.keys[e.key.charCodeAt(0)].pressed = false;
        _this3.keys[e.key.charCodeAt(0)].released = true;
        _this3.keys[e.key.charCodeAt(0)].releasses++;

        _this3.keys[e.key.charCodeAt(0)].action.release();
      }
    });
  }

  _createClass(Keyboard, [{
    key: "onPress",
    value: function onPress(character, func) {
      if (_typeof(this.keys[character.charCodeAt(0)]) !== "object") {
        this.keys[character.charCodeAt(0)] = new Key(character.charCodeAt(0));
      }

      this.keys[character.charCodeAt(0)].onPress(func);
    }
  }, {
    key: "onRelease",
    value: function onRelease(character, func) {
      if (_typeof(this.keys[character.charCodeAt(0)]) !== "object") {
        this.keys[character.charCodeAt(0)] = new Key(character.charCodeAt(0));
      }

      this.keys[character.charCodeAt(0)].onRelease(func);
    }
  }]);

  return Keyboard;
}(); // key class used for managing Key presses


exports.Keyboard = Keyboard;

var Key = /*#__PURE__*/function () {
  function Key() {
    var charCode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    _classCallCheck(this, Key);

    this.pressed = true;
    this.released = false;
    this.presses = 1;
    this.releases = 0;
    this.action = {
      press: function press() {},
      release: function release() {}
    };
    this.charCode = charCode;
  }

  _createClass(Key, [{
    key: "onPress",
    value: function onPress() {
      var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.action.press = func;
    }
  }, {
    key: "onRelease",
    value: function onRelease() {
      var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      this.action.release = func;
    }
  }]);

  return Key;
}(); // mouse class used for getting mouse input


exports.Key = Key;

var Mouse = /*#__PURE__*/function () {
  function Mouse() {
    var _this4 = this;

    _classCallCheck(this, Mouse);

    this.x = 0;
    this.y = 0;
    this.action = {
      onMove: function onMove() {},
      onClick: function onClick() {},
      onMouseDown: function onMouseDown() {},
      onMouseUp: function onMouseUp() {},
      onMouseDrag: function onMouseDrag() {}
    };
    document.addEventListener("mousemove", function (e) {
      _this4.x = e.clientX;
      _this4.y = e.clientY;

      _this4.action.onMove();
    });
    document.addEventListener("click", function (e) {
      _this4.action.onClick();
    });
    document.addEventListener("mousedown", function (e) {
      _this4.action.onMouseDown();
    });
    document.addEventListener("mouseup", function (e) {
      _this4.action.onMouseUp();
    });
    document.addEventListener("drag", function (e) {
      _this4.action.onMouseDrag();
    });
  }

  _createClass(Mouse, [{
    key: "onMove",
    value: function onMove(func) {
      this.action.onMove = func;
    }
  }, {
    key: "onClick",
    value: function onClick(func) {
      this.action.onClick = func;
    }
  }, {
    key: "onMouseDown",
    value: function onMouseDown(func) {
      this.action.onMouseDown = func;
    }
  }, {
    key: "onMouseUp",
    value: function onMouseUp(func) {
      this.action.onMouseUp = func;
    }
  }, {
    key: "onMouseDrag",
    value: function onMouseDrag(func) {
      this.action.onMouseDrag = func;
    }
  }]);

  return Mouse;
}();

exports.Mouse = Mouse;

function run(func) {
  var lastTime = 0;
  var timer = 0;
  var fps = 0;

  function loop(timeStamp) {
    var deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    fps = Math.floor(deltaTime);

    if (timer > 1000 / 60) {
      func(fps);
    } else {
      timer += deltaTime;
    }

    window.requestAnimationFrame(loop);
  }

  window.requestAnimationFrame(loop);
}
},{}],"src/gui.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = exports.Panel = exports.Button = void 0;

var _gameEngine = require("./gameEngine");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Text = /*#__PURE__*/function () {
  function Text() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var textContent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "";
    var fontSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;
    var font = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "Arial";
    var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "White";

    _classCallCheck(this, Text);

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
        left: null,
        right: null,
        top: null,
        bottom: null
      }
    };
  }

  _createClass(Text, [{
    key: "setX",
    value: function setX(x) {
      this.settings.position.x = x;
    }
  }, {
    key: "setY",
    value: function setY(y) {
      this.settings.position.y = y;
    }
  }, {
    key: "setPos",
    value: function setPos(x, y) {
      this.setX(x);
      this.setY(y);
    }
  }, {
    key: "render",
    value: function render(graphics) {
      graphics.text(this.settings.position.x, this.settings.position.y, this.settings.textContent, this.settings.fontSize, this.settings.color, this.settings.font);
    }
  }]);

  return Text;
}();

exports.Text = Text;

var Button = /*#__PURE__*/function () {
  function Button() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var text = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "";
    var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "White";

    _classCallCheck(this, Button);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.color = color;
  }

  _createClass(Button, [{
    key: "render",
    value: function render(graphics) {
      graphics.saveContext();
      graphics.setColor(this.color);
      graphics.setLineSize(10);
      graphics.rectangle(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
      graphics.alignText("center");
      graphics.setColor("white");
      graphics.text(this.x, this.y + 35, this.text, 100);
      graphics.restoreContext();
    }
  }, {
    key: "getBounds",
    value: function getBounds() {
      return [this.x - this.width / 2, this.y - this.height / 2, this.x + this.width / 2, this.y + this.height / 2];
    }
  }, {
    key: "setColor",
    value: function setColor(color) {
      this.color = color;
    }
  }]);

  return Button;
}();

exports.Button = Button;

var Panel = function Panel() {
  _classCallCheck(this, Panel);
};

exports.Panel = Panel;
},{"./gameEngine":"src/gameEngine.js"}],"src/mainMenu.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mainMenu = void 0;

var _gameEngine = require("./gameEngine");

var _gui = require("./gui");

var keyboard = new _gameEngine.Keyboard();
var mouse = new _gameEngine.Mouse();
var r = 100;
var title = new _gui.Text(window.innerWidth / 2, window.innerHeight / 4, "Pros and Cons Please", 100);
var startButton = new _gui.Button(window.innerWidth / 2, window.innerHeight / 2, 300, 100, "Start");
mouse.onClick(function () {
  var b = startButton.getBounds();

  if (b[0] <= mouse.x && mouse.x <= b[2] && b[1] <= mouse.y && mouse.y <= b[3]) {
    mainMenu.transition = true;
  }
});
var mainMenu = {
  mainPage: function mainPage(graphics) {
    graphics.clearScreen();
    graphics.fillBackground("black");
    graphics.alignText("center");
    title.render(graphics);
    var b = startButton.getBounds();

    if (b[0] <= mouse.x && mouse.x <= b[2] && b[1] <= mouse.y && mouse.y <= b[3]) {
      startButton.setColor("Blue");
    } else {
      startButton.setColor("White");
    }

    startButton.render(graphics);

    if (this.transition) {
      graphics.saveContext();
      graphics.setGCO("destination-in");
      graphics.circle(window.innerWidth / 2, window.innerHeight / 2, r);
      graphics.fill();
      graphics.restoreContext();
    }
  },
  transition: false
};
exports.mainMenu = mainMenu;
},{"./gameEngine":"src/gameEngine.js","./gui":"src/gui.js"}],"src/main.js":[function(require,module,exports) {
"use strict";

var Engine = _interopRequireWildcard(require("./gameEngine"));

var _mainMenu = require("./mainMenu");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

window.onload = function () {
  var screen = new Engine.Screen();
  var graphics = new Engine.Graphics(screen);
  var keyboard = new Engine.Keyboard();
  var mouse = new Engine.Mouse(); // 0 = main menu
  // 1 = game state

  var state = 0;
  screen.add();
  Engine.run(function () {
    switch (state) {
      case 0:
        _mainMenu.mainMenu.mainPage(graphics);

        break;
    }
  });
};
},{"./gameEngine":"src/gameEngine.js","./mainMenu":"src/mainMenu.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "38171" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/main.js"], null)
//# sourceMappingURL=/main.1e43358e.js.map