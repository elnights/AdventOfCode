const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();

let dims = input.split('\n').map(s => s.match(/\d+/g).map(x=>+x));
let areas = dims.map(([a, b, c]) => ([a*b, b*c, a*c]));

console.log(areas.reduce((acc, [a, b, c]) =>
    acc + Math.min(a, b, c) + 2*a + 2*b + 2*c, 0));
