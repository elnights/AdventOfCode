// --- Part Two ---
//
// The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.
//
//     You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.
//
// Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.
//
//     The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.
//
// This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.
//
//     Consider the same engine schematic again:
//
// 467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..
//
// In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.
//
// What is the sum of all of the gear ratios in your engine schematic?

const fs = require('node:fs');

const sampleText = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

const text = fs.readFileSync('input', 'utf-8');
const lines = text.split("\n").filter(line => line);
const schematic = lines.map((line => [...line]));
const spacer = '.';

function* numbers(s) {
    let currentNumber = '';

    for (let i = 0; i < s.length; i++) {
        const char = s.at(i);

        if (char >= '0' && char <= '9') {
            currentNumber += char;
            continue;
        }

        if (currentNumber) {
            yield [currentNumber, i - currentNumber.length];
            currentNumber = '';
        }
    }

    if (currentNumber) {
        yield [currentNumber, s.length - currentNumber.length];
    }
}

let numberPointers = Array(schematic.length);

for (let i = 0; i < numberPointers.length; i++) {
    numberPointers[i] = Array(schematic[0].length).fill(null);
}

for (let lineIndex = 0; lineIndex < schematic.length; lineIndex++) {
    const line = schematic[lineIndex];

    for (let [number, offset] of numbers(line)) {
        let numberRecord = {
            number,
        };

        for (let i = 0; i < number.length; i++) {
            numberPointers[lineIndex][offset + i] = numberRecord;
        }
    }
}

let sum = 0;

for (let lineIndex = 0; lineIndex < schematic.length; lineIndex++) {
    const line = schematic[lineIndex];

    for (let i = 0; i < line.length; i++) {
        if (line.at(i) === '*') {
            let touches = new Set();

            const prevLine = lineIndex ? numberPointers[lineIndex - 1] : null;
            const nextLine = lineIndex < schematic.length - 1 ? numberPointers[lineIndex + 1] : null;

            if (i) {
                if (numberPointers[lineIndex][i - 1]) touches.add(numberPointers[lineIndex][i - 1]);
                if (prevLine?.[i - 1]) touches.add(prevLine[i - 1]);
                if (nextLine?.[i - 1]) touches.add(nextLine[i - 1]);
            }

            if (i < line.length - 1) {
                if (numberPointers[lineIndex][i + 1]) touches.add(numberPointers[lineIndex][i + 1]);
                if (prevLine?.[i + 1]) touches.add(prevLine[i + 1]);
                if (nextLine?.[i + 1]) touches.add(nextLine[i + 1]);
            }

            if (prevLine?.[i]) touches.add(prevLine[i]);
            if (nextLine?.[i]) touches.add(nextLine[i]);

            if (touches.size === 2) {
                let gearRatio = Array.from(touches.keys()).reduce((acc, {number}) => acc * number, 1);
                console.log(`Gear at ${lineIndex}, ${i}. Its ratio is ${gearRatio}`);
                sum += gearRatio;
            }
        }
    }
}

console.log(sum);
