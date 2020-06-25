"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Maper_1 = __importDefault(require("./src/Maper"));
const path = require('path');
const fs = require('fs');
const args = process.argv.slice(2);
if (args.length !== 1) {
    console.log(`usage: node ${__filename.split('/').pop()} <MAP_FILENAME>`);
    process.exit(0);
}
const filename = args[0];
//Check if filename exist
if (!fs.existsSync(filename)) {
    console.log(`The file : ${filename} does not exist.`);
    process.exit(0);
}
//Get content of filename 
const content = fs.readFileSync(filename, 'utf-8');
const maper = new Maper_1.default(content);
maper.solveMap();
process.exit(0);
