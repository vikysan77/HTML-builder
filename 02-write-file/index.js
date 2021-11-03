const fs = require ('fs')
const readline = require('readline')
const path = require('path')
const process = require('process');
const readLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter text:\n'
  })

const filePath = path.join(__dirname, 'text.txt')
const newText = fs.createWriteStream(filePath);
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