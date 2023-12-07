const fs = require('node:fs');

const text = fs.readFileSync('../input', 'utf-8');
const lines = text.split('\n');

let seeds = lines[0].split(':')[1].trim().split` `.map(x => +x);

function* iterMaps(lines) {
    let currentMap = null;
    for (let line of lines) {
        let match;

        if (match = /^(\w+)-to-(\w+) map:$/.exec(line)) {
            currentMap = [];
            continue;
        }

        if (match = /^(\d+)\s+(\d+)\s+(\d+)$/.exec(line)) {
            currentMap.push({
                destinationRangeStart: +match[1],
                sourceRangeStart: +match[2],
                rangeLength: +match[3],
            });

            continue;
        }

        if (!line && currentMap) {
            yield currentMap;
            currentMap = null;
        }
    }
}

let maps = [...iterMaps(lines.slice(1))];

let finalIndices = seeds.map(sourceIndex => {
    for (let map of maps) {
        let mapping = map.find(({sourceRangeStart, rangeLength}) =>
            sourceIndex >= sourceRangeStart && sourceIndex < sourceRangeStart + rangeLength
        );

        if (mapping) {
            sourceIndex -= mapping.sourceRangeStart - mapping.destinationRangeStart;
        }
    }

    return sourceIndex;
});

console.log(Math.min(...finalIndices));


