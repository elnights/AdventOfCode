const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();

let [d, nodes] = input.split('\n\n');
let network= nodes.split('\n').reduce((map, node) => {
    node = node.match((/\w{3}/g));
    map.set(node[0], node.slice(1));
    return map;
}, new Map());

let i = 0,
    step = 0,
    currNode = 'AAA';

do {
    step++;
    currNode =  network.get(currNode)[d.charAt(i++ % d.length) === 'L' ? 0 : 1];
} while (currNode !== 'ZZZ');

console.log(step);


