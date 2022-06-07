/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameLogic.ts":
/*!**************************!*\
  !*** ./src/gameLogic.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var GameState_1 = __importDefault(__webpack_require__(/*! ./utils/Factories/GameState */ "./src/utils/Factories/GameState.ts"));
var levels_1 = __importDefault(__webpack_require__(/*! ./utils/levels */ "./src/utils/levels.ts"));
var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var spritesState = {
    frameCount: 0,
    currIdx: 0
};
var levelOne = levels_1.default.one(canvas.height);
var gameState = (0, GameState_1.default)(levelOne);
function draw() {
    var c = canvas.getContext('2d');
    if (!c)
        return;
    var width = canvas.width, height = canvas.height;
    c.clearRect(0, 0, width, height);
    c.fillStyle = '#B33B44';
    c.fillRect(0, 0, width, height);
    c.fillStyle = 'black';
    c.fillRect(0, 0, width, 160);
    //   drawPlatforms(c);
    gameState.player.draw(c, spritesState.currIdx);
    //   drawEnemies(c);
}


/***/ }),

/***/ "./src/utils/Factories/Enemy.ts":
/*!**************************************!*\
  !*** ./src/utils/Factories/Enemy.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroundEnemy = void 0;
function Enemy(position, size) {
    return {
        x: position.x,
        y: position.y,
        velocity: {
            x: 0,
            y: 0
        },
        direction: 'right',
        currAction: 'idle',
        get width() {
            return size.width;
        },
        get height() {
            return size.height;
        }
    };
}
exports["default"] = Enemy;
function GroundEnemy(position) {
    return __assign(__assign({}, Enemy(position, { height: 95, width: 95 })), { type: 'ground' });
}
exports.GroundEnemy = GroundEnemy;


/***/ }),

/***/ "./src/utils/Factories/GameState.ts":
/*!******************************************!*\
  !*** ./src/utils/Factories/GameState.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Player_1 = __importDefault(__webpack_require__(/*! ./Player */ "./src/utils/Factories/Player.ts"));
function GameState(level) {
    var player = (0, Player_1.default)();
    return {
        get player() {
            return player;
        },
        get platforms() {
            return level.platforms;
        },
        get enemies() {
            return level.enemies;
        }
    };
}
exports["default"] = GameState;


/***/ }),

/***/ "./src/utils/Factories/Level.ts":
/*!**************************************!*\
  !*** ./src/utils/Factories/Level.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, exports) {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function Level(platforms, enemies) {
    return {
        platforms: platforms,
        enemies: enemies
    };
}
exports["default"] = Level;


/***/ }),

/***/ "./src/utils/Factories/Platform.ts":
/*!*****************************************!*\
  !*** ./src/utils/Factories/Platform.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FloorPlatform = exports.Platform5 = exports.Platform4 = exports.Platform3 = exports.Platform2 = exports.Platform1 = void 0;
var Platform01_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Environments/Platforms/Platform01.png */ "./src/assets/Environments/Platforms/Platform01.png"));
var Platform02_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Environments/Platforms/Platform02.png */ "./src/assets/Environments/Platforms/Platform02.png"));
var Platform03_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Environments/Platforms/Platform03.png */ "./src/assets/Environments/Platforms/Platform03.png"));
var Platform04_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Environments/Platforms/Platform04.png */ "./src/assets/Environments/Platforms/Platform04.png"));
var Platform05_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Environments/Platforms/Platform05.png */ "./src/assets/Environments/Platforms/Platform05.png"));
var misc_1 = __webpack_require__(/*! ../misc */ "./src/utils/misc.ts");
function Platform(position, size, imageSrc) {
    var image = new Image();
    if (imageSrc)
        image.src = imageSrc;
    var x = position.x, y = position.y;
    var height = size.height;
    var width = size.width;
    var velocityX = 0;
    return {
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        get velocityX() {
            return velocityX;
        },
        get width() {
            return width;
        },
        get height() {
            return height;
        },
        get image() {
            return image;
        },
        updateXPosition: function () {
            x += velocityX;
        },
        updateVelocityX: function (num) {
            velocityX = num;
        }
    };
}
function Platform1(position) {
    return Platform(position, { height: 47, width: 99 }, Platform01_png_1.default);
}
exports.Platform1 = Platform1;
function Platform2(position) {
    return Platform(position, { height: 36, width: 90 }, Platform02_png_1.default);
}
exports.Platform2 = Platform2;
function Platform3(position) {
    return Platform(position, { height: 47, width: 137 }, Platform03_png_1.default);
}
exports.Platform3 = Platform3;
function Platform4(position) {
    return Platform(position, { height: 172, width: 69 }, Platform04_png_1.default);
}
exports.Platform4 = Platform4;
function Platform5(position) {
    return Platform(position, { height: 64, width: 64 }, Platform05_png_1.default);
}
exports.Platform5 = Platform5;
function FloorPlatform(position, width) {
    var beginImg = new Image();
    beginImg.src = Platform04_png_1.default;
    var endImg = new Image();
    endImg.src = Platform04_png_1.default;
    return __assign(__assign({}, Platform(position, { width: width, height: 172 })), { type: 'floor', image: (0, misc_1.createImage)(Platform04_png_1.default) });
}
exports.FloorPlatform = FloorPlatform;


/***/ }),

/***/ "./src/utils/Factories/Player.ts":
/*!***************************************!*\
  !*** ./src/utils/Factories/Player.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var playerSprites_1 = __importDefault(__webpack_require__(/*! ../sprites/playerSprites */ "./src/utils/sprites/playerSprites.ts"));
var bulletSprites_1 = __importDefault(__webpack_require__(/*! ../sprites/bulletSprites */ "./src/utils/sprites/bulletSprites.ts"));
var gunSprites_1 = __importDefault(__webpack_require__(/*! ../sprites/gunSprites */ "./src/utils/sprites/gunSprites.ts"));
function Player() {
    var x = 100;
    var y = 100;
    var velocity = {
        x: 0,
        y: 0
    };
    var height = 50;
    var width = 45;
    var bullets = [];
    var currAction = 'idle';
    return {
        get x() {
            return x;
        },
        get y() {
            return y;
        },
        get velocity() {
            return velocity;
        },
        get height() {
            return height;
        },
        get width() {
            return width;
        },
        get bullets() {
            return bullets;
        },
        get currAction() {
            return currAction;
        },
        updatePosition: function () {
            x += velocity.x;
            y += velocity.y;
        },
        updateVelocity: function (axis, amount) {
            velocity[axis] = amount;
        },
        updateAction: function (action) {
            currAction = action;
        },
        draw: function (c, currIdx) {
            // draw player
            c.drawImage(playerSprites_1.default[currAction][currIdx], x, y, 59, height);
            // draw gun
            var gunSprite = currAction === 'shoot'
                ? gunSprites_1.default[currAction].sides[currIdx]
                : gunSprites_1.default[currAction][currIdx];
            c.drawImage(gunSprite, x + width - 20, y - 13, 50, 94);
            // draw bullets
            bullets.forEach(function (b) {
                return c.drawImage(bulletSprites_1.default.idle[b.spriteIdx], b.x, b.y);
            });
        }
    };
}
exports["default"] = Player;


/***/ }),

/***/ "./src/utils/levels.ts":
/*!*****************************!*\
  !*** ./src/utils/levels.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var Level_1 = __importDefault(__webpack_require__(/*! ./Factories/Level */ "./src/utils/Factories/Level.ts"));
var Platform_1 = __webpack_require__(/*! ./Factories/Platform */ "./src/utils/Factories/Platform.ts");
var Enemy_1 = __webpack_require__(/*! ./Factories/Enemy */ "./src/utils/Factories/Enemy.ts");
exports["default"] = {
    one: function (canvasHeight) {
        return (0, Level_1.default)([
            (0, Platform_1.FloorPlatform)({ x: -10, y: canvasHeight - 168 }, 800),
            (0, Platform_1.FloorPlatform)({ x: 960, y: canvasHeight - 168 }, 800)
        ], [(0, Enemy_1.GroundEnemy)({ x: 500, y: 200 })]);
    }
};


/***/ }),

/***/ "./src/utils/misc.ts":
/*!***************************!*\
  !*** ./src/utils/misc.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports) {


var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createImage = exports.getPlatformsToFillUpAxis = void 0;
function getPlatformsToFillUpAxis(Platform, startPos, axis, axisLength) {
    var basePlatform = Platform({ x: 0, y: 0 });
    var platformLength = axis === 'x' ? basePlatform.width : basePlatform.height;
    var noOfPlatformsToFillUpCanvas = Math.ceil(axisLength / platformLength);
    return Array(noOfPlatformsToFillUpCanvas)
        .fill(Platform(startPos))
        .map(function (platform, i) {
        if (i === 0)
            return platform;
        return axis === 'y'
            ? __assign(__assign({}, platform), { y: platform.y + platform.height * i }) : __assign(__assign({}, platform), { x: platform.x * (i + 1) + platform.width * i });
    });
}
exports.getPlatformsToFillUpAxis = getPlatformsToFillUpAxis;
function createImage(src) {
    var image = new Image();
    image.src = src;
    return image;
}
exports.createImage = createImage;


/***/ }),

/***/ "./src/utils/sprites/bulletSprites.ts":
/*!********************************************!*\
  !*** ./src/utils/sprites/bulletSprites.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var misc_1 = __webpack_require__(/*! ../misc */ "./src/utils/misc.ts");
