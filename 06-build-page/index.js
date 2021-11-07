const fs = require('fs');
const path = require('path');

   
const stylesFolder = path.join(__dirname, 'styles')
const distFolder = path.join(__dirname, 'project-dist')
const fileCss = path.join(distFolder, 'style.css')
const source = path.join(__dirname, 'assets')
const componentsPath = path.join(__dirname, 'components');
const templateHtml = path.join(__dirname, 'template.html');
const indexHtml = path.join(__dirname, 'project-dist', 'index.html');


//Стили и создание папки
async function copyFileCss(){
fs.mkdir(distFolder, {recursive: true}, (err) => {
    if (err) {
        throw err
    }
    console.log('Directory!');
});
fs.writeFile(fileCss, '', (err) => {
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
}
copyFileCss()

//Копирование папки assets

async function copyDirAssets(){
    fs.mkdir(path.join(distFolder, 'assets'), {recursive: true}, (err)=>{
        if (err){
            throw err;
        }
    });
    async function copyDirPath(src, dest){
        const files = await fs.promises.readdir(src)
        for(const file of files){
            fs.stat(path.resolve(src, file), (errStat, status) => {
                if(errStat) {
                    throw errStat;
                }
                if (status.isDirectory()) {
                    const srcDirPath = path.resolve(src, file);
                    const destPath = path.resolve(dest, file);
                    copyDirPath(srcDirPath, destPath);
                }
                else {
                    fs.mkdir(dest, {recursive: true,}, (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                    fs.promises.copyFile(path.join(src, file), path.join(dest, file));
                }
            });
        };
    } copyDirPath(source, path.resolve(distFolder, 'assets'));
}
copyDirAssets();


//Замена тегов

async function createHtml() {
    const filesAll = await fs.promises.readdir( componentsPath);
    const readStream= fs.createReadStream(templateHtml, 'utf8');
    const writeStream = fs.createWriteStream(indexHtml)
    
    readStream.on('data', async (data) => {
        const replacedHtml = await replaceTagsAll();
        writeStream.write(replacedHtml);

        async function replaceTagsAll() {
            let htmlText = data.toString();
            const files = filesAll.filter(file => path.extname(file) === '.html');
            for (const compName of files) {
                const component = await fs.promises.readFile(path.join( componentsPath, compName));
                const name = path.basename(compName, '.html');
                htmlText = htmlText.replace(`{{${name}}}`, component);
            }
            return htmlText;
        }  
    });
    console.log('Tags done!:)')
  }
  createHtml();
