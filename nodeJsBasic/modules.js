const os = require('os');
const { name, sayHi } = require("./test");

console.log(sayHi(name))
console.log(os.platform(), os.release())
