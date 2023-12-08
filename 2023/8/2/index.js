const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();

let [d, nodes] = input.split('\n\n');
let currNodes = [];
let network= nodes.split('\n').reduce((map, node) => {
    node = node.match((/\w{3}/g));
    if (node[0].endsWith('A')) currNodes.push(node[0]);
    map.set(node[0], node.slice(1));
    return map;
}, new Map());

let i = 0,
    step = 0;

do {
    step++;
    let direction = d.charAt(i++ % d.length) === 'L' ? 0 : 1;
    currNodes = currNodes.map(
        node => network.get(node)[direction]
    );
} while (currNodes.some(node => !node.endsWith('Z')));

console.log(step);


