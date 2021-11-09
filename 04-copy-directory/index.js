
const path = require('path')
const fs = require('fs')

const source = path.resolve( __dirname, 'files')
const destination = path.join( __dirname, 'files-copy')
fs.promises.rm(destination, {recursive:true, force:true}, (err)=>{
        if (err){
            throw err
        }
    }).then(()=>{
        copyDir()
    })
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
            let fileCopy = path.join(destination, item);
        
            fs.copyFile(file, fileCopy, (err) => {
                if (err) {
                    throw err;
                }
            });     
        });
    });    
}
copyDir()
