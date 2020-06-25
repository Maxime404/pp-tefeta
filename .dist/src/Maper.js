"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Maper {
    constructor(map) {
        this.linesContent = [];
        this.mapLength = 0;
        this.mapHeight = 0;
        this.x = 0;
        this.y = 0;
        this.knownLocations = [[0, 0]];
        this.map = map;
    }
    solveMap() {
        this.linesContent = this.map.split('\n');
        if (this.linesContent[0].includes('x')) {
            const sizeInfos = this.linesContent[0].trim().split('x');
            console.log(sizeInfos);
            this.mapLength = +sizeInfos[0];
            this.mapHeight = +sizeInfos[1];
            this.y += 1;
        }
        else {
            this.mapHeight = this.linesContent.length;
            this.mapLength = this.linesContent[0].length;
        }
        while (this.linesContent[this.y].indexOf('1') === -1) {
            this.y += 1;
        }
        const startPoint = this.linesContent[this.y].indexOf('1');
        let loop = 0;
        this.x = startPoint;
        this.y = 1;
        while (this.linesContent[this.y].charAt(this.x) !== '2' && loop < this.mapHeight) {
            console.log(this.linesContent[this.y].charAt(this.x));
            this.move();
            loop + 1;
        }
        console.log(`End point found at [${this.x}, ${this.y}] !`);
        return true;
    }
    move() {
        if (this.y + 1 < this.mapHeight && this.linesContent[this.y + 1].charAt(this.x) !== '*') {
            this.y += 1;
        }
        else if (this.y + 1 < this.mapHeight && this.x + 1 < this.mapLength && this.linesContent[this.y + 1].charAt(this.x + 1) !== '*' && !this.isKnownLocation(this.y + 1, this.x + 1)) {
            this.y += 1;
            this.x += 1;
        }
        else if (this.linesContent[this.y + 1].charAt(this.x--) !== '*') {
            this.y += 1;
            this.x -= 1;
        }
    }
    isKnownLocation(x, y) {
        return JSON.stringify(this.knownLocations).indexOf(JSON.stringify([x, y])) !== -1 ? true : false;
    }
}
exports.default = Maper;
