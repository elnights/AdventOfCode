const {
    createHash,
} = require('node:crypto');
const input = 'ckczppom';

function findHash(startsWith) {
    for (let i = 1; ;i++) {
        const hash = createHash('md5');
        hash.update(input + i);
        let res = hash.digest('hex');
        if (res.startsWith(startsWith)) return i;
    }
}

function day1() {
    console.log(findHash('00000'));
}

function day2() {
    console.log(findHash('000000'));
}

day1();
day2();
