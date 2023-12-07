const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();

let hands = input.split('\n').map(s => s.match(/\S+/g));

const cardToHexMap = {
    T: 'A',
    J: '1',
    Q: 'C',
    K: 'D',
    A: 'E'
};

// hand strength:
// Five of a kind: 1
// Four of a kind: 2
// Full house: 3
// Three of a kind: 4
// Two pair: 5
// One pair: 6
// High card: 7

function handStrength (h) {
    let handMap = [...h].reduce((m, c) => {
        m[c] = m[c] ? m[c] + 1 : 1;
        return m;
    }, {});

    let jokers = handMap.J || 0;
    delete handMap.J;
    let others = Object.values(handMap).sort((a, b) => b - a);

    if (jokers + (others[0] ?? 0) >= 5) return 1;
    if (jokers + (others[0] ?? 0) === 4) return 2;
    if (jokers + others[0] === 3) return others[1] === 2 ? 3 : 4;
    if (others[0] === 2 && others[1] === 2) return 5;
    if (jokers + others[0] === 2) return 6;
    return 7;
}

hands = hands.map(([h, b]) => (
    [parseInt([...h].map(c => cardToHexMap[c] || c).join(''), 16), b, handStrength(h)]
));
hands.sort(([h1,,s1],[h2,,s2]) => s2 - s1 || h1 - h2);

console.log(hands.reduce((acc, [,b], i) => acc + b * (i + 1), 0));
