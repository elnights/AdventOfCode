const fs = require('node:fs');

const text = fs.readFileSync('../input', 'utf-8');
const lines = text.split('\n').filter(line => line);
const cards = lines.map(line => {
    let [winningNumbers, myNumbers] = line
        .split(':')[1]
        .split('|')
        .map(numbers => new Set(numbers.trim().replaceAll(/\s+/g, ' ').split` `.map(x=> +x)));

    let wins = [...myNumbers].filter(myNumber => winningNumbers.has(myNumber)).length,
        points = wins ? 1 << wins - 1  : 0;

    return points;
});

console.log(cards.reduce((a, b) => a + b));