var Bullet_Idle_01_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Bullet/Idle/Bullet_Idle_01.png */ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_01.png"));
var Bullet_Idle_02_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Bullet/Idle/Bullet_Idle_02.png */ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_02.png"));
var Bullet_Idle_03_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Bullet/Idle/Bullet_Idle_03.png */ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_03.png"));
var Bullet_Idle_04_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Bullet/Idle/Bullet_Idle_04.png */ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_04.png"));
var Bullet_Idle_05_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Bullet/Idle/Bullet_Idle_05.png */ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_05.png"));
var Bullet_Idle_06_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Bullet/Idle/Bullet_Idle_06.png */ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_06.png"));
var Bullet_Idle_07_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Bullet/Idle/Bullet_Idle_07.png */ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_07.png"));
var idle = [
    (0, misc_1.createImage)(Bullet_Idle_01_png_1.default),
    (0, misc_1.createImage)(Bullet_Idle_02_png_1.default),
    (0, misc_1.createImage)(Bullet_Idle_03_png_1.default),
    (0, misc_1.createImage)(Bullet_Idle_04_png_1.default),
    (0, misc_1.createImage)(Bullet_Idle_05_png_1.default),
    (0, misc_1.createImage)(Bullet_Idle_06_png_1.default),
    (0, misc_1.createImage)(Bullet_Idle_07_png_1.default)
];
exports["default"] = { idle: idle };


/***/ }),

/***/ "./src/utils/sprites/gunSprites.ts":
/*!*****************************************!*\
  !*** ./src/utils/sprites/gunSprites.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var misc_1 = __webpack_require__(/*! ../misc */ "./src/utils/misc.ts");
var Idle_Gun01_01_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Idle/Idle_Gun01_01.png */ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_01.png"));
var Idle_Gun01_02_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Idle/Idle_Gun01_02.png */ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_02.png"));
var Idle_Gun01_03_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Idle/Idle_Gun01_03.png */ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_03.png"));
var Idle_Gun01_04_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Idle/Idle_Gun01_04.png */ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_04.png"));
var Idle_Gun01_05_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Idle/Idle_Gun01_05.png */ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_05.png"));
var Idle_Gun01_06_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Idle/Idle_Gun01_06.png */ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_06.png"));
var Idle_Gun01_07_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Idle/Idle_Gun01_07.png */ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_07.png"));
var Idle_Gun01_08_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Idle/Idle_Gun01_08.png */ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_08.png"));
var Run_Gun01_01_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Run/Run_Gun01_01.png */ "./src/assets/Gun01/Gun01/Run/Run_Gun01_01.png"));
var Run_Gun01_02_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Run/Run_Gun01_02.png */ "./src/assets/Gun01/Gun01/Run/Run_Gun01_02.png"));
var Run_Gun01_03_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Run/Run_Gun01_03.png */ "./src/assets/Gun01/Gun01/Run/Run_Gun01_03.png"));
var Run_Gun01_04_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Run/Run_Gun01_04.png */ "./src/assets/Gun01/Gun01/Run/Run_Gun01_04.png"));
var Run_Gun01_05_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Run/Run_Gun01_05.png */ "./src/assets/Gun01/Gun01/Run/Run_Gun01_05.png"));
var Run_Gun01_06_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Run/Run_Gun01_06.png */ "./src/assets/Gun01/Gun01/Run/Run_Gun01_06.png"));
var Run_Gun01_07_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Run/Run_Gun01_07.png */ "./src/assets/Gun01/Gun01/Run/Run_Gun01_07.png"));
var Run_Gun01_08_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/Run/Run_Gun01_08.png */ "./src/assets/Gun01/Gun01/Run/Run_Gun01_08.png"));
var ShootDown_Gun01_01_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_01.png */ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_01.png"));
var ShootDown_Gun01_02_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_02.png */ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_02.png"));
var ShootDown_Gun01_03_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_03.png */ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_03.png"));
var ShootDown_Gun01_04_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_04.png */ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_04.png"));
var ShootDown_Gun01_05_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_05.png */ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_05.png"));
var ShootDown_Gun01_06_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_06.png */ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_06.png"));
var ShootSides_Gun01_01_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_01.png */ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_01.png"));
var ShootSides_Gun01_02_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_02.png */ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_02.png"));
var ShootSides_Gun01_03_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_03.png */ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_03.png"));
var ShootSides_Gun01_04_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_04.png */ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_04.png"));
var ShootSides_Gun01_05_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_05.png */ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_05.png"));
var ShootSides_Gun01_06_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_06.png */ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_06.png"));
var ShootUp_Gun01_01_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_01.png */ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_01.png"));
var ShootUp_Gun01_02_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_02.png */ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_02.png"));
var ShootUp_Gun01_03_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_03.png */ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_03.png"));
var ShootUp_Gun01_04_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_04.png */ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_04.png"));
var ShootUp_Gun01_05_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_05.png */ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_05.png"));
var ShootUp_Gun01_06_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_06.png */ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_06.png"));
var idle = [
    (0, misc_1.createImage)(Idle_Gun01_01_png_1.default),
    (0, misc_1.createImage)(Idle_Gun01_02_png_1.default),
    (0, misc_1.createImage)(Idle_Gun01_03_png_1.default),
    (0, misc_1.createImage)(Idle_Gun01_04_png_1.default),
    (0, misc_1.createImage)(Idle_Gun01_05_png_1.default),
    (0, misc_1.createImage)(Idle_Gun01_06_png_1.default),
    (0, misc_1.createImage)(Idle_Gun01_07_png_1.default),
    (0, misc_1.createImage)(Idle_Gun01_08_png_1.default)
];
var run = [
    (0, misc_1.createImage)(Run_Gun01_01_png_1.default),
    (0, misc_1.createImage)(Run_Gun01_02_png_1.default),
    (0, misc_1.createImage)(Run_Gun01_03_png_1.default),
    (0, misc_1.createImage)(Run_Gun01_04_png_1.default),
    (0, misc_1.createImage)(Run_Gun01_05_png_1.default),
    (0, misc_1.createImage)(Run_Gun01_06_png_1.default),
    (0, misc_1.createImage)(Run_Gun01_07_png_1.default),
    (0, misc_1.createImage)(Run_Gun01_08_png_1.default)
];
var shoot = {
    up: [
        (0, misc_1.createImage)(ShootUp_Gun01_01_png_1.default),
        (0, misc_1.createImage)(ShootUp_Gun01_02_png_1.default),
        (0, misc_1.createImage)(ShootUp_Gun01_03_png_1.default),
        (0, misc_1.createImage)(ShootUp_Gun01_04_png_1.default),
        (0, misc_1.createImage)(ShootUp_Gun01_05_png_1.default),
        (0, misc_1.createImage)(ShootUp_Gun01_06_png_1.default)
    ],
    sides: [
        (0, misc_1.createImage)(ShootSides_Gun01_01_png_1.default),
        (0, misc_1.createImage)(ShootSides_Gun01_02_png_1.default),
        (0, misc_1.createImage)(ShootSides_Gun01_03_png_1.default),
        (0, misc_1.createImage)(ShootSides_Gun01_04_png_1.default),
        (0, misc_1.createImage)(ShootSides_Gun01_05_png_1.default),
        (0, misc_1.createImage)(ShootSides_Gun01_06_png_1.default)
    ],
    down: [
        (0, misc_1.createImage)(ShootDown_Gun01_01_png_1.default),
        (0, misc_1.createImage)(ShootDown_Gun01_02_png_1.default),
        (0, misc_1.createImage)(ShootDown_Gun01_03_png_1.default),
        (0, misc_1.createImage)(ShootDown_Gun01_04_png_1.default),
        (0, misc_1.createImage)(ShootDown_Gun01_05_png_1.default),
        (0, misc_1.createImage)(ShootDown_Gun01_06_png_1.default)
    ]
};
exports["default"] = { idle: idle, run: run, shoot: shoot };


/***/ }),

