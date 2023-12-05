const fs = require('node:fs');

const cubes = {
    red: 12,
    green: 13,
    blue: 14,
};

const text = fs.readFileSync('input', 'utf-8');
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

let gamesPossibility = games.map(game=>
    game.every(set => Object.entries(set).every(([color, count]) => cubes[color] >= count))
);

console.log(gamesPossibility);
const answer = gamesPossibility.reduce((sum, game, index) =>
    game ? sum + index + 1 : sum, 0);

console.log(answer);
