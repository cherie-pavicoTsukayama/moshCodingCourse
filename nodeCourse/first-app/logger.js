const EventEmitter = require('events');

/* when creating a Class the class name needs to start with an uppercase letter.
    Then you'll need to exten the EventEmitter methods to the new Class.
    Any function created in the new class can omit the "function" lable because
    the new function will be a method is now a property of the class.
*/

class Logger extends EventEmitter {
  log(message) {
    // Sent an HTTP Request
    console.log(message);

    //Raise and event
    this.emit('messageLogged', {id: 1, url: 'http:// '})
  }
}

module.exports = Logger;
