import { size } from "lodash";

export default class Maper {
    private map: string;
    private linesContent: string[] = [];
    private mapLength: number = 0;
    private mapHeight: number = 0;
    private x: number = 0;
    private y: number = 0;
    private knownLocations: Array<[number, number]> = [[0, 0]];

    constructor(map: string) {
        this.map = map;
    }

    solveMap(): boolean {
        this.linesContent = this.map.split('\n');
        if(this.linesContent[0].includes('x')) {
            const sizeInfos: Array<string> = this.linesContent[0].trim().split('x');
            console.log(sizeInfos)
            this.mapLength = +sizeInfos[0];
            this.mapHeight = +sizeInfos[1];
            this.y += 1;
        } else {
            this.mapHeight = this.linesContent.length;
            this.mapLength = this.linesContent[0].length;
        }
        while(this.linesContent[this.y].indexOf('1') === -1) {
            this.y += 1;
        }

        const startPoint: number = this.linesContent[this.y].indexOf('1');
        let loop: number = 0;

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

    private move() {
        if (this.y + 1 < this.mapHeight && this.linesContent[this.y + 1].charAt(this.x) !== '*') {
            this.y += 1;
        } else if (this.y + 1 < this.mapHeight && this.x + 1 < this.mapLength && this.linesContent[this.y + 1].charAt(this.x + 1) !== '*' && !this.isKnownLocation(this.y + 1, this.x + 1)) {
            this.y += 1;
            this.x += 1;
        } else if (this.linesContent[this.y + 1].charAt(this.x--) !== '*') {
            this.y += 1;
            this.x -= 1;
        }
    }

    private isKnownLocation(x: number, y: number): boolean {        
        return JSON.stringify(this.knownLocations).indexOf(JSON.stringify([x, y])) !== -1 ? true : false;
    }
}