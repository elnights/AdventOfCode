const fs = require('node:fs');
const text = fs.readFileSync('../input', 'utf-8');
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
