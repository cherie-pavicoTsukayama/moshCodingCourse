const os = require('os');
const fs = require('fs');

//OS example
var totalMemory = os.totalmem();
var freeMemory = os.freemem();


console.log(`Total Memory: ${totalMemory}`);
console.log(`Free Memory: ${freeMemory}`);

//fs example
// const files = fs.readdirSync('./');
// console.log(`Files:  ${files}`);

fs.readdir('./', function(err, files){
  if(err) console.log('Error ', err);
  else console.log('Files ', files);
})
