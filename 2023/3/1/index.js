// --- Day 3: Gear Ratios ---
//
// You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.
//
//     It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.
//
// "Aaah!"
//
// You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.
//
//     The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.
//
//     The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)
//
// Here is an example engine schematic:
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
// In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.
//
// Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?
//

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

function isSymbol(char) {
    return char !== spacer && !(char >= '0' && char <= '9');
}

function checkSymbolsAround(number, lineIndex, offset) {
    const lastIndex = offset + number.length - 1;
    const currLine = schematic.at(lineIndex);
    const prevLine = lineIndex ? schematic[lineIndex - 1] : null;
    const nextLine = lineIndex < schematic.length - 1 ? schematic[lineIndex + 1] : null;

    if (offset) {
        if (isSymbol(currLine.at(offset - 1))) return true;
        if (prevLine && isSymbol(prevLine.at(offset - 1))) return true;
        if (nextLine && isSymbol(nextLine.at(offset - 1))) return true;
    }

    if (lastIndex < currLine.length - 1) {
        if (isSymbol(currLine.at(lastIndex + 1))) return true;
        if (prevLine && isSymbol(prevLine.at(lastIndex + 1))) return true;
        if (nextLine && isSymbol(nextLine.at(lastIndex + 1))) return true;
    }

    for (let i = offset; i <= lastIndex; i++) {
        if (prevLine && isSymbol(prevLine.at(i))) return true;
        if (nextLine && isSymbol(nextLine.at(i))) return true;
    }

    return false;
}

let sum = 0;

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

for (let lineIndex = 0; lineIndex < schematic.length; lineIndex++) {
    const line = schematic[lineIndex];

    for (let [number, offset] of numbers(line)) {
        if (checkSymbolsAround(number, lineIndex, offset)) {
            console.log(`${number} is a part number`);
            sum += parseInt(number);
            continue;
        }

        console.log(`${number} is NOT a part number`);
    }
}

console.log(sum);
