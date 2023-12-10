const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();

let histories = input.split('\n').map(s => s.split(' ').map(x=>+x));
function* diffs(seq) {
    for (let i = 1; i < seq.length; i++) {
        yield seq[i] - seq[i-1];
    }
}

let sum = 0;

for (let seq of histories) {
    let currSeq = seq;
    let diffsStack = [];
    for (;;) {
        currSeq = [...diffs(currSeq)];
        if (!currSeq.length) break;
        diffsStack.push(currSeq);
        if (currSeq.every(x => !x)) break;
    }

    let predictedValue = diffsStack.reduce((acc, diffs) => diffs.at(-1) + acc, 0) + seq.at(-1);
    sum += predictedValue;
}

console.log(sum);
