const fs = require('node:fs');
const text = fs.readFileSync('../input', 'utf-8').trimEnd();

for (let i= 0, loc = 0; i < text.length; i++) {
    if (!~(loc += text[i] === '(' ? 1 : -1)) {
        console.log(i+1);
        break;
    }
}
