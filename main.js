
const tileWidth = 16;
const tileHeight = 16;
const appWidth = 240;
const appHeight = 160;

class Map {
    constructor(rows, cols, tileList) {
        this.rows = rows;
        this.cols = cols;
        this.tileList = tileList;
        this.tileMap = [];
    }

    buildMap() {
        for (let i = 0; i < this.rows; i++){
            this.tileMap.push([]);
            for (var j = 0; j < this.cols; j++){
                this.tileMap[i].push(this.tileList.shift());
            }
        }
    }

    drawMap() {
        for (let i = 0; i < this.tileMap.length; i++){
            for (let j = 0; j < this.tileMap[i].length; j++){
                console.log(i + " " + j + "" + this.tileMap[i][j].url);
                let tileDraw = PIXI.Sprite.from(this.tileMap[i][j].url);
                tileDraw.x = j * tileWidth;
                tileDraw.y = i * tileHeight;
                app.stage.addChild(tileDraw);
            }
        }
    }
}

class tile {
    constructor(url) {
        this.url = url;
    }
}

class unit {
    constructor(url, x = 0, y = 0) {
        this.url = url;
        this.x = x;
        this.y = y;
        this.unitDraw = PIXI.Sprite.from(this.url);
    }

    drawUnit() {
        this.unitDraw.x = this.x * tileWidth;
        this.unitDraw.y = this.y * tileHeight;
        app.stage.addChild(this.unitDraw);
    }

    moveUnit(x = 0, y = 0) {
        app.ticker.add(() => {
            this.unitDraw.x = x * tileWidth;
            this.unitDraw.y = y * tileHeight;
        });
    }
}

const grassTile = new tile("grass1.png")
const waterTile = new tile("water1.png")
const eirikaUnit = new unit("eirika1.png", 2, 2)
const tileSet = [grassTile, grassTile, grassTile, grassTile, grassTile, grassTile, grassTile, grassTile, grassTile, grassTile, grassTile, grassTile, grassTile, waterTile, grassTile, grassTile]
const test = new Map(4, 4, tileSet)

// draw canvas
let app = new PIXI.Application({ width: appWidth, height: appHeight });
document.body.appendChild(app.view);
ticker = PIXI.Ticker.shared;

test.buildMap();
test.drawMap();
eirikaUnit.drawUnit();