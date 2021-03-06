const os = require('os');
const fs = require('fs');
const EventEmitter = require('events'); //ths is a class that's why its first letter is capitolized and the word is camel cased.


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


/*Event Examples. See line 3 where we require node's events method.
    The order of execution matters when working with the class. You need to
    Initiate the class first.
    Then register a listener/turn it on
    Then raise an event
*/
const emitter = new EventEmitter(); // here we are creating an instance of the EventEmitter class.
// Regisert a listenter
emitter.on('messageLogged', function(arg){ // or use an arrrow fucntion that would look like this 'message..., (arg) => {}
  console.log ('Listener called ', arg)
});
//Raise an event
emitter.emit('messageLogged', {id: 1, url: 'http://'}) //emit means makings a nooise or porduce something... signaling that somehting has happend.

//Raise: loggin (data: message)
const emitter1 = new EventEmitter()
emitter1.on('messageLogged', (arg) =>{
  console.log('Logging Example: ', arg);
})
emitter1.emit('messageLogged', {data: 'message'});

/* Working with a custom class called Logger. See logger.js */
const Logger = require('./logger');
const logger = new Logger();
logger.on('messageLogged ', (arg) => {
  console.log('Logger Message: ', arg);
});
logger.log('message');
