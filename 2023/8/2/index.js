const fs = require('node:fs');
const input = fs.readFileSync('../input', 'utf-8').trimEnd();
const math = require('mathjs');

// Прямой перебор будет слишком долгим, т.к. призраки часто достигают точки Z по очереди, но очень редко все вместе.
// Если понаблюдать за движением каждого призрака, можно заменить, что они движутся по кругу.
// Призрак со стартом в PBA заходит на точку RGZ на каждый 20093 ход. (Ходы 20093, 40186, 60279 и т.д.)
// Призрак, стартующий с LSA - попадает на VQZ каждый 12169 ход (ходы 12169, 24338, 36507 ...)
// Чтобы понять, когда оба эти призрака достигнут своих точек "**Z", нужно вычиалисть наименьшее общее кратное чисел
// 20093 и 12169

// Соответственно, для решения задачи, нужно найти количество шагов каждого призрака до точки Z, и найти их НОК

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

let ghostSteps = new Map();

do {
    step++;
    let direction = d.charAt(i++ % d.length) === 'L' ? 0 : 1;
    for (let n = 0; n < currNodes.length; n++) {
        if (ghostSteps.has(n)) continue;
        currNodes[n] = network.get(currNodes[n])[direction];
        if (currNodes[n].endsWith('Z')) ghostSteps.set(n, step);
    }
} while (ghostSteps.size !== currNodes.length);

console.log(math.lcm(...Array.from(ghostSteps).map(([, steps]) => steps)));


