// --- Part Two ---
//
// As the race is about to start, you realize the piece of paper with race times and record distances you got earlier actually just has very bad kerning. There's really only one race - ignore the spaces between the numbers on each line.
//
// So, the example from before:
//
// Time:      7  15   30
// Distance:  9  40  200
//
// ...now instead means this:
//
// Time:      71530
// Distance:  940200
//
// Now, you have to figure out how many ways there are to win this single race. In this example, the race lasts for 71530 milliseconds and the record distance you need to beat is 940200 millimeters. You could hold the button anywhere from 14 to 71516 milliseconds and beat the record, a total of 71503 ways!
//
// How many ways can you beat the record in this one much longer race?

let sampleInput =
`Time:      7  15   30
Distance:  9  40  200`;

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
