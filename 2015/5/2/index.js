const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();
const lines = input.split('\n');

const xBetweenY = /(\w)\w\1/;
const twoPair = /(\w{2}).*\1/;

let niceStrings = lines.filter(line => line.match(xBetweenY) && line.match(twoPair));

console.log(niceStrings.length);