/***/ "./src/utils/sprites/playerSprites.ts":
/*!********************************************!*\
  !*** ./src/utils/sprites/playerSprites.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
var misc_1 = __webpack_require__(/*! ../misc */ "./src/utils/misc.ts");
var Idle_01_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Idle/Idle_01.png */ "./src/assets/Player/Idle/Idle_01.png"));
var Idle_02_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Idle/Idle_02.png */ "./src/assets/Player/Idle/Idle_02.png"));
var Idle_03_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Idle/Idle_03.png */ "./src/assets/Player/Idle/Idle_03.png"));
var Idle_04_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Idle/Idle_04.png */ "./src/assets/Player/Idle/Idle_04.png"));
var Idle_05_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Idle/Idle_05.png */ "./src/assets/Player/Idle/Idle_05.png"));
var Idle_06_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Idle/Idle_06.png */ "./src/assets/Player/Idle/Idle_06.png"));
var Idle_07_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Idle/Idle_07.png */ "./src/assets/Player/Idle/Idle_07.png"));
var Idle_08_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Idle/Idle_08.png */ "./src/assets/Player/Idle/Idle_08.png"));
var Run_01_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Run/Run_01.png */ "./src/assets/Player/Run/Run_01.png"));
var Run_02_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Run/Run_02.png */ "./src/assets/Player/Run/Run_02.png"));
var Run_03_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Run/Run_03.png */ "./src/assets/Player/Run/Run_03.png"));
var Run_04_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Run/Run_04.png */ "./src/assets/Player/Run/Run_04.png"));
var Run_05_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Run/Run_05.png */ "./src/assets/Player/Run/Run_05.png"));
var Run_06_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Run/Run_06.png */ "./src/assets/Player/Run/Run_06.png"));
var Run_07_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Run/Run_07.png */ "./src/assets/Player/Run/Run_07.png"));
var Run_08_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Run/Run_08.png */ "./src/assets/Player/Run/Run_08.png"));
var Shoot_01_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Shoot/Shoot_01.png */ "./src/assets/Player/Shoot/Shoot_01.png"));
var Shoot_02_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Shoot/Shoot_02.png */ "./src/assets/Player/Shoot/Shoot_02.png"));
var Shoot_03_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Shoot/Shoot_03.png */ "./src/assets/Player/Shoot/Shoot_03.png"));
var Shoot_04_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Shoot/Shoot_04.png */ "./src/assets/Player/Shoot/Shoot_04.png"));
var Shoot_05_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Shoot/Shoot_05.png */ "./src/assets/Player/Shoot/Shoot_05.png"));
var Shoot_06_png_1 = __importDefault(__webpack_require__(/*! ../../assets/Player/Shoot/Shoot_06.png */ "./src/assets/Player/Shoot/Shoot_06.png"));
var idle = [
    (0, misc_1.createImage)(Idle_01_png_1.default),
    (0, misc_1.createImage)(Idle_02_png_1.default),
    (0, misc_1.createImage)(Idle_03_png_1.default),
    (0, misc_1.createImage)(Idle_04_png_1.default),
    (0, misc_1.createImage)(Idle_05_png_1.default),
    (0, misc_1.createImage)(Idle_06_png_1.default),
    (0, misc_1.createImage)(Idle_07_png_1.default),
    (0, misc_1.createImage)(Idle_08_png_1.default)
];
var run = [
    (0, misc_1.createImage)(Run_01_png_1.default),
    (0, misc_1.createImage)(Run_02_png_1.default),
    (0, misc_1.createImage)(Run_03_png_1.default),
    (0, misc_1.createImage)(Run_04_png_1.default),
    (0, misc_1.createImage)(Run_05_png_1.default),
    (0, misc_1.createImage)(Run_06_png_1.default),
    (0, misc_1.createImage)(Run_07_png_1.default),
    (0, misc_1.createImage)(Run_08_png_1.default)
];
var shoot = [
    (0, misc_1.createImage)(Shoot_01_png_1.default),
    (0, misc_1.createImage)(Shoot_02_png_1.default),
    (0, misc_1.createImage)(Shoot_03_png_1.default),
    (0, misc_1.createImage)(Shoot_04_png_1.default),
    (0, misc_1.createImage)(Shoot_05_png_1.default),
    (0, misc_1.createImage)(Shoot_06_png_1.default)
];
exports["default"] = {
    idle: idle,
    run: run,
    shoot: shoot
};


/***/ }),

/***/ "./src/assets/Environments/Platforms/Platform01.png":
/*!**********************************************************!*\
  !*** ./src/assets/Environments/Platforms/Platform01.png ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "65ebbb04d1f7567eaacb.png";

/***/ }),

/***/ "./src/assets/Environments/Platforms/Platform02.png":
/*!**********************************************************!*\
  !*** ./src/assets/Environments/Platforms/Platform02.png ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8790eb08aac739d84d3b.png";

/***/ }),

/***/ "./src/assets/Environments/Platforms/Platform03.png":
/*!**********************************************************!*\
  !*** ./src/assets/Environments/Platforms/Platform03.png ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "09d823003f5cf46f3aaa.png";

/***/ }),

/***/ "./src/assets/Environments/Platforms/Platform04.png":
/*!**********************************************************!*\
  !*** ./src/assets/Environments/Platforms/Platform04.png ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5b0900595bc000db3e32.png";

/***/ }),

/***/ "./src/assets/Environments/Platforms/Platform05.png":
/*!**********************************************************!*\
  !*** ./src/assets/Environments/Platforms/Platform05.png ***!
  \**********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3966c7351437c3156172.png";

/***/ }),

/***/ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_01.png":
/*!*********************************************************!*\
  !*** ./src/assets/Gun01/Bullet/Idle/Bullet_Idle_01.png ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cefa43864eb0ee5daf67.png";

/***/ }),

/***/ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_02.png":
/*!*********************************************************!*\
  !*** ./src/assets/Gun01/Bullet/Idle/Bullet_Idle_02.png ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e97d06224fc01eadd1fb.png";

/***/ }),

/***/ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_03.png":
/*!*********************************************************!*\
  !*** ./src/assets/Gun01/Bullet/Idle/Bullet_Idle_03.png ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ee9be6368e04dd80a5cd.png";

/***/ }),

/***/ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_04.png":
/*!*********************************************************!*\
  !*** ./src/assets/Gun01/Bullet/Idle/Bullet_Idle_04.png ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "c157e9dd88b49b8d3c19.png";

/***/ }),

/***/ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_05.png":
/*!*********************************************************!*\
  !*** ./src/assets/Gun01/Bullet/Idle/Bullet_Idle_05.png ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b581494c04d66e1c69a5.png";

/***/ }),

/***/ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_06.png":
/*!*********************************************************!*\
  !*** ./src/assets/Gun01/Bullet/Idle/Bullet_Idle_06.png ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "93d739699a46f8b4b521.png";

/***/ }),

/***/ "./src/assets/Gun01/Bullet/Idle/Bullet_Idle_07.png":
/*!*********************************************************!*\
  !*** ./src/assets/Gun01/Bullet/Idle/Bullet_Idle_07.png ***!
  \*********************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "957ff10ef9c5eeceefdd.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_01.png":
/*!*******************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Idle/Idle_Gun01_01.png ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fc871120ce50ddb56708.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_02.png":
/*!*******************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Idle/Idle_Gun01_02.png ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fc871120ce50ddb56708.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_03.png":
/*!*******************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Idle/Idle_Gun01_03.png ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fc871120ce50ddb56708.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_04.png":
/*!*******************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Idle/Idle_Gun01_04.png ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aa927d220bc8c7e26c14.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_05.png":
/*!*******************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Idle/Idle_Gun01_05.png ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "aa927d220bc8c7e26c14.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_06.png":
/*!*******************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Idle/Idle_Gun01_06.png ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4d80be1ec20b123a14df.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_07.png":
/*!*******************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Idle/Idle_Gun01_07.png ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4d80be1ec20b123a14df.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Idle/Idle_Gun01_08.png":
/*!*******************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Idle/Idle_Gun01_08.png ***!
  \*******************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4d80be1ec20b123a14df.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Run/Run_Gun01_01.png":
/*!*****************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Run/Run_Gun01_01.png ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fc871120ce50ddb56708.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Run/Run_Gun01_02.png":
/*!*****************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Run/Run_Gun01_02.png ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "b33d6f7068ccba6df9ae.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Run/Run_Gun01_03.png":
/*!*****************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Run/Run_Gun01_03.png ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "82c3d671bc434eec13e6.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Run/Run_Gun01_04.png":
/*!*****************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Run/Run_Gun01_04.png ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "db32fe51a0e9bd1c2bf2.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Run/Run_Gun01_05.png":
/*!*****************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Run/Run_Gun01_05.png ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fc871120ce50ddb56708.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Run/Run_Gun01_06.png":
/*!*****************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Run/Run_Gun01_06.png ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "95113c169d1ecffd7c01.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Run/Run_Gun01_07.png":
/*!*****************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Run/Run_Gun01_07.png ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "2fc1662590237b529ea7.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/Run/Run_Gun01_08.png":
/*!*****************************************************!*\
  !*** ./src/assets/Gun01/Gun01/Run/Run_Gun01_08.png ***!
  \*****************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d4eb2443ab93eed29d92.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_01.png":
/*!*****************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_01.png ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "124863424786c049efb8.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_02.png":
/*!*****************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_02.png ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "e577d9ad32679c3acf56.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_03.png":
/*!*****************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_03.png ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "971613a69c6bf788cf9d.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_04.png":
/*!*****************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_04.png ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "81b097c23cb7c740d1ec.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_05.png":
/*!*****************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_05.png ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a866126c386e279f2193.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_06.png":
/*!*****************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootDown/ShootDown_Gun01_06.png ***!
  \*****************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4c524ef55dbff7bced80.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_01.png":
/*!*******************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_01.png ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fc871120ce50ddb56708.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_02.png":
/*!*******************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_02.png ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "db32fe51a0e9bd1c2bf2.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_03.png":
/*!*******************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_03.png ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "127d1e09e1b89ea6e19b.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_04.png":
/*!*******************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_04.png ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "eb4f1affb2a224aad8be.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_05.png":
/*!*******************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_05.png ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "89881f22a510fbc2c626.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_06.png":
/*!*******************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootSides/ShootSides_Gun01_06.png ***!
  \*******************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "db32fe51a0e9bd1c2bf2.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_01.png":
/*!*************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_01.png ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cfd48e847a3db6ff1a80.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_02.png":
/*!*************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_02.png ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "88266008a7d6df771f53.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_03.png":
/*!*************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_03.png ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "3c3060cac91db4581616.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_04.png":
/*!*************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_04.png ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "ce6979b1d3f774579674.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_05.png":
/*!*************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_05.png ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "9104d1af49dbce2ec1a5.png";

/***/ }),

