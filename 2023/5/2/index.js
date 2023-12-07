const fs = require('node:fs');

const text = fs.readFileSync('../input', 'utf-8');
const lines = text.split('\n');
const mr= require('multi-integer-range');

let seedRanges = lines[0]
    .match(/\d+\s\d+/g)
    .map(seedRange => seedRange.match(/\d+/g).map(x => +x))
    .map(([start, length]) => [start, start + length - 1]);

function* iterMaps(lines) {
    let currentMap = null;
    for (let line of lines) {
        let mapperMatch = line.match(/\d+/g);

        if (mapperMatch?.length === 3) {
            currentMap = currentMap ?? [];
            currentMap.push(mapperMatch.map(x => +x));
            continue;
        }

        if (!line && currentMap) {
            yield currentMap;
            currentMap = null;
        }
    }
}

let indexRanges = mr.normalize(seedRanges);

for (let map of iterMaps(lines.slice(1))) {
    let mappedIndexRanges = [];

    for (let [destinationRangeStart, sourceRangeStart, rangeLength] of map) {
        if (!mr.length(indexRanges)) break;

        let intersection = mr.intersect(indexRanges,
            [[sourceRangeStart, sourceRangeStart + rangeLength - 1]]);

        indexRanges = mr.subtract(indexRanges, intersection);

        // transform indices according to mapper
        mappedIndexRanges = mr.append(mappedIndexRanges, intersection.map(
            range => range.map(index => index - sourceRangeStart + destinationRangeStart)
        ));
    }

    indexRanges = mr.append(indexRanges, mappedIndexRanges);
}

console.log(mr.min(indexRanges));
