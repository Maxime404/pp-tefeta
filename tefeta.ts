import Maper from './src/Maper';

const path = require('path');
const fs = require('fs');

const args: string[] = process.argv.slice(2);

if (args.length !== 1) {
    console.log(`usage: node ${__filename.split('/').pop()} <MAP_FILENAME>`);
    process.exit(0);
}

const filename: string = args[0];

//Check if filename exist
if (!fs.existsSync(filename)) {
    console.log(`The file : ${filename} does not exist.`)
    process.exit(0);
}

//Get content of filename 
const content: string = fs.readFileSync(filename, 'utf-8');

const maper: Maper = new Maper(content);

maper.solveMap();

process.exit(0);