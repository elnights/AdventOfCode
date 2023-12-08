const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();

const dms = 2;

let houses = new Set(['x0y0']);

for (let dm = 0; dm < 2; dm++) {
    let x = 0,
        y = 0;

    for (let i = dm; i < input.length; i += dms) {
        switch (input[i]) {
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
}

console.log(houses.size);
