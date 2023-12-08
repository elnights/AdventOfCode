const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();

let houses = new Set(['x0y0']),
    x = 0,
    y = 0;

for (let d of input) {
    switch (d) {
        case '^':
            y++;
            break;
        case 'v':
            y--;
            break;
        case '>':
            x++;
            break;
        case '<':
            x--;
    }

    houses.add(`x${x}y${y}`);
}

console.log(houses.size);
