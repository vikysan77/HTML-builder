
const path = require('path')
const fs = require('fs')

const source = path.resolve( __dirname, 'files')
const destination = path.join( __dirname, 'files-copy')

async function copyDir(){
    fs.mkdir(destination, {recursive: true}, (err)=>{
        if (err){
            throw err;
        }
    });
    fs.readdir(source, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach((item) => {
            let file = path.join(source, item);
            let duu = path.join(destination, item);
        
            fs.copyFile(file, duu, (err) => {
                if (err) {
                    throw err;
                }
            });     
        });
    console.log('Copy completed!')
    });    
}
copyDir()
