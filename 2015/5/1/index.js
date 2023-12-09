const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();
const lines = input.split('\n');

const vowels = /[aeiou]/g;
const forbidden = /ab|cd|pq|xy/;
const twoInARow = /(\w)\1/;

let niceStrings = lines.filter(line => {
    if ((line.match(vowels) ?? []).length < 3) return false;
    if (line.match(forbidden)) return false;
    return line.match(twoInARow);
});

console.log(niceStrings.length);
