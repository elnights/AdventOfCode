const fs = require('node:fs');
const text = fs.readFileSync('../input', 'utf-8').trimEnd();

console.log(text.match(/\(/g).length - text.match(/\)/g).length);