/***/ "./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_06.png":
/*!*************************************************************!*\
  !*** ./src/assets/Gun01/Gun01/ShootUp/ShootUp_Gun01_06.png ***!
  \*************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "eb1360f2c4b4b7514076.png";

/***/ }),

/***/ "./src/assets/Player/Idle/Idle_01.png":
/*!********************************************!*\
  !*** ./src/assets/Player/Idle/Idle_01.png ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "34791a6ffc698d15f85f.png";

/***/ }),

/***/ "./src/assets/Player/Idle/Idle_02.png":
/*!********************************************!*\
  !*** ./src/assets/Player/Idle/Idle_02.png ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "34791a6ffc698d15f85f.png";

/***/ }),

/***/ "./src/assets/Player/Idle/Idle_03.png":
/*!********************************************!*\
  !*** ./src/assets/Player/Idle/Idle_03.png ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "82202b9735df49cd7899.png";

/***/ }),

/***/ "./src/assets/Player/Idle/Idle_04.png":
/*!********************************************!*\
  !*** ./src/assets/Player/Idle/Idle_04.png ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "a6321b7c46202dec4ac8.png";

/***/ }),

/***/ "./src/assets/Player/Idle/Idle_05.png":
/*!********************************************!*\
  !*** ./src/assets/Player/Idle/Idle_05.png ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5d7677f2f364fe1718a1.png";

/***/ }),

/***/ "./src/assets/Player/Idle/Idle_06.png":
/*!********************************************!*\
  !*** ./src/assets/Player/Idle/Idle_06.png ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4d3e6d5596dba5275c7f.png";

/***/ }),

/***/ "./src/assets/Player/Idle/Idle_07.png":
/*!********************************************!*\
  !*** ./src/assets/Player/Idle/Idle_07.png ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "5684d41fdc16cd6b18c9.png";

/***/ }),

/***/ "./src/assets/Player/Idle/Idle_08.png":
/*!********************************************!*\
  !*** ./src/assets/Player/Idle/Idle_08.png ***!
  \********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "af58a3ef8459e6b4c75e.png";

/***/ }),

/***/ "./src/assets/Player/Run/Run_01.png":
/*!******************************************!*\
  !*** ./src/assets/Player/Run/Run_01.png ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "34791a6ffc698d15f85f.png";

/***/ }),

/***/ "./src/assets/Player/Run/Run_02.png":
/*!******************************************!*\
  !*** ./src/assets/Player/Run/Run_02.png ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "86c9f576172527ec1d5f.png";

/***/ }),

/***/ "./src/assets/Player/Run/Run_03.png":
/*!******************************************!*\
  !*** ./src/assets/Player/Run/Run_03.png ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "4a46233ebec9f998b015.png";

/***/ }),

/***/ "./src/assets/Player/Run/Run_04.png":
/*!******************************************!*\
  !*** ./src/assets/Player/Run/Run_04.png ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d19eb6549622cffdda21.png";

/***/ }),

/***/ "./src/assets/Player/Run/Run_05.png":
/*!******************************************!*\
  !*** ./src/assets/Player/Run/Run_05.png ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "34791a6ffc698d15f85f.png";

/***/ }),

/***/ "./src/assets/Player/Run/Run_06.png":
/*!******************************************!*\
  !*** ./src/assets/Player/Run/Run_06.png ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "722abf22f474f6cbff13.png";

/***/ }),

/***/ "./src/assets/Player/Run/Run_07.png":
/*!******************************************!*\
  !*** ./src/assets/Player/Run/Run_07.png ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "d5e9404aa55ad44d694c.png";

/***/ }),

/***/ "./src/assets/Player/Run/Run_08.png":
/*!******************************************!*\
  !*** ./src/assets/Player/Run/Run_08.png ***!
  \******************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "8a136efd42a9e35503c4.png";

/***/ }),

/***/ "./src/assets/Player/Shoot/Shoot_01.png":
/*!**********************************************!*\
  !*** ./src/assets/Player/Shoot/Shoot_01.png ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "34791a6ffc698d15f85f.png";

/***/ }),

/***/ "./src/assets/Player/Shoot/Shoot_02.png":
/*!**********************************************!*\
  !*** ./src/assets/Player/Shoot/Shoot_02.png ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "184d93ae3adc42bffab9.png";

/***/ }),

/***/ "./src/assets/Player/Shoot/Shoot_03.png":
/*!**********************************************!*\
  !*** ./src/assets/Player/Shoot/Shoot_03.png ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "184d93ae3adc42bffab9.png";

/***/ }),

/***/ "./src/assets/Player/Shoot/Shoot_04.png":
/*!**********************************************!*\
  !*** ./src/assets/Player/Shoot/Shoot_04.png ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "184d93ae3adc42bffab9.png";

/***/ }),

/***/ "./src/assets/Player/Shoot/Shoot_05.png":
/*!**********************************************!*\
  !*** ./src/assets/Player/Shoot/Shoot_05.png ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "34791a6ffc698d15f85f.png";

/***/ }),

