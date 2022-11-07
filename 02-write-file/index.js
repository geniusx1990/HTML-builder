const fs = require('fs');
const path = require('path');
const Emitter = require('events');


const readFromTerminal = process.stdin;
const writeToFile = fs.createWriteStream(path.resolve(__dirname, 'text.txt'), 'utf-8')
readFromTerminal.pipe(writeToFile);

let emitter = new Emitter()
let eventName = 'greet'
emitter.on(eventName, function () {
  console.log('Hello user, Please type some text into console')
  readFromTerminal.on('data', (chunk) => {
    const chunkStringified = chunk.toString();
    if (chunkStringified.match("exit")) {
      readFromTerminal.unpipe(writeToFile);
      console.log('Thank you!! File created and text added into text.txt bye bye')
    }
  })

  process.on('SIGINT', () => {
    readFromTerminal.unpipe(writeToFile);
    console.log('\nThank you!! File created and text added into text.txt bye bye')

  })

})

emitter.emit('greet')



