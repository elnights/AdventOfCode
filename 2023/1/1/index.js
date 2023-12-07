const { once } = require('node:events');
const { createReadStream } = require('node:fs');
const { createInterface } = require('node:readline');

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
            for (const char of line) {
                if (char >= '0' && char <= '9') {
                    firstDigit = firstDigit ?? char;
                    lastDigit = char;
                }
            }
            const number = firstDigit + lastDigit;

            sum += parseInt(number);

            console.log(parseInt(number));
        });

        await once(rl, 'close');

        console.log('File processed.', sum);
    } catch (err) {
        console.error(err);
    }
})();
