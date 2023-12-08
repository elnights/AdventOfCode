const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();

let dims = input.split('\n').map(s => s.match(/\d+/g).map(x=>+x));
let dists = dims.map(([a, b, c]) => ([a+b, b+c, a+c]));

console.log(dims.reduce((acc, [a, b, c], index) =>
    acc + Math.min(...dists[index])*2 + a*b*c, 0));
