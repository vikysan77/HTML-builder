const fs = require ('fs')
const readline = require('readline')
const process = require('process');
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter text:\n'
  })


const newText = fs.createWriteStream('text.txt');
readLine.prompt();

readLine.on('line', (input) => {
  if (input.trim() == 'exit'){
    readLine.close()
  } else {
    newText.write(input + '\n')
  }  
}).on('SIGINT',function(){
  readLine.close()
}).on('close', ()=>{
  process.stdout.write('END!')
  newText.end()
})