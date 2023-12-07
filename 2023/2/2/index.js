const fs = require('node:fs');

const text = fs.readFileSync('../input', 'utf-8');
const lines = text.split("\n").filter(line => line);
const games = lines.map(line => {
    const description = line.split(':')[1];
    const sets = description.split(';').map(setDescription => {
        return setDescription.trim().split(',').reduce((set, cubeString) => {
            const [cubeCount, cubeColor] = cubeString.trim().split(' ');
            set[cubeColor] = parseInt(cubeCount);
            return set;
        }, {});
    });

    return sets;
});

let requiredCubesPerGame = games.map(game=>
    game.reduce((acc, set) => {
        for (let cubeColor in set) {
            if (!acc[cubeColor] || acc[cubeColor] < set[cubeColor])
                acc[cubeColor] = set[cubeColor];
        }
        return acc;
    }, {})
);

let powers = requiredCubesPerGame.map(
    cubeSet => Object.entries(cubeSet)
        .map(([, count]) => count)
        .reduce((power, count) => power * count, 1)
);

let answer = powers.reduce((acc, power) => acc + power, 0);
console.log(requiredCubesPerGame);
console.log(powers);
console.log(answer);
