import { size } from "lodash";

export default class Maper {
    private map: string;
    private linesContent: string[] = [];
    private mapLength: number = 0;
    private mapHeight: number = 0;
    private x: number = 0;
    private y: number = 0;
    private knownLocations: Array<[number, number]> = [];

    constructor(map: string) {
        this.map = map;
    }

    solveMap(): boolean {
        this.linesContent = this.map.split('\n');
        if (this.linesContent[0].includes('x')) {
            const sizeInfos: Array<string> = this.linesContent[0].trim().split('x');
            console.log(sizeInfos)
            this.mapLength = +sizeInfos[0];
            this.mapHeight = +sizeInfos[1];
            this.y += 1;
        } else {
            this.mapHeight = this.linesContent.length;
            this.mapLength = this.linesContent[0].length;
        }
        while (this.linesContent[this.y].indexOf('1') === -1) {
            this.y += 1;
        }

        const startPoint: number = this.linesContent[this.y].indexOf('1');
        let loop: number = 0;

        this.x = startPoint;
        this.knownLocations.push([this.x, this.y]);

        while (this.linesContent[this.y].charAt(this.x) !== '2' && loop < 200) {
            console.log(this.linesContent[this.y].charAt(this.x));
            //console.log(this.knownLocations);
            this.move();
            loop += 1;
        }
        console.log(`End point found at [${this.x}, ${this.y}] !`);
        return true;
    }

    private move() {
        if (this.y + 1 <= this.mapHeight && this.linesContent[this.y + 1].charAt(this.x) !== '*' && !this.isKnownLocation(this.x, this.y + 1)) {
            this.y += 1;
            console.log(`[${this.x}, ${this.y}]`);
        } else if (this.x + 1 <= this.mapLength && this.linesContent[this.y].charAt(this.x + 1) !== '*' && !this.isKnownLocation(this.x + 1, this.y)) {
            this.x += 1;
            console.log(`[${this.x}, ${this.y}]`);
        } else if (this.x - 1 >= 0 && this.linesContent[this.y].charAt(this.x - 1) !== '*' && !this.isKnownLocation(this.x - 1, this.y)) {
            this.x -= 1;
            console.log(`[${this.x}, ${this.y}]`);
        } else if (this.y - 1 >= 0) {
            if (this.linesContent[this.y].charAt(this.x + 1) !== '*') {
                while (this.isKnownLocation(this.x, this.y) && this.linesContent[this.y].charAt(this.x + 1) !== '*') {
                    this.x += 1;
                    this.addKnownLocation(this.x, this.y);
                    console.log(`[${this.x}, ${this.y}]`);
                }
                if(this.linesContent[this.y - 1].charAt(this.x) !== '*') {
                    this.y -= 1;
                    this.addKnownLocation(this.x, this.y);
                    console.log(`[${this.x}, ${this.y}]`);
                }
            } else if (this.linesContent[this.y].charAt(this.x - 1) !== '*') {
                while (this.isKnownLocation(this.x, this.y) && this.linesContent[this.y].charAt(this.x - 1) !== '*') {
                    this.x -= 1;
                    this.addKnownLocation(this.x, this.y);
                    console.log(`[${this.x}, ${this.y}]`);
                }
                if(this.linesContent[this.y - 1].charAt(this.x) !== '*') {
                    this.y -= 1;
                    this.addKnownLocation(this.x, this.y);
                    console.log(`[${this.x}, ${this.y}]`);
                }
            }
        } 

        this.addKnownLocation(this.x, this.y);
    }

    private isKnownLocation(x: number, y: number): boolean {
        return JSON.stringify(this.knownLocations).indexOf(JSON.stringify([x, y])) !== -1 ? true : false;
    }

    private addKnownLocation(x: number, y: number) {
        if (!this.isKnownLocation(this.x, this.y)) {
            this.knownLocations.push([this.x, this.y]);
        }
    }
}