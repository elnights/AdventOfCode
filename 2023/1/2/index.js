const { once } = require('node:events');
const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

const digitsMap = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
};

(async function processLineByLine() {
    try {
        const rl = createInterface({
            input: createReadStream('../input'),
            crlfDelay: Infinity,
        });

        let sum = 0;

        rl.on('line', (line) => {
            console.log(`Line from file: ${line}`);

            let firstDigit, lastDigit;

            let digits = [...line.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)]
                .map(match => match[1]);
            for (const digit of digits) {
                let parsedDigit = /\d/.test(digit) ? parseInt(digit) : digitsMap[digit];

                firstDigit = firstDigit ?? parsedDigit;
                lastDigit = parsedDigit;
            }
            const number = '' + firstDigit + lastDigit;

            sum += parseInt(number);

            console.log(parseInt(number));
        });

        await once(rl, 'close');

        console.log('File processed.', sum);
    } catch (err) {
        console.error(err);
    }
})();
