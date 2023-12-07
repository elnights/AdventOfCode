const fs = require('node:fs');

const text = fs.readFileSync('../input', 'utf-8').trimEnd();
const lines = text.split('\n');
const [t, d] = lines.map(s => +s.match(/\d/g).join(''));

// let button push time be x, race time be r, distance be d, total time be t
// d = r * x
// r = t - x;
//
// d = (t - x) * x = tx - x^2
// x^2 - tx + d = 0;

let D = t*t - 4*d;

let x1 = (t - Math.sqrt(D)) / 2,
    x2 = (t + Math.sqrt(D)) / 2;

// count integers between two roots(but not including them)
let ways = Math.ceil(x2) - Math.floor(x1) - 1;

console.log(ways);
