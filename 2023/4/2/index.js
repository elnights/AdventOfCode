const fs = require('node:fs');

const text = fs.readFileSync('../input', 'utf-8');
const lines = text.split('\n').filter(line => line);
const cards = lines.map(line => {
    let [winningNumbers, myNumbers] = line
        .split(':')[1]
        .split('|')
        .map(numbers => new Set(numbers.trim().replaceAll(/\s+/g, ' ').split` `.map(x => +x)));

    let wins = [...myNumbers].filter(myNumber => winningNumbers.has(myNumber)).length;

    return {wins, instanceCount: 1};
});

cards.forEach(({wins, instanceCount}, index) => {
    cards.slice(index + 1, index + 1 + wins).forEach(card => card.instanceCount += instanceCount);
});

console.log(cards.map(({instanceCount}) => instanceCount).reduce((a, b) => a + b));
