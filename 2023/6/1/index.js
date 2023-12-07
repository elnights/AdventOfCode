const fs = require('node:fs');

const text = fs.readFileSync('../input', 'utf-8').trimEnd();
const lines = text.split('\n');
const [times, dists] = lines.map(s => s.match(/\d+/g).map(x=>+x));

// let button push time be x, race time be r, distance be d, total time be t
// d = r * x
// r = t - x;
//
// d = (t - x) * x = tx - x^2
// x^2 - tx + d = 0;

let winWaysPerRace = [];

for (let i= 0; i < times.length; i++) {
    let t = times[i],
        d = dists[i];
    let D = t*t - 4*d;

    let x1 = (t - Math.sqrt(D)) / 2,
        x2 = (t + Math.sqrt(D)) / 2;

    // count integers between two roots(but not including them)
    let ways = Math.ceil(x2) - Math.floor(x1) - 1;

    winWaysPerRace.push(ways);
}

console.log(winWaysPerRace.reduce((acc, n) => acc * n, 1));