/***/ "./src/assets/Player/Shoot/Shoot_06.png":
/*!**********************************************!*\
  !*** ./src/assets/Player/Shoot/Shoot_06.png ***!
  \**********************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "34791a6ffc698d15f85f.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
var exports = __webpack_exports__;
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
__webpack_require__(/*! ./gameLogic */ "./src/gameLogic.ts");

}();
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQzlERjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7Ozs7Ozs7OztBQ2ZBLDZEQUFxQiIsInNvdXJjZXMiOlsid2VicGFjazovL2dhbWUtcHJhY3RpY2UvLi9zcmMvZ2FtZUxvZ2ljLnRzIiwid2VicGFjazovL2dhbWUtcHJhY3RpY2UvLi9zcmMvdXRpbHMvRmFjdG9yaWVzL0VuZW15LnRzIiwid2VicGFjazovL2dhbWUtcHJhY3RpY2UvLi9zcmMvdXRpbHMvRmFjdG9yaWVzL0dhbWVTdGF0ZS50cyIsIndlYnBhY2s6Ly9nYW1lLXByYWN0aWNlLy4vc3JjL3V0aWxzL0ZhY3Rvcmllcy9MZXZlbC50cyIsIndlYnBhY2s6Ly9nYW1lLXByYWN0aWNlLy4vc3JjL3V0aWxzL0ZhY3Rvcmllcy9QbGF0Zm9ybS50cyIsIndlYnBhY2s6Ly9nYW1lLXByYWN0aWNlLy4vc3JjL3V0aWxzL0ZhY3Rvcmllcy9QbGF5ZXIudHMiLCJ3ZWJwYWNrOi8vZ2FtZS1wcmFjdGljZS8uL3NyYy91dGlscy9sZXZlbHMudHMiLCJ3ZWJwYWNrOi8vZ2FtZS1wcmFjdGljZS8uL3NyYy91dGlscy9taXNjLnRzIiwid2VicGFjazovL2dhbWUtcHJhY3RpY2UvLi9zcmMvdXRpbHMvc3ByaXRlcy9idWxsZXRTcHJpdGVzLnRzIiwid2VicGFjazovL2dhbWUtcHJhY3RpY2UvLi9zcmMvdXRpbHMvc3ByaXRlcy9ndW5TcHJpdGVzLnRzIiwid2VicGFjazovL2dhbWUtcHJhY3RpY2UvLi9zcmMvdXRpbHMvc3ByaXRlcy9wbGF5ZXJTcHJpdGVzLnRzIiwid2VicGFjazovL2dhbWUtcHJhY3RpY2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2FtZS1wcmFjdGljZS93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL2dhbWUtcHJhY3RpY2Uvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vZ2FtZS1wcmFjdGljZS8uL3NyYy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGxheWVyU3ByaXRlcyBmcm9tICcuL3V0aWxzL3Nwcml0ZXMvcGxheWVyU3ByaXRlcyc7XG5pbXBvcnQgZ3VuU3ByaXRlcyBmcm9tICcuL3V0aWxzL3Nwcml0ZXMvZ3VuU3ByaXRlcyc7XG5pbXBvcnQgYnVsbGV0U3ByaXRlcyBmcm9tICcuL3V0aWxzL3Nwcml0ZXMvYnVsbGV0U3ByaXRlcyc7XG5pbXBvcnQgeyBHcm91bmRFbmVteSB9IGZyb20gJy4vdXRpbHMvRmFjdG9yaWVzL0VuZW15JztcbmltcG9ydCB7IEdhbWVTdGF0ZUludGVyZmFjZSB9IGZyb20gJy4vdHlwZXMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgR2FtZVN0YXRlIGZyb20gJy4vdXRpbHMvRmFjdG9yaWVzL0dhbWVTdGF0ZSc7XG5pbXBvcnQgbGV2ZWxzIGZyb20gJy4vdXRpbHMvbGV2ZWxzJztcblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG5jYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuY2FudmFzLndpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cbmNvbnN0IHNwcml0ZXNTdGF0ZSA9IHtcbiAgZnJhbWVDb3VudDogMCxcbiAgY3VycklkeDogMFxufTtcblxuY29uc3QgbGV2ZWxPbmUgPSBsZXZlbHMub25lKGNhbnZhcy5oZWlnaHQpO1xuY29uc3QgZ2FtZVN0YXRlOiBHYW1lU3RhdGVJbnRlcmZhY2UgPSBHYW1lU3RhdGUobGV2ZWxPbmUpO1xuXG5mdW5jdGlvbiBkcmF3KCkge1xuICBjb25zdCBjID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGlmICghYykgcmV0dXJuO1xuICBjb25zdCB7IHdpZHRoLCBoZWlnaHQgfSA9IGNhbnZhcztcblxuICBjLmNsZWFyUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICBjLmZpbGxTdHlsZSA9ICcjQjMzQjQ0JztcbiAgYy5maWxsUmVjdCgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcblxuICBjLmZpbGxTdHlsZSA9ICdibGFjayc7XG4gIGMuZmlsbFJlY3QoMCwgMCwgd2lkdGgsIDE2MCk7XG5cbiAgLy8gICBkcmF3UGxhdGZvcm1zKGMpO1xuICBnYW1lU3RhdGUucGxheWVyLmRyYXcoYywgc3ByaXRlc1N0YXRlLmN1cnJJZHgpO1xuICAvLyAgIGRyYXdFbmVtaWVzKGMpO1xufVxuIiwiaW1wb3J0IHtcbiAgRW5lbXlJbnRlcmZhY2UsXG4gIEdyb3VuZEVuZW15SW50ZXJmYWNlLFxuICBTaXplLFxuICBYWVxufSBmcm9tICcuLi8uLi90eXBlcy9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gRW5lbXkocG9zaXRpb246IFhZLCBzaXplOiBTaXplKTogRW5lbXlJbnRlcmZhY2Uge1xuICByZXR1cm4ge1xuICAgIHg6IHBvc2l0aW9uLngsXG4gICAgeTogcG9zaXRpb24ueSxcbiAgICB2ZWxvY2l0eToge1xuICAgICAgeDogMCxcbiAgICAgIHk6IDBcbiAgICB9LFxuICAgIGRpcmVjdGlvbjogJ3JpZ2h0JyxcbiAgICBjdXJyQWN0aW9uOiAnaWRsZScsXG4gICAgZ2V0IHdpZHRoKCkge1xuICAgICAgcmV0dXJuIHNpemUud2lkdGg7XG4gICAgfSxcbiAgICBnZXQgaGVpZ2h0KCkge1xuICAgICAgcmV0dXJuIHNpemUuaGVpZ2h0O1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdyb3VuZEVuZW15KHBvc2l0aW9uOiBYWSk6IEdyb3VuZEVuZW15SW50ZXJmYWNlIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5FbmVteShwb3NpdGlvbiwgeyBoZWlnaHQ6IDk1LCB3aWR0aDogOTUgfSksXG4gICAgdHlwZTogJ2dyb3VuZCdcbiAgfTtcbn1cbiIsImltcG9ydCB7XG4gIEdyb3VuZEVuZW15SW50ZXJmYWNlLFxuICBMZXZlbEludGVyZmFjZSxcbiAgUGxhdGZvcm1JbnRlcmZhY2Vcbn0gZnJvbSAnLi4vLi4vdHlwZXMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgUGxheWVyIGZyb20gJy4vUGxheWVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gR2FtZVN0YXRlKGxldmVsOiBMZXZlbEludGVyZmFjZSkge1xuICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoKTtcblxuICByZXR1cm4ge1xuICAgIGdldCBwbGF5ZXIoKSB7XG4gICAgICByZXR1cm4gcGxheWVyO1xuICAgIH0sXG4gICAgZ2V0IHBsYXRmb3JtcygpIHtcbiAgICAgIHJldHVybiBsZXZlbC5wbGF0Zm9ybXM7XG4gICAgfSxcbiAgICBnZXQgZW5lbWllcygpIHtcbiAgICAgIHJldHVybiBsZXZlbC5lbmVtaWVzO1xuICAgIH1cbiAgfTtcbn1cbiIsImltcG9ydCB7XG4gIFBsYXRmb3JtSW50ZXJmYWNlLFxuICBHcm91bmRFbmVteUludGVyZmFjZVxufSBmcm9tICcuLi8uLi90eXBlcy9pbnRlcmZhY2VzJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTGV2ZWwoXG4gIHBsYXRmb3JtczogUGxhdGZvcm1JbnRlcmZhY2VbXSxcbiAgZW5lbWllczogR3JvdW5kRW5lbXlJbnRlcmZhY2VbXVxuKSB7XG4gIHJldHVybiB7XG4gICAgcGxhdGZvcm1zLFxuICAgIGVuZW1pZXNcbiAgfTtcbn1cbiIsImltcG9ydCBwbGF0Zm9ybTEgZnJvbSAnLi4vLi4vYXNzZXRzL0Vudmlyb25tZW50cy9QbGF0Zm9ybXMvUGxhdGZvcm0wMS5wbmcnO1xuaW1wb3J0IHBsYXRmb3JtMiBmcm9tICcuLi8uLi9hc3NldHMvRW52aXJvbm1lbnRzL1BsYXRmb3Jtcy9QbGF0Zm9ybTAyLnBuZyc7XG5pbXBvcnQgcGxhdGZvcm0zIGZyb20gJy4uLy4uL2Fzc2V0cy9FbnZpcm9ubWVudHMvUGxhdGZvcm1zL1BsYXRmb3JtMDMucG5nJztcbmltcG9ydCBwbGF0Zm9ybTQgZnJvbSAnLi4vLi4vYXNzZXRzL0Vudmlyb25tZW50cy9QbGF0Zm9ybXMvUGxhdGZvcm0wNC5wbmcnO1xuaW1wb3J0IHBsYXRmb3JtNSBmcm9tICcuLi8uLi9hc3NldHMvRW52aXJvbm1lbnRzL1BsYXRmb3Jtcy9QbGF0Zm9ybTA1LnBuZyc7XG5pbXBvcnQgeyBTaXplLCBYWSB9IGZyb20gJy4uLy4uL3R5cGVzL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgY3JlYXRlSW1hZ2UgfSBmcm9tICcuLi9taXNjJztcblxuZnVuY3Rpb24gUGxhdGZvcm0ocG9zaXRpb246IFhZLCBzaXplOiBTaXplLCBpbWFnZVNyYz86ICdzdHJpbmcnKSB7XG4gIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gIGlmIChpbWFnZVNyYykgaW1hZ2Uuc3JjID0gaW1hZ2VTcmM7XG5cbiAgbGV0IHsgeCwgeSB9ID0gcG9zaXRpb247XG5cbiAgY29uc3QgaGVpZ2h0ID0gc2l6ZS5oZWlnaHQ7XG4gIGNvbnN0IHdpZHRoID0gc2l6ZS53aWR0aDtcblxuICBsZXQgdmVsb2NpdHlYID0gMDtcblxuICByZXR1cm4ge1xuICAgIGdldCB4KCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfSxcbiAgICBnZXQgeSgpIHtcbiAgICAgIHJldHVybiB5O1xuICAgIH0sXG4gICAgZ2V0IHZlbG9jaXR5WCgpIHtcbiAgICAgIHJldHVybiB2ZWxvY2l0eVg7XG4gICAgfSxcbiAgICBnZXQgd2lkdGgoKSB7XG4gICAgICByZXR1cm4gd2lkdGg7XG4gICAgfSxcbiAgICBnZXQgaGVpZ2h0KCkge1xuICAgICAgcmV0dXJuIGhlaWdodDtcbiAgICB9LFxuICAgIGdldCBpbWFnZSgpIHtcbiAgICAgIHJldHVybiBpbWFnZTtcbiAgICB9LFxuICAgIHVwZGF0ZVhQb3NpdGlvbjogKCkgPT4ge1xuICAgICAgeCArPSB2ZWxvY2l0eVg7XG4gICAgfSxcbiAgICB1cGRhdGVWZWxvY2l0eVg6IChudW06IG51bWJlcikgPT4ge1xuICAgICAgdmVsb2NpdHlYID0gbnVtO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBsYXRmb3JtMShwb3NpdGlvbjogWFkpIHtcbiAgcmV0dXJuIFBsYXRmb3JtKHBvc2l0aW9uLCB7IGhlaWdodDogNDcsIHdpZHRoOiA5OSB9LCBwbGF0Zm9ybTEpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIFBsYXRmb3JtMihwb3NpdGlvbjogWFkpIHtcbiAgcmV0dXJuIFBsYXRmb3JtKHBvc2l0aW9uLCB7IGhlaWdodDogMzYsIHdpZHRoOiA5MCB9LCBwbGF0Zm9ybTIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIFBsYXRmb3JtMyhwb3NpdGlvbjogWFkpIHtcbiAgcmV0dXJuIFBsYXRmb3JtKHBvc2l0aW9uLCB7IGhlaWdodDogNDcsIHdpZHRoOiAxMzcgfSwgcGxhdGZvcm0zKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBQbGF0Zm9ybTQocG9zaXRpb246IFhZKSB7XG4gIHJldHVybiBQbGF0Zm9ybShwb3NpdGlvbiwgeyBoZWlnaHQ6IDE3Miwgd2lkdGg6IDY5IH0sIHBsYXRmb3JtNCk7XG59XG5leHBvcnQgZnVuY3Rpb24gUGxhdGZvcm01KHBvc2l0aW9uOiBYWSkge1xuICByZXR1cm4gUGxhdGZvcm0ocG9zaXRpb24sIHsgaGVpZ2h0OiA2NCwgd2lkdGg6IDY0IH0sIHBsYXRmb3JtNSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGbG9vclBsYXRmb3JtKHBvc2l0aW9uOiBYWSwgd2lkdGg6IG51bWJlcikge1xuICBjb25zdCBiZWdpbkltZyA9IG5ldyBJbWFnZSgpO1xuICBiZWdpbkltZy5zcmMgPSBwbGF0Zm9ybTQ7XG5cbiAgY29uc3QgZW5kSW1nID0gbmV3IEltYWdlKCk7XG4gIGVuZEltZy5zcmMgPSBwbGF0Zm9ybTQ7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5QbGF0Zm9ybShwb3NpdGlvbiwgeyB3aWR0aCwgaGVpZ2h0OiAxNzIgfSksXG4gICAgdHlwZTogJ2Zsb29yJyxcbiAgICBpbWFnZTogY3JlYXRlSW1hZ2UocGxhdGZvcm00KVxuICAgIC8vIGRyYXc6IGZ1bmN0aW9uICh0aGlzOiBGbG9vckludGVyZmFjZSwgYzogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XG4gICAgLy8gICBjLmRyYXdJbWFnZShiZWdpbkltZywgdGhpcy54LCB0aGlzLnkpO1xuXG4gICAgLy8gICBjLmRyYXdJbWFnZShlbmRJbWcsIHRoaXMueCArIHdpZHRoIC0gNjksIHRoaXMueSk7XG5cbiAgICAvLyAgIGMuZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICAvLyAgIGMuZmlsbFJlY3QodGhpcy54ICsgNTksIHRoaXMueSwgd2lkdGggLSA2OSAqIDIgKyAyMCwgMTcyKTtcbiAgICAvLyB9XG4gIH07XG59XG4iLCJpbXBvcnQgeyBCdWxsZXRJbnRlcmZhY2UsIFBsYXllckludGVyZmFjZSB9IGZyb20gJy4uLy4uL3R5cGVzL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSAnLi4vLi4vdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHBsYXllclNwcml0ZXMgZnJvbSAnLi4vc3ByaXRlcy9wbGF5ZXJTcHJpdGVzJztcbmltcG9ydCBidWxsZXRTcHJpdGVzIGZyb20gJy4uL3Nwcml0ZXMvYnVsbGV0U3ByaXRlcyc7XG5pbXBvcnQgZ3VuU3ByaXRlcyBmcm9tICcuLi9zcHJpdGVzL2d1blNwcml0ZXMnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQbGF5ZXIoKTogUGxheWVySW50ZXJmYWNlIHtcbiAgbGV0IHggPSAxMDA7XG4gIGxldCB5ID0gMTAwO1xuICBjb25zdCB2ZWxvY2l0eSA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcbiAgY29uc3QgaGVpZ2h0ID0gNTA7XG4gIGNvbnN0IHdpZHRoID0gNDU7XG4gIGNvbnN0IGJ1bGxldHM6IEJ1bGxldEludGVyZmFjZVtdID0gW107XG4gIGxldCBjdXJyQWN0aW9uOiBBY3Rpb24gPSAnaWRsZSc7XG5cbiAgcmV0dXJuIHtcbiAgICBnZXQgeCgpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH0sXG4gICAgZ2V0IHkoKSB7XG4gICAgICByZXR1cm4geTtcbiAgICB9LFxuICAgIGdldCB2ZWxvY2l0eSgpIHtcbiAgICAgIHJldHVybiB2ZWxvY2l0eTtcbiAgICB9LFxuICAgIGdldCBoZWlnaHQoKSB7XG4gICAgICByZXR1cm4gaGVpZ2h0O1xuICAgIH0sXG4gICAgZ2V0IHdpZHRoKCkge1xuICAgICAgcmV0dXJuIHdpZHRoO1xuICAgIH0sXG4gICAgZ2V0IGJ1bGxldHMoKSB7XG4gICAgICByZXR1cm4gYnVsbGV0cztcbiAgICB9LFxuICAgIGdldCBjdXJyQWN0aW9uKCkge1xuICAgICAgcmV0dXJuIGN1cnJBY3Rpb247XG4gICAgfSxcbiAgICB1cGRhdGVQb3NpdGlvbigpIHtcbiAgICAgIHggKz0gdmVsb2NpdHkueDtcbiAgICAgIHkgKz0gdmVsb2NpdHkueTtcbiAgICB9LFxuICAgIHVwZGF0ZVZlbG9jaXR5KGF4aXM6ICd4JyB8ICd5JywgYW1vdW50OiBudW1iZXIpIHtcbiAgICAgIHZlbG9jaXR5W2F4aXNdID0gYW1vdW50O1xuICAgIH0sXG4gICAgdXBkYXRlQWN0aW9uKGFjdGlvbjogQWN0aW9uKSB7XG4gICAgICBjdXJyQWN0aW9uID0gYWN0aW9uO1xuICAgIH0sXG4gICAgZHJhdzogKGM6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgY3VycklkeDogbnVtYmVyKSA9PiB7XG4gICAgICAvLyBkcmF3IHBsYXllclxuICAgICAgYy5kcmF3SW1hZ2UocGxheWVyU3ByaXRlc1tjdXJyQWN0aW9uXVtjdXJySWR4XSwgeCwgeSwgNTksIGhlaWdodCk7XG5cbiAgICAgIC8vIGRyYXcgZ3VuXG4gICAgICBjb25zdCBndW5TcHJpdGUgPVxuICAgICAgICBjdXJyQWN0aW9uID09PSAnc2hvb3QnXG4gICAgICAgICAgPyBndW5TcHJpdGVzW2N1cnJBY3Rpb25dLnNpZGVzW2N1cnJJZHhdXG4gICAgICAgICAgOiBndW5TcHJpdGVzW2N1cnJBY3Rpb25dW2N1cnJJZHhdO1xuXG4gICAgICBjLmRyYXdJbWFnZShndW5TcHJpdGUsIHggKyB3aWR0aCAtIDIwLCB5IC0gMTMsIDUwLCA5NCk7XG5cbiAgICAgIC8vIGRyYXcgYnVsbGV0c1xuICAgICAgYnVsbGV0cy5mb3JFYWNoKChiKSA9PlxuICAgICAgICBjLmRyYXdJbWFnZShidWxsZXRTcHJpdGVzLmlkbGVbYi5zcHJpdGVJZHhdLCBiLngsIGIueSlcbiAgICAgICk7XG4gICAgfVxuICB9O1xufVxuIiwiaW1wb3J0IExldmVsIGZyb20gJy4vRmFjdG9yaWVzL0xldmVsJztcbmltcG9ydCB7IEZsb29yUGxhdGZvcm0gfSBmcm9tICcuL0ZhY3Rvcmllcy9QbGF0Zm9ybSc7XG5pbXBvcnQgeyBHcm91bmRFbmVteSB9IGZyb20gJy4vRmFjdG9yaWVzL0VuZW15JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBvbmU6IChjYW52YXNIZWlnaHQ6IG51bWJlcikgPT5cbiAgICBMZXZlbChcbiAgICAgIFtcbiAgICAgICAgRmxvb3JQbGF0Zm9ybSh7IHg6IC0xMCwgeTogY2FudmFzSGVpZ2h0IC0gMTY4IH0sIDgwMCksXG4gICAgICAgIEZsb29yUGxhdGZvcm0oeyB4OiA5NjAsIHk6IGNhbnZhc0hlaWdodCAtIDE2OCB9LCA4MDApXG4gICAgICBdLFxuICAgICAgW0dyb3VuZEVuZW15KHsgeDogNTAwLCB5OiAyMDAgfSldXG4gICAgKVxufTtcbiIsImltcG9ydCB7IFhZIH0gZnJvbSAnLi4vdHlwZXMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBQbGF0Zm9ybUZhY3RvcnkgfSBmcm9tICcuLi90eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQbGF0Zm9ybXNUb0ZpbGxVcEF4aXMoXG4gIFBsYXRmb3JtOiBQbGF0Zm9ybUZhY3RvcnksXG4gIHN0YXJ0UG9zOiBYWSxcbiAgYXhpczogJ3gnIHwgJ3knLFxuICBheGlzTGVuZ3RoOiBudW1iZXJcbikge1xuICBjb25zdCBiYXNlUGxhdGZvcm0gPSBQbGF0Zm9ybSh7IHg6IDAsIHk6IDAgfSk7XG4gIGNvbnN0IHBsYXRmb3JtTGVuZ3RoID1cbiAgICBheGlzID09PSAneCcgPyBiYXNlUGxhdGZvcm0ud2lkdGggOiBiYXNlUGxhdGZvcm0uaGVpZ2h0O1xuXG4gIGNvbnN0IG5vT2ZQbGF0Zm9ybXNUb0ZpbGxVcENhbnZhcyA9IE1hdGguY2VpbChheGlzTGVuZ3RoIC8gcGxhdGZvcm1MZW5ndGgpO1xuXG4gIHJldHVybiBBcnJheShub09mUGxhdGZvcm1zVG9GaWxsVXBDYW52YXMpXG4gICAgLmZpbGwoUGxhdGZvcm0oc3RhcnRQb3MpKVxuICAgIC5tYXAoKHBsYXRmb3JtLCBpKSA9PiB7XG4gICAgICBpZiAoaSA9PT0gMCkgcmV0dXJuIHBsYXRmb3JtO1xuXG4gICAgICByZXR1cm4gYXhpcyA9PT0gJ3knXG4gICAgICAgID8geyAuLi5wbGF0Zm9ybSwgeTogcGxhdGZvcm0ueSArIHBsYXRmb3JtLmhlaWdodCAqIGkgfVxuICAgICAgICA6IHsgLi4ucGxhdGZvcm0sIHg6IHBsYXRmb3JtLnggKiAoaSArIDEpICsgcGxhdGZvcm0ud2lkdGggKiBpIH07XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVJbWFnZShzcmM6IHN0cmluZykge1xuICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICBpbWFnZS5zcmMgPSBzcmM7XG4gIHJldHVybiBpbWFnZTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUltYWdlIH0gZnJvbSAnLi4vbWlzYyc7XG5cbmltcG9ydCBpZGxlMDEgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0J1bGxldC9JZGxlL0J1bGxldF9JZGxlXzAxLnBuZyc7XG5pbXBvcnQgaWRsZTAyIGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9CdWxsZXQvSWRsZS9CdWxsZXRfSWRsZV8wMi5wbmcnO1xuaW1wb3J0IGlkbGUwMyBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvQnVsbGV0L0lkbGUvQnVsbGV0X0lkbGVfMDMucG5nJztcbmltcG9ydCBpZGxlMDQgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0J1bGxldC9JZGxlL0J1bGxldF9JZGxlXzA0LnBuZyc7XG5pbXBvcnQgaWRsZTA1IGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9CdWxsZXQvSWRsZS9CdWxsZXRfSWRsZV8wNS5wbmcnO1xuaW1wb3J0IGlkbGUwNiBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvQnVsbGV0L0lkbGUvQnVsbGV0X0lkbGVfMDYucG5nJztcbmltcG9ydCBpZGxlMDcgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0J1bGxldC9JZGxlL0J1bGxldF9JZGxlXzA3LnBuZyc7XG5cbmNvbnN0IGlkbGUgPSBbXG4gIGNyZWF0ZUltYWdlKGlkbGUwMSksXG4gIGNyZWF0ZUltYWdlKGlkbGUwMiksXG4gIGNyZWF0ZUltYWdlKGlkbGUwMyksXG4gIGNyZWF0ZUltYWdlKGlkbGUwNCksXG4gIGNyZWF0ZUltYWdlKGlkbGUwNSksXG4gIGNyZWF0ZUltYWdlKGlkbGUwNiksXG4gIGNyZWF0ZUltYWdlKGlkbGUwNylcbl07XG5cbmV4cG9ydCBkZWZhdWx0IHsgaWRsZSB9O1xuIiwiaW1wb3J0IHsgY3JlYXRlSW1hZ2UgfSBmcm9tICcuLi9taXNjJztcblxuaW1wb3J0IGlkbGUwMSBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvR3VuMDEvSWRsZS9JZGxlX0d1bjAxXzAxLnBuZyc7XG5pbXBvcnQgaWRsZTAyIGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9JZGxlL0lkbGVfR3VuMDFfMDIucG5nJztcbmltcG9ydCBpZGxlMDMgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0d1bjAxL0lkbGUvSWRsZV9HdW4wMV8wMy5wbmcnO1xuaW1wb3J0IGlkbGUwNCBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvR3VuMDEvSWRsZS9JZGxlX0d1bjAxXzA0LnBuZyc7XG5pbXBvcnQgaWRsZTA1IGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9JZGxlL0lkbGVfR3VuMDFfMDUucG5nJztcbmltcG9ydCBpZGxlMDYgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0d1bjAxL0lkbGUvSWRsZV9HdW4wMV8wNi5wbmcnO1xuaW1wb3J0IGlkbGUwNyBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvR3VuMDEvSWRsZS9JZGxlX0d1bjAxXzA3LnBuZyc7XG5pbXBvcnQgaWRsZTA4IGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9JZGxlL0lkbGVfR3VuMDFfMDgucG5nJztcblxuaW1wb3J0IHJ1bjAxIGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9SdW4vUnVuX0d1bjAxXzAxLnBuZyc7XG5pbXBvcnQgcnVuMDIgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0d1bjAxL1J1bi9SdW5fR3VuMDFfMDIucG5nJztcbmltcG9ydCBydW4wMyBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvR3VuMDEvUnVuL1J1bl9HdW4wMV8wMy5wbmcnO1xuaW1wb3J0IHJ1bjA0IGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9SdW4vUnVuX0d1bjAxXzA0LnBuZyc7XG5pbXBvcnQgcnVuMDUgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0d1bjAxL1J1bi9SdW5fR3VuMDFfMDUucG5nJztcbmltcG9ydCBydW4wNiBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvR3VuMDEvUnVuL1J1bl9HdW4wMV8wNi5wbmcnO1xuaW1wb3J0IHJ1bjA3IGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9SdW4vUnVuX0d1bjAxXzA3LnBuZyc7XG5pbXBvcnQgcnVuMDggZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0d1bjAxL1J1bi9SdW5fR3VuMDFfMDgucG5nJztcblxuaW1wb3J0IHNob290RG93bjAxIGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9TaG9vdERvd24vU2hvb3REb3duX0d1bjAxXzAxLnBuZyc7XG5pbXBvcnQgc2hvb3REb3duMDIgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0d1bjAxL1Nob290RG93bi9TaG9vdERvd25fR3VuMDFfMDIucG5nJztcbmltcG9ydCBzaG9vdERvd24wMyBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvR3VuMDEvU2hvb3REb3duL1Nob290RG93bl9HdW4wMV8wMy5wbmcnO1xuaW1wb3J0IHNob290RG93bjA0IGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9TaG9vdERvd24vU2hvb3REb3duX0d1bjAxXzA0LnBuZyc7XG5pbXBvcnQgc2hvb3REb3duMDUgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0d1bjAxL1Nob290RG93bi9TaG9vdERvd25fR3VuMDFfMDUucG5nJztcbmltcG9ydCBzaG9vdERvd24wNiBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvR3VuMDEvU2hvb3REb3duL1Nob290RG93bl9HdW4wMV8wNi5wbmcnO1xuXG5pbXBvcnQgc2hvb3RTaWRlczAxIGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9TaG9vdFNpZGVzL1Nob290U2lkZXNfR3VuMDFfMDEucG5nJztcbmltcG9ydCBzaG9vdFNpZGVzMDIgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0d1bjAxL1Nob290U2lkZXMvU2hvb3RTaWRlc19HdW4wMV8wMi5wbmcnO1xuaW1wb3J0IHNob290U2lkZXMwMyBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvR3VuMDEvU2hvb3RTaWRlcy9TaG9vdFNpZGVzX0d1bjAxXzAzLnBuZyc7XG5pbXBvcnQgc2hvb3RTaWRlczA0IGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9TaG9vdFNpZGVzL1Nob290U2lkZXNfR3VuMDFfMDQucG5nJztcbmltcG9ydCBzaG9vdFNpZGVzMDUgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0d1bjAxL1Nob290U2lkZXMvU2hvb3RTaWRlc19HdW4wMV8wNS5wbmcnO1xuaW1wb3J0IHNob290U2lkZXMwNiBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvR3VuMDEvU2hvb3RTaWRlcy9TaG9vdFNpZGVzX0d1bjAxXzA2LnBuZyc7XG5cbmltcG9ydCBzaG9vdFVwMDEgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0d1bjAxL1Nob290VXAvU2hvb3RVcF9HdW4wMV8wMS5wbmcnO1xuaW1wb3J0IHNob290VXAwMiBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvR3VuMDEvU2hvb3RVcC9TaG9vdFVwX0d1bjAxXzAyLnBuZyc7XG5pbXBvcnQgc2hvb3RVcDAzIGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9TaG9vdFVwL1Nob290VXBfR3VuMDFfMDMucG5nJztcbmltcG9ydCBzaG9vdFVwMDQgZnJvbSAnLi4vLi4vYXNzZXRzL0d1bjAxL0d1bjAxL1Nob290VXAvU2hvb3RVcF9HdW4wMV8wNC5wbmcnO1xuaW1wb3J0IHNob290VXAwNSBmcm9tICcuLi8uLi9hc3NldHMvR3VuMDEvR3VuMDEvU2hvb3RVcC9TaG9vdFVwX0d1bjAxXzA1LnBuZyc7XG5pbXBvcnQgc2hvb3RVcDA2IGZyb20gJy4uLy4uL2Fzc2V0cy9HdW4wMS9HdW4wMS9TaG9vdFVwL1Nob290VXBfR3VuMDFfMDYucG5nJztcblxuY29uc3QgaWRsZSA9IFtcbiAgY3JlYXRlSW1hZ2UoaWRsZTAxKSxcbiAgY3JlYXRlSW1hZ2UoaWRsZTAyKSxcbiAgY3JlYXRlSW1hZ2UoaWRsZTAzKSxcbiAgY3JlYXRlSW1hZ2UoaWRsZTA0KSxcbiAgY3JlYXRlSW1hZ2UoaWRsZTA1KSxcbiAgY3JlYXRlSW1hZ2UoaWRsZTA2KSxcbiAgY3JlYXRlSW1hZ2UoaWRsZTA3KSxcbiAgY3JlYXRlSW1hZ2UoaWRsZTA4KVxuXTtcblxuY29uc3QgcnVuID0gW1xuICBjcmVhdGVJbWFnZShydW4wMSksXG4gIGNyZWF0ZUltYWdlKHJ1bjAyKSxcbiAgY3JlYXRlSW1hZ2UocnVuMDMpLFxuICBjcmVhdGVJbWFnZShydW4wNCksXG4gIGNyZWF0ZUltYWdlKHJ1bjA1KSxcbiAgY3JlYXRlSW1hZ2UocnVuMDYpLFxuICBjcmVhdGVJbWFnZShydW4wNyksXG4gIGNyZWF0ZUltYWdlKHJ1bjA4KVxuXTtcblxuY29uc3Qgc2hvb3QgPSB7XG4gIHVwOiBbXG4gICAgY3JlYXRlSW1hZ2Uoc2hvb3RVcDAxKSxcbiAgICBjcmVhdGVJbWFnZShzaG9vdFVwMDIpLFxuICAgIGNyZWF0ZUltYWdlKHNob290VXAwMyksXG4gICAgY3JlYXRlSW1hZ2Uoc2hvb3RVcDA0KSxcbiAgICBjcmVhdGVJbWFnZShzaG9vdFVwMDUpLFxuICAgIGNyZWF0ZUltYWdlKHNob290VXAwNilcbiAgXSxcbiAgc2lkZXM6IFtcbiAgICBjcmVhdGVJbWFnZShzaG9vdFNpZGVzMDEpLFxuICAgIGNyZWF0ZUltYWdlKHNob290U2lkZXMwMiksXG4gICAgY3JlYXRlSW1hZ2Uoc2hvb3RTaWRlczAzKSxcbiAgICBjcmVhdGVJbWFnZShzaG9vdFNpZGVzMDQpLFxuICAgIGNyZWF0ZUltYWdlKHNob290U2lkZXMwNSksXG4gICAgY3JlYXRlSW1hZ2Uoc2hvb3RTaWRlczA2KVxuICBdLFxuICBkb3duOiBbXG4gICAgY3JlYXRlSW1hZ2Uoc2hvb3REb3duMDEpLFxuICAgIGNyZWF0ZUltYWdlKHNob290RG93bjAyKSxcbiAgICBjcmVhdGVJbWFnZShzaG9vdERvd24wMyksXG4gICAgY3JlYXRlSW1hZ2Uoc2hvb3REb3duMDQpLFxuICAgIGNyZWF0ZUltYWdlKHNob290RG93bjA1KSxcbiAgICBjcmVhdGVJbWFnZShzaG9vdERvd24wNilcbiAgXVxufTtcblxuZXhwb3J0IGRlZmF1bHQgeyBpZGxlLCBydW4sIHNob290IH07XG4iLCJpbXBvcnQgeyBjcmVhdGVJbWFnZSB9IGZyb20gJy4uL21pc2MnO1xuXG5pbXBvcnQgaWRsZTAxU3JjIGZyb20gJy4uLy4uL2Fzc2V0cy9QbGF5ZXIvSWRsZS9JZGxlXzAxLnBuZyc7XG5pbXBvcnQgaWRsZTAyU3JjIGZyb20gJy4uLy4uL2Fzc2V0cy9QbGF5ZXIvSWRsZS9JZGxlXzAyLnBuZyc7XG5pbXBvcnQgaWRsZTAzU3JjIGZyb20gJy4uLy4uL2Fzc2V0cy9QbGF5ZXIvSWRsZS9JZGxlXzAzLnBuZyc7XG5pbXBvcnQgaWRsZTA0U3JjIGZyb20gJy4uLy4uL2Fzc2V0cy9QbGF5ZXIvSWRsZS9JZGxlXzA0LnBuZyc7XG5pbXBvcnQgaWRsZTA1U3JjIGZyb20gJy4uLy4uL2Fzc2V0cy9QbGF5ZXIvSWRsZS9JZGxlXzA1LnBuZyc7XG5pbXBvcnQgaWRsZTA2U3JjIGZyb20gJy4uLy4uL2Fzc2V0cy9QbGF5ZXIvSWRsZS9JZGxlXzA2LnBuZyc7XG5pbXBvcnQgaWRsZTA3U3JjIGZyb20gJy4uLy4uL2Fzc2V0cy9QbGF5ZXIvSWRsZS9JZGxlXzA3LnBuZyc7XG5pbXBvcnQgaWRsZTA4U3JjIGZyb20gJy4uLy4uL2Fzc2V0cy9QbGF5ZXIvSWRsZS9JZGxlXzA4LnBuZyc7XG5cbmltcG9ydCBydW4wMVNyYyBmcm9tICcuLi8uLi9hc3NldHMvUGxheWVyL1J1bi9SdW5fMDEucG5nJztcbmltcG9ydCBydW4wMlNyYyBmcm9tICcuLi8uLi9hc3NldHMvUGxheWVyL1J1bi9SdW5fMDIucG5nJztcbmltcG9ydCBydW4wM1NyYyBmcm9tICcuLi8uLi9hc3NldHMvUGxheWVyL1J1bi9SdW5fMDMucG5nJztcbmltcG9ydCBydW4wNFNyYyBmcm9tICcuLi8uLi9hc3NldHMvUGxheWVyL1J1bi9SdW5fMDQucG5nJztcbmltcG9ydCBydW4wNVNyYyBmcm9tICcuLi8uLi9hc3NldHMvUGxheWVyL1J1bi9SdW5fMDUucG5nJztcbmltcG9ydCBydW4wNlNyYyBmcm9tICcuLi8uLi9hc3NldHMvUGxheWVyL1J1bi9SdW5fMDYucG5nJztcbmltcG9ydCBydW4wN1NyYyBmcm9tICcuLi8uLi9hc3NldHMvUGxheWVyL1J1bi9SdW5fMDcucG5nJztcbmltcG9ydCBydW4wOFNyYyBmcm9tICcuLi8uLi9hc3NldHMvUGxheWVyL1J1bi9SdW5fMDgucG5nJztcblxuaW1wb3J0IHNob290MDFTcmMgZnJvbSAnLi4vLi4vYXNzZXRzL1BsYXllci9TaG9vdC9TaG9vdF8wMS5wbmcnO1xuaW1wb3J0IHNob290MDJTcmMgZnJvbSAnLi4vLi4vYXNzZXRzL1BsYXllci9TaG9vdC9TaG9vdF8wMi5wbmcnO1xuaW1wb3J0IHNob290MDNTcmMgZnJvbSAnLi4vLi4vYXNzZXRzL1BsYXllci9TaG9vdC9TaG9vdF8wMy5wbmcnO1xuaW1wb3J0IHNob290MDRTcmMgZnJvbSAnLi4vLi4vYXNzZXRzL1BsYXllci9TaG9vdC9TaG9vdF8wNC5wbmcnO1xuaW1wb3J0IHNob290MDVTcmMgZnJvbSAnLi4vLi4vYXNzZXRzL1BsYXllci9TaG9vdC9TaG9vdF8wNS5wbmcnO1xuaW1wb3J0IHNob290MDZTcmMgZnJvbSAnLi4vLi4vYXNzZXRzL1BsYXllci9TaG9vdC9TaG9vdF8wNi5wbmcnO1xuXG5jb25zdCBpZGxlID0gW1xuICBjcmVhdGVJbWFnZShpZGxlMDFTcmMpLFxuICBjcmVhdGVJbWFnZShpZGxlMDJTcmMpLFxuICBjcmVhdGVJbWFnZShpZGxlMDNTcmMpLFxuICBjcmVhdGVJbWFnZShpZGxlMDRTcmMpLFxuICBjcmVhdGVJbWFnZShpZGxlMDVTcmMpLFxuICBjcmVhdGVJbWFnZShpZGxlMDZTcmMpLFxuICBjcmVhdGVJbWFnZShpZGxlMDdTcmMpLFxuICBjcmVhdGVJbWFnZShpZGxlMDhTcmMpXG5dO1xuXG5jb25zdCBydW4gPSBbXG4gIGNyZWF0ZUltYWdlKHJ1bjAxU3JjKSxcbiAgY3JlYXRlSW1hZ2UocnVuMDJTcmMpLFxuICBjcmVhdGVJbWFnZShydW4wM1NyYyksXG4gIGNyZWF0ZUltYWdlKHJ1bjA0U3JjKSxcbiAgY3JlYXRlSW1hZ2UocnVuMDVTcmMpLFxuICBjcmVhdGVJbWFnZShydW4wNlNyYyksXG4gIGNyZWF0ZUltYWdlKHJ1bjA3U3JjKSxcbiAgY3JlYXRlSW1hZ2UocnVuMDhTcmMpXG5dO1xuXG5jb25zdCBzaG9vdCA9IFtcbiAgY3JlYXRlSW1hZ2Uoc2hvb3QwMVNyYyksXG4gIGNyZWF0ZUltYWdlKHNob290MDJTcmMpLFxuICBjcmVhdGVJbWFnZShzaG9vdDAzU3JjKSxcbiAgY3JlYXRlSW1hZ2Uoc2hvb3QwNFNyYyksXG4gIGNyZWF0ZUltYWdlKHNob290MDVTcmMpLFxuICBjcmVhdGVJbWFnZShzaG9vdDA2U3JjKVxuXTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBpZGxlLFxuICBydW4sXG4gIHNob290XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpbXBvcnQgJy4vZ2FtZUxvZ2ljJztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==