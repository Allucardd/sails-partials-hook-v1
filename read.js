var xlsx = require('node-xlsx');

var obj = xlsx.parse(__dirname + '/test.xlsx'); // parses a file
console.log(obj);
