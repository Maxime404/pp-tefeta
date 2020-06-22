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
    console.log(`The file : ${filename} does not exist.`)
    process.exit(0);
}

//Get content of filename 
const content = fs.readFileSync(filename, 'utf-8');

const linesContent = content.split('\n');

const mapfile = linesContent[0].length;

const lel = "";

process.exit(0);