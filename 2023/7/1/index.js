const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();

let hands = input.split('\n').map(s => s.match(/\S+/g));

const cardToHexMap = {
    T: 'A',
    J: 'B',
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

    let fullHouseCandidate = false,
        twoPairCandidate = false;

    for (let count of Object.values(handMap)) {
        switch (count) {
            case 5: return 1;
            case 4: return 2;
            case 3:
                if (twoPairCandidate) return 3;
                fullHouseCandidate = true;
                break;
            case 2:
                if (fullHouseCandidate) return 3;
                if (twoPairCandidate) return 5;
                twoPairCandidate = true;
        }
    }

    return fullHouseCandidate ? 4 : twoPairCandidate ? 6 : 7;
}

hands = hands.map(([h, b]) => (
    [parseInt([...h].map(c => cardToHexMap[c] || c).join(''), 16), b, handStrength(h)]
));
hands.sort(([h1,,s1],[h2,,s2]) => s2 - s1 || h1 - h2);

console.log(hands.reduce((acc, [,b], i) => acc + b * (i + 1), 0));
