const fs = require('fs');
const path = require('path');
 
const stylesFolder = path.join(__dirname, 'styles')
const distFolder = path.join(__dirname, 'project-dist')
const fileCss = path.join(distFolder, 'bundle.css')




async function mergeStyles(){
    
    fs.writeFile(fileCss,'', (err) => {
            if (err){
                throw err;
            }
        });

    fs.readdir(stylesFolder, (err, files) => {
        if (err) {
            throw err;
        }
        files.forEach((file) => {

            let styleFile = path.join(stylesFolder, file);

            fs.stat(styleFile, (err, stats) => {
                if (err){
                throw err;
                } 
            
                if (stats.isFile() && path.extname(styleFile) === '.css') {

                const styleFileStream =   fs.ReadStream(styleFile, 'utf-8')
                styleFileStream.on("readable", () => {
                    const data = styleFileStream.read();
                    if (data) {
                        fs.appendFile(fileCss, data, (err) => {
                            if (err) {
                                throw err;
                            }
                        });
                    }
                });
                }
            });
        })
    })
    
    console.log('Done! :)')
}
mergeStyles()
