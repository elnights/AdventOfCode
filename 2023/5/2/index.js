// --- Part Two ---
//
// Everyone will starve if you only plant such a small number of seeds. Re-reading the almanac, it looks like the seeds: line actually describes ranges of seed numbers.
//
// The values on the initial seeds: line come in pairs. Within each pair, the first value is the start of the range and the second value is the length of the range. So, in the first line of the example above:
//
// seeds: 79 14 55 13
//
// This line describes two ranges of seed numbers to be planted in the garden. The first range starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. The second range starts with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.
//
// Now, rather than considering four seed numbers, you need to consider a total of 27 seed numbers.
//
// In the above example, the lowest location number can be obtained from seed number 82, which corresponds to soil 84, fertilizer 84, water 84, light 77, temperature 45, humidity 46, and location 46. So, the lowest location number is 46.
//
// Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. What is the lowest location number that corresponds to any of the initial seed numbers?


let sampleInput =
`seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

const fs = require('node:fs');

const text = fs.readFileSync('input', 'utf-8');
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
        ))
    }

    indexRanges = mr.append(indexRanges, mappedIndexRanges);
}

console.log(mr.min(indexRanges));
