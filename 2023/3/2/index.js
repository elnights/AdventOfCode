const fs = require('node:fs');
const text = fs.readFileSync('../input', 'utf-8');
const lines = text.split("\n").filter(line => line);
const schematic = lines.map(line => [...line]);

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
